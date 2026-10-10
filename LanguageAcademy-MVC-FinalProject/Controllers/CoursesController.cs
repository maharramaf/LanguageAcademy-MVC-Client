using System.Net.Http.Json;
using System.Text.Json;
using LanguageAcademy_MVC_FinalProject.Helpers;
using LanguageAcademy_MVC_FinalProject.ViewModels.Courses;
using LanguageAcademy_MVC_FinalProject.ViewModels.Plans;
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
            ViewBag.PlanLocked = Roles.IsStudent(User)
                && ViewBag.Enrolled as bool? != true
                && !await CanEnrollWithPlanAsync(course.Type);
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

                TempData["EnrollError"] = await ReadEnrollErrorAsync(response);
            }
            catch (HttpRequestException)
            {
                TempData["EnrollError"] = "Could not enroll in this course.";
            }

            return RedirectToAction(nameof(Details), new { slug });
        }

        private async Task<bool> CanEnrollWithPlanAsync(string? courseType)
        {
            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var page = await client.GetFromJsonAsync<PlanPageUIVM>("api/Plans");
                return Rank(page?.Current) >= Rank(courseType);
            }
            catch (HttpRequestException)
            {
                return true;
            }
            catch (JsonException)
            {
                return true;
            }
        }

        private static int Rank(string? type)
        {
            return type?.Trim().ToLowerInvariant() switch
            {
                "demo" => 1,
                "standard" => 2,
                "premium" => 3,
                _ => 0
            };
        }

        private static async Task<string> ReadEnrollErrorAsync(HttpResponseMessage response)
        {
            try
            {
                var body = await response.Content.ReadFromJsonAsync<ApiErrorResponse>();
                var error = body?.Errors?.FirstOrDefault(e => !string.IsNullOrWhiteSpace(e));
                if (!string.IsNullOrWhiteSpace(error))
                    return error;
            }
            catch (JsonException)
            {
            }

            return "Could not enroll in this course.";
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

        private sealed class ApiErrorResponse
        {
            public List<string>? Errors { get; set; }
        }
    }
}
