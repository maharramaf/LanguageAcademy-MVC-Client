using LanguageAcademy_MVC_FinalProject.ViewModels.Reviews;
using Microsoft.AspNetCore.Mvc;

namespace LanguageAcademy_MVC_FinalProject.ViewComponents
{
    public class ReviewViewComponent : ViewComponent
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public ReviewViewComponent(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            ReviewSectionUIVM? section = null;
            try
            {
                var client = _httpClientFactory.CreateClient("LanguageAcademyApi");
                section = await client.GetFromJsonAsync<ReviewSectionUIVM>("api/Reviews");
            }
            catch (HttpRequestException)
            {
                // API işləmirsə rəylər gizlədilir, səhifənin qalanı yenə açılsın
            }

            return View(section);
        }
    }
}
