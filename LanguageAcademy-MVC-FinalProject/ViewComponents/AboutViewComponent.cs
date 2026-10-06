using LanguageAcademy_MVC_FinalProject.ViewModels.Abouts;
using Microsoft.AspNetCore.Mvc;

namespace LanguageAcademy_MVC_FinalProject.ViewComponents
{
    public class AboutViewComponent : ViewComponent
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public AboutViewComponent(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<IViewComponentResult> InvokeAsync(string page = "home")
        {
            AboutUIVM? about = null;
            try
            {
                var client = _httpClientFactory.CreateClient("LanguageAcademyApi");
                var path = string.Equals(page, "about", StringComparison.OrdinalIgnoreCase)
                    ? "api/About?page=about"
                    : "api/About?page=home";
                about = await client.GetFromJsonAsync<AboutUIVM>(path);
            }
            catch (HttpRequestException)
            {
                // API işləmirsə about gizlədilir, səhifənin qalanı yenə açılsın
            }

            return View(about);
        }
    }
}
