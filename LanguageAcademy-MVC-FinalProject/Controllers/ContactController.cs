using Microsoft.AspNetCore.Mvc;

namespace LanguageAcademy_MVC_FinalProject.Controllers
{
    public class ContactController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public ContactController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public IActionResult Index()
        {
            ViewData["Title"] = "Contact | MF Language Academy";
            ViewData["SkipHref"] = "#contact-hero";
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Send(string name, string email, string phone, string subject, string text)
        {
            try
            {
                var client = _httpClientFactory.CreateClient("LanguageAcademyApi");
                var response = await client.PostAsJsonAsync("api/Contact", new { name, email, phone, subject, text });
                TempData["Contact"] = response.IsSuccessStatusCode ? "ok" : "invalid";
            }
            catch (HttpRequestException)
            {
                TempData["Contact"] = "invalid";
            }

            return Redirect("/Contact#contact-section");
        }
    }
}
