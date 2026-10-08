using System.Net.Http.Json;
using LanguageAcademy_MVC_FinalProject.Helpers;
using LanguageAcademy_MVC_FinalProject.ViewModels.Courses;
using LanguageAcademy_MVC_FinalProject.ViewModels.TeacherApplications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LanguageAcademy_MVC_FinalProject.Controllers
{
    [Authorize(Roles = Roles.DashboardRoles)]
    public class DashboardController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public DashboardController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
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
        public IActionResult Teachers() => PlaceholderPage("Teachers", "nav_teachers");

        [HttpGet]
        [Authorize(Roles = Roles.StaffRoles)]
        public IActionResult Students() => PlaceholderPage("Students", "nav_students");

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
    }
}
