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

        public async Task<IViewComponentResult> InvokeAsync()
        {
            AboutUIVM? about = null;
            try
            {
                var client = _httpClientFactory.CreateClient("LanguageAcademyApi");
                about = await client.GetFromJsonAsync<AboutUIVM>("api/About");
            }
            catch (HttpRequestException)
            {
                // API işləmirsə about gizlədilir, səhifənin qalanı yenə açılsın
            }

            return View(about);
        }
    }
}
