using System.Net.Http.Json;
using LanguageAcademy_MVC_FinalProject.Helpers;
using LanguageAcademy_MVC_FinalProject.ViewModels.Notifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LanguageAcademy_MVC_FinalProject.Controllers
{
    [Authorize]
    public class NotificationsController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public NotificationsController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet]
        public IActionResult HubToken()
        {
            var token = Request.Cookies[AuthCookie.Name];
            if (string.IsNullOrWhiteSpace(token))
                return Unauthorized();

            var hubUrl = new Uri(
                _httpClientFactory.CreateClient("LanguageAcademyApi").BaseAddress
                    ?? new Uri("https://localhost:7210/"),
                "hubs/notify").ToString();
            return Json(new { token, hubUrl });
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var items = await client.GetFromJsonAsync<List<NotificationUIVM>>("api/Notifications");
                return Json(items ?? new List<NotificationUIVM>());
            }
            catch (HttpRequestException)
            {
                return Json(Array.Empty<NotificationUIVM>());
            }
        }

        [HttpPost]
        [IgnoreAntiforgeryToken]
        public async Task<IActionResult> Read(int id)
        {
            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                await client.PutAsync($"api/Notifications/{id}/read", null);
            }
            catch (HttpRequestException)
            {
            }

            return NoContent();
        }

        [HttpPost]
        [IgnoreAntiforgeryToken]
        public async Task<IActionResult> ReadAll()
        {
            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                await client.PutAsync("api/Notifications/read-all", null);
            }
            catch (HttpRequestException)
            {
            }

            return NoContent();
        }
    }
}
