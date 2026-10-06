using LanguageAcademy_MVC_FinalProject.ViewModels.Stats;
using Microsoft.AspNetCore.Mvc;

namespace LanguageAcademy_MVC_FinalProject.ViewComponents
{
    public class StatsViewComponent : ViewComponent
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public StatsViewComponent(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            StatsUIVM? section = null;
            try
            {
                var client = _httpClientFactory.CreateClient("LanguageAcademyApi");
                section = await client.GetFromJsonAsync<StatsUIVM>("api/Stats");
            }
            catch (HttpRequestException)
            {
                // API işləmirsə stats gizlədilir, səhifənin qalanı yenə açılsın
            }

            return View(section);
        }
    }
}
