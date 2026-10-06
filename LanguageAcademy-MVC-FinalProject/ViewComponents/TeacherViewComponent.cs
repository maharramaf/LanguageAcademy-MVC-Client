using LanguageAcademy_MVC_FinalProject.ViewModels.Teachers;
using Microsoft.AspNetCore.Mvc;

namespace LanguageAcademy_MVC_FinalProject.ViewComponents
{
    public class TeacherViewComponent : ViewComponent
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public TeacherViewComponent(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<IViewComponentResult> InvokeAsync(string layout = "home")
        {
            TeacherSectionUIVM? section = null;
            try
            {
                var client = _httpClientFactory.CreateClient("LanguageAcademyApi");
                section = await client.GetFromJsonAsync<TeacherSectionUIVM>("api/Teachers");
            }
            catch (HttpRequestException)
            {
                // API işləmirsə teachers gizlədilir, səhifənin qalanı yenə açılsın
            }

            return View(layout == "page" ? "Page" : "Default", section);
        }
    }
}
