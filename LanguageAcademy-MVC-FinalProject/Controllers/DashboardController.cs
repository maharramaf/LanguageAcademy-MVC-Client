using System.Net.Http.Json;
using System.Text.Json;
using LanguageAcademy_MVC_FinalProject.Helpers;
using LanguageAcademy_MVC_FinalProject.ViewModels.Accounts;
using LanguageAcademy_MVC_FinalProject.ViewModels.Courses;
using LanguageAcademy_MVC_FinalProject.ViewModels.TeacherApplications;
using LanguageAcademy_MVC_FinalProject.ViewModels.Teachers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LanguageAcademy_MVC_FinalProject.Controllers
{
    [Authorize(Roles = Roles.DashboardRoles)]
    public class DashboardController : Controller
    {
        private static readonly HashSet<string> ImageExtensions = new(StringComparer.OrdinalIgnoreCase)
        {
            ".jpg", ".jpeg", ".png", ".webp", ".gif"
        };

        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IWebHostEnvironment _environment;

        public DashboardController(IHttpClientFactory httpClientFactory, IWebHostEnvironment environment)
        {
            _httpClientFactory = httpClientFactory;
            _environment = environment;
        }

        [HttpGet]
        public IActionResult Index()
        {
            SetDash("Dashboard", "dash_home");
            return View();
        }

        [HttpGet]
        public IActionResult MyCourses() => PlaceholderPage("My Courses", "dash_my_courses");

        [HttpGet]
        public IActionResult Plans() => PlaceholderPage("Plans", "plan_nav");

        [HttpGet]
        [Authorize(Roles = Roles.TeacherPanelRoles)]
        public IActionResult TeacherPlan() => PlaceholderPage("Teacher Subscription", "tp_title");

        [HttpGet]
        [Authorize(Roles = Roles.StudentPanelRoles)]
        public IActionResult Rewards() => PlaceholderPage("Rewards", "reward_title");

        [HttpGet]
        [Authorize(Roles = Roles.TeacherPanelRoles)]
        public IActionResult Earnings() => PlaceholderPage("Earnings", "tp_earnings");

        [HttpGet]
        [Authorize(Roles = Roles.StaffRoles)]
        public async Task<IActionResult> Courses()
        {
            SetDash("Courses", "nav_courses");
            var items = new List<CourseUIVM>();

            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var response = await client.GetAsync("api/Courses");
                if (response.IsSuccessStatusCode)
                {
                    items = await response.Content.ReadFromJsonAsync<List<CourseUIVM>>()
                        ?? new List<CourseUIVM>();
                }
            }
            catch (HttpRequestException)
            {
            }

            return View(items);
        }

        [HttpGet]
        [Authorize(Roles = Roles.StaffRoles)]
        public IActionResult CreateCourse()
        {
            SetDash("Create course", "nav_courses");
            return View(new CourseCreateUIVM());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = Roles.StaffRoles)]
        public async Task<IActionResult> CreateCourse(CourseCreateUIVM model)
        {
            SetDash("Create course", "nav_courses");

            if (!ModelState.IsValid)
                return View(model);

            var imagePath = await SaveCourseImageAsync(model.Image);
            if (imagePath is null)
            {
                ModelState.AddModelError(nameof(model.Image), "Choose a JPG, PNG, WEBP, or GIF image.");
                return View(model);
            }

            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var response = await client.PostAsJsonAsync("api/Courses", new
                {
                    model.Title,
                    model.Type,
                    model.Level,
                    model.Duration,
                    model.Price,
                    Image = imagePath,
                    model.Summary,
                    model.Overview
                });
                if (response.IsSuccessStatusCode)
                {
                    TempData["CourseNotice"] = "Course created.";
                    return RedirectToAction(nameof(Courses));
                }

                AddApiErrors(await ReadErrorsAsync(response), "Could not create the course.");
            }
            catch (HttpRequestException)
            {
                ModelState.AddModelError(string.Empty, "Could not create the course.");
            }

            return View(model);
        }

        [HttpGet]
        [Authorize(Roles = Roles.StaffRoles)]
        public async Task<IActionResult> Teachers()
        {
            SetDash("Teachers", "nav_teachers");
            var items = new List<TeacherUIVM>();

            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var response = await client.GetAsync("api/Teachers");
                if (response.IsSuccessStatusCode)
                {
                    var section = await response.Content.ReadFromJsonAsync<TeacherSectionUIVM>();
                    items = section?.Teachers ?? new List<TeacherUIVM>();
                }
            }
            catch (HttpRequestException)
            {
            }

            return View(items);
        }

        [HttpGet]
        [Authorize(Roles = Roles.StaffRoles)]
        public async Task<IActionResult> Students()
        {
            SetDash("Students", "nav_students");
            var items = new List<StudentAccountUIVM>();

            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var response = await client.GetAsync("api/account/students");
                if (response.IsSuccessStatusCode)
                {
                    items = await response.Content.ReadFromJsonAsync<List<StudentAccountUIVM>>()
                        ?? new List<StudentAccountUIVM>();
                }
            }
            catch (HttpRequestException)
            {
            }

            return View(items);
        }

        [HttpGet]
        public IActionResult Messages() => PlaceholderPage("Messages", "dash_messages");

        [HttpGet]
        public IActionResult Profile() => PlaceholderPage("Profile", "dash_profile");

        [HttpGet]
        [Authorize(Roles = Roles.StudentPanelRoles)]
        public IActionResult Learn() => PlaceholderPage("Continue learning", "learn_continue");

        [HttpGet]
        [Authorize(Roles = Roles.TeacherPanelRoles)]
        public IActionResult Studio() => PlaceholderPage("Course studio", "studio_open");

        [HttpGet]
        [Authorize(Roles = Roles.StaffRoles)]
        public async Task<IActionResult> Applications()
        {
            SetDash("Teacher applications", "apply_admin");
            var items = new List<TeacherApplicationListUIVM>();

            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var response = await client.GetAsync("api/TeacherApplications");
                if (response.IsSuccessStatusCode)
                {
                    items = await response.Content.ReadFromJsonAsync<List<TeacherApplicationListUIVM>>()
                        ?? new List<TeacherApplicationListUIVM>();
                }
            }
            catch (HttpRequestException)
            {
            }

            return View(items);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = Roles.StaffRoles)]
        public async Task<IActionResult> AcceptApplication(int id)
        {
            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var response = await client.PostAsJsonAsync($"api/TeacherApplications/{id}/accept", new { });
                if (response.IsSuccessStatusCode)
                {
                    var body = await response.Content.ReadFromJsonAsync<AcceptResultUIVM>();
                    TempData["ApplyNotice"] = "Application approved. The teacher can sign in with this email.";
                    if (!string.IsNullOrWhiteSpace(body?.TemporaryPassword))
                        TempData["ApplyPassword"] = body.TemporaryPassword;
                }
                else
                {
                    TempData["ApplyNotice"] = "Could not approve the application.";
                }
            }
            catch (HttpRequestException)
            {
                TempData["ApplyNotice"] = "Could not approve the application.";
            }

            return RedirectToAction(nameof(Applications));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = Roles.StaffRoles)]
        public async Task<IActionResult> RejectApplication(int id)
        {
            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var response = await client.PostAsJsonAsync($"api/TeacherApplications/{id}/reject", new { });
                TempData["ApplyNotice"] = response.IsSuccessStatusCode
                    ? "Application rejected."
                    : "Could not reject the application.";
            }
            catch (HttpRequestException)
            {
                TempData["ApplyNotice"] = "Could not reject the application.";
            }

            return RedirectToAction(nameof(Applications));
        }

        private async Task<string?> SaveCourseImageAsync(IFormFile? file)
        {
            if (file is null || file.Length is 0 or > 2_000_000)
                return null;

            var extension = Path.GetExtension(file.FileName);
            if (!ImageExtensions.Contains(extension))
                return null;

            var folder = Path.Combine(_environment.WebRootPath, "images", "courses");
            Directory.CreateDirectory(folder);

            var fileName = "course-" + Guid.NewGuid().ToString("N")[..12] + extension.ToLowerInvariant();
            var fullPath = Path.Combine(folder, fileName);
            await using var stream = System.IO.File.Create(fullPath);
            await file.CopyToAsync(stream);

            return "images/courses/" + fileName;
        }

        private async Task<List<string>?> ReadErrorsAsync(HttpResponseMessage response)
        {
            try
            {
                var body = await response.Content.ReadFromJsonAsync<ApiErrorResponse>();
                return body?.Errors?.Where(e => !string.IsNullOrWhiteSpace(e)).ToList();
            }
            catch (JsonException)
            {
                return null;
            }
        }

        private void AddApiErrors(List<string>? errors, string fallback)
        {
            if (errors is { Count: > 0 })
            {
                foreach (var error in errors)
                    ModelState.AddModelError(string.Empty, error);
                return;
            }

            ModelState.AddModelError(string.Empty, fallback);
        }

        private IActionResult PlaceholderPage(string heading, string i18n)
        {
            SetDash(heading, i18n);
            return View("Placeholder");
        }

        private void SetDash(string heading, string i18n)
        {
            ViewData["Title"] = heading + " | MF Language Academy";
            ViewData["DashHeading"] = heading;
            ViewData["DashI18n"] = i18n;
        }

        private sealed class AcceptResultUIVM
        {
            public string? TemporaryPassword { get; set; }
        }

        private sealed class ApiErrorResponse
        {
            public List<string>? Errors { get; set; }
        }
    }
}
