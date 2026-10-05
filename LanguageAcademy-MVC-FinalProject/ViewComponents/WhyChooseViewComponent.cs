using LanguageAcademy_MVC_FinalProject.ViewModels.WhyChooses;
using Microsoft.AspNetCore.Mvc;

namespace LanguageAcademy_MVC_FinalProject.ViewComponents
{
    public class WhyChooseViewComponent : ViewComponent
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public WhyChooseViewComponent(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            WhyChooseUIVM? section = null;
            try
            {
                var client = _httpClientFactory.CreateClient("LanguageAcademyApi");
                section = await client.GetFromJsonAsync<WhyChooseUIVM>("api/WhyChoose");
            }
            catch (HttpRequestException)
            {
                // API işləmirsə why-choose gizlədilir, səhifənin qalanı yenə açılsın
            }

            return View(section);
        }
    }
}
