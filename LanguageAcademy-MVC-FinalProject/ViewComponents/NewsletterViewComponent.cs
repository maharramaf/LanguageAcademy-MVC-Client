using LanguageAcademy_MVC_FinalProject.ViewModels.Newsletters;
using Microsoft.AspNetCore.Mvc;

namespace LanguageAcademy_MVC_FinalProject.ViewComponents
{
    public class NewsletterViewComponent : ViewComponent
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public NewsletterViewComponent(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            NewsletterSectionUIVM? section = null;
            try
            {
                var client = _httpClientFactory.CreateClient("LanguageAcademyApi");
                section = await client.GetFromJsonAsync<NewsletterSectionUIVM>("api/Newsletter");
            }
            catch (HttpRequestException)
            {
                // API işləmirsə newsletter gizlədilir, səhifənin qalanı yenə açılsın
            }

            return View(section);
        }
    }
}
