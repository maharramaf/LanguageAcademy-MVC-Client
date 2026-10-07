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
    }
}
