using LanguageAcademy_MVC_FinalProject.ViewModels.Courses;
using Microsoft.AspNetCore.Mvc;

namespace LanguageAcademy_MVC_FinalProject.Controllers
{
    public class CoursesController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public CoursesController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> Details(string slug)
        {
            if (string.IsNullOrWhiteSpace(slug)) return NotFound();

            CourseDetailUIVM? course = null;
            try
            {
                var client = _httpClientFactory.CreateClient("LanguageAcademyApi");
                course = await client.GetFromJsonAsync<CourseDetailUIVM>($"api/Courses/{slug}");
            }
            catch (HttpRequestException)
            {
                return View("ApiUnavailable");
            }

            if (course is null) return NotFound();
            return View(course);
        }
    }
}
