using LanguageAcademy_MVC_FinalProject.ViewModels.AboutHeroes;
using Microsoft.AspNetCore.Mvc;

namespace LanguageAcademy_MVC_FinalProject.ViewComponents
{
    public class AboutHeroViewComponent : ViewComponent
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public AboutHeroViewComponent(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            AboutHeroUIVM? section = null;
            try
            {
                var client = _httpClientFactory.CreateClient("LanguageAcademyApi");
                section = await client.GetFromJsonAsync<AboutHeroUIVM>("api/AboutHero");
            }
            catch (HttpRequestException)
            {
                // API işləmirsə about-hero gizlədilir, səhifənin qalanı yenə açılsın
            }

            return View(section);
        }
    }
}
