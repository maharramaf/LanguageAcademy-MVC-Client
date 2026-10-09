using System.Net.Http.Json;
using LanguageAcademy_MVC_FinalProject.Helpers;
using LanguageAcademy_MVC_FinalProject.ViewModels.Courses;
using Microsoft.AspNetCore.Authorization;
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

            ViewBag.Enrolled = await IsEnrolledAsync(course.Id);
            return View(course);
        }

        [HttpPost]
        [Authorize(Roles = Roles.Student)]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Enroll(int id, string slug)
        {
            if (!Roles.IsStudent(User))
                return RedirectToAction("Index", "Home");

            if (id <= 0)
                return RedirectToAction(nameof(Details), new { slug });

            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var response = await client.PostAsJsonAsync("api/Enrollments", new { courseId = id });
                if (response.IsSuccessStatusCode)
                {
                    TempData["CourseNotice"] = "You are enrolled.";
                    return RedirectToAction("MyCourses", "Dashboard");
                }

                TempData["EnrollError"] = "Could not enroll in this course.";
            }
            catch (HttpRequestException)
            {
                TempData["EnrollError"] = "Could not enroll in this course.";
            }

            return RedirectToAction(nameof(Details), new { slug });
        }

        private async Task<bool> IsEnrolledAsync(int courseId)
        {
            if (!Roles.IsStudent(User) || courseId <= 0)
                return false;

            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var status = await client.GetFromJsonAsync<EnrollmentStatusUIVM>($"api/Enrollments/{courseId}");
                return status?.Enrolled == true;
            }
            catch (HttpRequestException)
            {
                return false;
            }
            catch (System.Text.Json.JsonException)
            {
                return false;
            }
        }

        private sealed class EnrollmentStatusUIVM
        {
            public bool Enrolled { get; set; }
        }
    }
}
