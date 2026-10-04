using LanguageAcademy_MVC_FinalProject.ViewModels.Courses;
using Microsoft.AspNetCore.Mvc;

namespace LanguageAcademy_MVC_FinalProject.ViewComponents
{
    public class CourseViewComponent : ViewComponent
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public CourseViewComponent(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<IViewComponentResult> InvokeAsync(bool catalog = false)
        {
            var courses = new List<CourseUIVM>();

            try
            {
                var client = _httpClientFactory.CreateClient("LanguageAcademyApi");
                courses = await client.GetFromJsonAsync<List<CourseUIVM>>("api/Courses")
                    ?? new List<CourseUIVM>();
            }
            catch (HttpRequestException)
            {
                // API işləmirsə kurs zolağı boş qalır, səhifənin qalanı yenə açılsın
            }

            ViewBag.Catalog = catalog;
            return View(courses);
        }
    }
}
