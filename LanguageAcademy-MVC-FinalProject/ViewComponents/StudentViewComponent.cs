using LanguageAcademy_MVC_FinalProject.ViewModels.Students;
using Microsoft.AspNetCore.Mvc;

namespace LanguageAcademy_MVC_FinalProject.ViewComponents
{
    public class StudentViewComponent : ViewComponent
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public StudentViewComponent(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            StudentSectionUIVM? section = null;
            try
            {
                var client = _httpClientFactory.CreateClient("LanguageAcademyApi");
                section = await client.GetFromJsonAsync<StudentSectionUIVM>("api/Students");
            }
            catch (HttpRequestException)
            {
                // API işləmirsə students gizlədilir, səhifənin qalanı yenə açılsın
            }

            return View(section);
        }
    }
}
