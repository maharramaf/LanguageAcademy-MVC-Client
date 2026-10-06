using Microsoft.AspNetCore.Mvc;

namespace LanguageAcademy_MVC_FinalProject.Controllers
{
    public class NewsletterController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public NewsletterController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Subscribe(string email, string? returnUrl)
        {
            try
            {
                var client = _httpClientFactory.CreateClient("LanguageAcademyApi");
                var response = await client.PostAsJsonAsync("api/Newsletter", new { email });
                TempData["Newsletter"] = response.IsSuccessStatusCode ? "ok" : "invalid";
            }
            catch (HttpRequestException)
            {
                TempData["Newsletter"] = "invalid";
            }

            if (!string.IsNullOrWhiteSpace(returnUrl) && Url.IsLocalUrl(returnUrl))
            {
                return LocalRedirect(returnUrl + "#newsletter-section");
            }

            return Redirect("/#newsletter-section");
        }
    }
}
