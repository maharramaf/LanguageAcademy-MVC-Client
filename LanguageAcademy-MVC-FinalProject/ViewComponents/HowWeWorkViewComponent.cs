using LanguageAcademy_MVC_FinalProject.ViewModels.HowWeWorks;
using Microsoft.AspNetCore.Mvc;

namespace LanguageAcademy_MVC_FinalProject.ViewComponents
{
    public class HowWeWorkViewComponent : ViewComponent
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public HowWeWorkViewComponent(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            HowWeWorkUIVM? section = null;
            try
            {
                var client = _httpClientFactory.CreateClient("LanguageAcademyApi");
                section = await client.GetFromJsonAsync<HowWeWorkUIVM>("api/HowWeWork");
            }
            catch (HttpRequestException)
            {
                // API işləmirsə how-we-work gizlədilir, səhifənin qalanı yenə açılsın
            }

            return View(section);
        }
    }
}
