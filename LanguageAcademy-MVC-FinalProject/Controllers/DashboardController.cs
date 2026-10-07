using System.Net.Http.Json;
using LanguageAcademy_MVC_FinalProject.Helpers;
using LanguageAcademy_MVC_FinalProject.ViewModels.TeacherApplications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LanguageAcademy_MVC_FinalProject.Controllers
{
    [Authorize(Roles = Roles.Admin + "," + Roles.SuperAdmin)]
    public class DashboardController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public DashboardController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet]
        public IActionResult Index()
        {
            ViewData["Title"] = "Dashboard | MF Language Academy";
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> Applications()
        {
            ViewData["Title"] = "Teacher applications | MF Language Academy";
            var items = new List<TeacherApplicationListUIVM>();

            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var response = await client.GetAsync("api/TeacherApplications");
                if (response.IsSuccessStatusCode)
                {
                    items = await response.Content.ReadFromJsonAsync<List<TeacherApplicationListUIVM>>()
                        ?? new List<TeacherApplicationListUIVM>();
                }
            }
            catch (HttpRequestException)
            {
            }

            return View(items);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AcceptApplication(int id)
        {
            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var response = await client.PostAsJsonAsync($"api/TeacherApplications/{id}/accept", new { });
                if (response.IsSuccessStatusCode)
                {
                    var body = await response.Content.ReadFromJsonAsync<AcceptResultUIVM>();
                    TempData["ApplyNotice"] = "Application approved. The teacher can sign in with this email.";
                    if (!string.IsNullOrWhiteSpace(body?.TemporaryPassword))
                        TempData["ApplyPassword"] = body.TemporaryPassword;
                }
                else
                {
                    TempData["ApplyNotice"] = "Could not approve the application.";
                }
            }
            catch (HttpRequestException)
            {
                TempData["ApplyNotice"] = "Could not approve the application.";
            }

            return RedirectToAction(nameof(Applications));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> RejectApplication(int id)
        {
            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var response = await client.PostAsJsonAsync($"api/TeacherApplications/{id}/reject", new { });
                TempData["ApplyNotice"] = response.IsSuccessStatusCode
                    ? "Application rejected."
                    : "Could not reject the application.";
            }
            catch (HttpRequestException)
            {
                TempData["ApplyNotice"] = "Could not reject the application.";
            }

            return RedirectToAction(nameof(Applications));
        }

        private sealed class AcceptResultUIVM
        {
            public string? TemporaryPassword { get; set; }
        }
    }
}
