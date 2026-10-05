using LanguageAcademy_MVC_FinalProject.ViewModels.Heroes;
using Microsoft.AspNetCore.Mvc;

namespace LanguageAcademy_MVC_FinalProject.ViewComponents
{
    public class HeroViewComponent : ViewComponent
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public HeroViewComponent(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            HeroUIVM? hero = null;
            try
            {
                var client = _httpClientFactory.CreateClient("LanguageAcademyApi");
                hero = await client.GetFromJsonAsync<HeroUIVM>("api/Hero");
            }
            catch (HttpRequestException)
            {
                // API işləmirsə hero gizlədilir, səhifənin qalanı yenə açılsın
            }

            return View(hero);
        }
    }
}
