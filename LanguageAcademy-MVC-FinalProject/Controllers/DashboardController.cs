using System.Net.Http.Json;
using System.Text.Json;
using LanguageAcademy_MVC_FinalProject.Helpers;
using LanguageAcademy_MVC_FinalProject.ViewModels.Accounts;
using LanguageAcademy_MVC_FinalProject.ViewModels.Courses;
using LanguageAcademy_MVC_FinalProject.ViewModels.Messages;
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

        private static readonly HashSet<string> VideoExtensions = new(StringComparer.OrdinalIgnoreCase)
        {
            ".mp4", ".webm", ".ogg", ".ogv"
        };

        private const long MaxLessonVideoBytes = 52_428_800;

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
        public async Task<IActionResult> MyCourses()
        {
            if (!Roles.IsStudent(User))
                return PlaceholderPage("My Courses", "dash_my_courses");

            SetDash("My Courses", "dash_my_courses");
            var items = new List<CourseUIVM>();

            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var response = await client.GetAsync("api/Enrollments");
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
                var response = await client.PostAsJsonAsync("api/admin/Courses", new
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
        public async Task<IActionResult> EditCourse(int id)
        {
            SetDash("Edit course", "nav_courses");
            if (id <= 0)
                return RedirectToAction(nameof(Courses));

            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var response = await client.GetAsync("api/admin/Courses/" + id);
                if (!response.IsSuccessStatusCode)
                {
                    TempData["CourseNotice"] = "Course was not found.";
                    return RedirectToAction(nameof(Courses));
                }

                var course = await response.Content.ReadFromJsonAsync<CourseDetailUIVM>();
                if (course is null)
                {
                    TempData["CourseNotice"] = "Course was not found.";
                    return RedirectToAction(nameof(Courses));
                }

                return View(new CourseEditUIVM
                {
                    Id = course.Id,
                    Slug = course.Slug,
                    CurrentImage = course.Image,
                    Title = course.Title,
                    Type = course.Type,
                    Level = course.Level,
                    Duration = course.Duration,
                    Price = course.Price,
                    Summary = course.Summary,
                    Overview = course.Overview,
                    TeacherEmail = course.TeacherEmail
                });
            }
            catch (HttpRequestException)
            {
                TempData["CourseNotice"] = "Could not load the course.";
                return RedirectToAction(nameof(Courses));
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = Roles.StaffRoles)]
        public async Task<IActionResult> EditCourse(CourseEditUIVM model)
        {
            SetDash("Edit course", "nav_courses");

            if (!ModelState.IsValid)
                return View(model);

            string? imagePath = null;
            if (model.Image is { Length: > 0 })
            {
                imagePath = await SaveCourseImageAsync(model.Image);
                if (imagePath is null)
                {
                    ModelState.AddModelError(nameof(model.Image), "Choose a JPG, PNG, WEBP, or GIF image.");
                    return View(model);
                }
            }

            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var response = await client.PutAsJsonAsync("api/admin/Courses/" + model.Id, new
                {
                    model.Title,
                    model.Type,
                    model.Level,
                    model.Duration,
                    model.Price,
                    Image = imagePath ?? model.CurrentImage,
                    model.Summary,
                    model.Overview,
                    TeacherEmail = model.TeacherEmail ?? string.Empty
                });
                if (response.IsSuccessStatusCode)
                {
                    if (!string.IsNullOrWhiteSpace(imagePath))
                        DeleteCourseImage(model.CurrentImage);
                    TempData["CourseNotice"] = "Course updated.";
                    return RedirectToAction(nameof(Courses));
                }

                if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    TempData["CourseNotice"] = "Course was not found.";
                    return RedirectToAction(nameof(Courses));
                }

                AddApiErrors(await ReadErrorsAsync(response), "Could not update the course.");
            }
            catch (HttpRequestException)
            {
                ModelState.AddModelError(string.Empty, "Could not update the course.");
            }

            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = Roles.StaffRoles)]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            if (id <= 0)
                return RedirectToAction(nameof(Courses));

            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var get = await client.GetAsync("api/admin/Courses/" + id + "/modules");
                string? image = null;
                var videos = new List<string>();
                if (get.IsSuccessStatusCode)
                {
                    var course = await get.Content.ReadFromJsonAsync<CourseDetailUIVM>();
                    image = course?.Image;
                    videos = LessonVideos(course);
                }

                var response = await client.DeleteAsync("api/admin/Courses/" + id);
                if (response.IsSuccessStatusCode)
                {
                    DeleteCourseImage(image);
                    foreach (var video in videos)
                        DeleteLessonVideo(video);
                    TempData["CourseNotice"] = "Course deleted.";
                    return RedirectToAction(nameof(Courses));
                }

                TempData["CourseNotice"] = response.StatusCode == System.Net.HttpStatusCode.NotFound
                    ? "Course was not found."
                    : "Could not delete the course.";
            }
            catch (HttpRequestException)
            {
                TempData["CourseNotice"] = "Could not delete the course.";
            }

            return RedirectToAction(nameof(Courses));
        }

        [HttpGet]
        [Authorize(Roles = Roles.TeacherPanelRoles)]
        public async Task<IActionResult> CourseLessons(int id)
        {
            SetDash("Course lessons", "nav_courses");
            var page = await LoadLessonsPageAsync(id);
            if (page is null)
            {
                TempData["CourseNotice"] = "Course was not found.";
                return RedirectToAction(CourseListAction());
            }

            return View(page);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = Roles.TeacherPanelRoles)]
        public async Task<IActionResult> CreateModule(int id, [Bind(Prefix = "Module")] ModuleCreateUIVM model)
        {
            SetDash("Course lessons", "nav_courses");
            var page = await LoadLessonsPageAsync(id);
            if (page is null)
            {
                TempData["CourseNotice"] = "Course was not found.";
                return RedirectToAction(CourseListAction());
            }

            page.Module = model;
            if (!ModelState.IsValid)
                return View(nameof(CourseLessons), page);

            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var response = await client.PostAsJsonAsync($"{CoursesWriteApi()}/{id}/modules", new
                {
                    model.Title,
                    model.Info
                });
                if (response.IsSuccessStatusCode)
                {
                    TempData["CourseNotice"] = "Module created.";
                    return RedirectToAction(nameof(CourseLessons), new { id });
                }

                if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    TempData["CourseNotice"] = "Course was not found.";
                    return RedirectToAction(CourseListAction());
                }

                AddApiErrors(await ReadErrorsAsync(response), "Could not create the module.");
            }
            catch (HttpRequestException)
            {
                ModelState.AddModelError(string.Empty, "Could not create the module.");
            }

            return View(nameof(CourseLessons), page);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = Roles.TeacherPanelRoles)]
        [RequestSizeLimit(MaxLessonVideoBytes)]
        [RequestFormLimits(MultipartBodyLengthLimit = MaxLessonVideoBytes)]
        public async Task<IActionResult> CreateLesson(int id, int moduleId, LessonCreateUIVM model)
        {
            SetDash("Course lessons", "nav_courses");
            var page = await LoadLessonsPageAsync(id);
            if (page is null)
            {
                TempData["CourseNotice"] = "Course was not found.";
                return RedirectToAction(CourseListAction());
            }

            if (!ModelState.IsValid)
                return View(nameof(CourseLessons), page);

            string? videoPath = null;
            if (IsVideoKind(model.Kind))
            {
                videoPath = await SaveLessonVideoAsync(model.Video);
                if (videoPath is null)
                {
                    ModelState.AddModelError(nameof(model.Video), "Choose an MP4, WEBM, or OGG video.");
                    return View(nameof(CourseLessons), page);
                }
            }

            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var response = await client.PostAsJsonAsync($"{CoursesWriteApi()}/{id}/modules/{moduleId}/lessons", new
                {
                    model.Title,
                    model.Kind,
                    model.Seconds,
                    Video = videoPath
                });
                if (response.IsSuccessStatusCode)
                {
                    TempData["CourseNotice"] = "Lesson created.";
                    return RedirectToAction(nameof(CourseLessons), new { id });
                }

                if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    TempData["CourseNotice"] = "Course or module was not found.";
                    return RedirectToAction(nameof(CourseLessons), new { id });
                }

                AddApiErrors(await ReadErrorsAsync(response), "Could not create the lesson.");
            }
            catch (HttpRequestException)
            {
                ModelState.AddModelError(string.Empty, "Could not create the lesson.");
            }

            return View(nameof(CourseLessons), page);
        }

        [HttpGet]
        [Authorize(Roles = Roles.TeacherPanelRoles)]
        public async Task<IActionResult> EditModule(int id, int moduleId)
        {
            SetDash("Edit module", "nav_courses");
            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var response = await client.GetAsync($"{CoursesWriteApi()}/{id}/modules/{moduleId}");
                if (!response.IsSuccessStatusCode)
                {
                    TempData["CourseNotice"] = "Module was not found.";
                    return RedirectToAction(nameof(CourseLessons), new { id });
                }

                var module = await response.Content.ReadFromJsonAsync<CourseModuleUIVM>();
                if (module is null)
                {
                    TempData["CourseNotice"] = "Module was not found.";
                    return RedirectToAction(nameof(CourseLessons), new { id });
                }

                return View(new ModuleEditUIVM
                {
                    CourseId = id,
                    ModuleId = module.Id,
                    Title = module.Title,
                    Info = module.Info
                });
            }
            catch (HttpRequestException)
            {
                TempData["CourseNotice"] = "Could not load the module.";
                return RedirectToAction(nameof(CourseLessons), new { id });
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = Roles.TeacherPanelRoles)]
        public async Task<IActionResult> EditModule(int id, int moduleId, ModuleEditUIVM model)
        {
            SetDash("Edit module", "nav_courses");
            model.CourseId = id;
            model.ModuleId = moduleId;
            if (!ModelState.IsValid)
                return View(model);

            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var response = await client.PutAsJsonAsync($"{CoursesWriteApi()}/{id}/modules/{moduleId}", new
                {
                    model.Title,
                    model.Info
                });
                if (response.IsSuccessStatusCode)
                {
                    TempData["CourseNotice"] = "Module updated.";
                    return RedirectToAction(nameof(CourseLessons), new { id });
                }

                if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    TempData["CourseNotice"] = "Module was not found.";
                    return RedirectToAction(nameof(CourseLessons), new { id });
                }

                AddApiErrors(await ReadErrorsAsync(response), "Could not update the module.");
            }
            catch (HttpRequestException)
            {
                ModelState.AddModelError(string.Empty, "Could not update the module.");
            }

            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = Roles.TeacherPanelRoles)]
        public async Task<IActionResult> DeleteModule(int id, int moduleId)
        {
            var page = await LoadLessonsPageAsync(id);
            var videos = page?.Modules.FirstOrDefault(m => m.Id == moduleId)?.Lessons
                .Select(m => m.Video)
                .Where(m => !string.IsNullOrWhiteSpace(m))
                .Cast<string>()
                .ToList() ?? new List<string>();

            TempData["CourseNotice"] = await SendCurriculumDeleteAsync(
                $"{CoursesWriteApi()}/{id}/modules/{moduleId}",
                "Module deleted.",
                "Could not delete the module.");
            if (TempData["CourseNotice"] as string == "Module deleted.")
            {
                foreach (var video in videos)
                    DeleteLessonVideo(video);
            }

            return RedirectToAction(nameof(CourseLessons), new { id });
        }

        [HttpGet]
        [Authorize(Roles = Roles.TeacherPanelRoles)]
        public async Task<IActionResult> EditLesson(int id, int moduleId, int lessonId)
        {
            SetDash("Edit lesson", "nav_courses");
            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var response = await client.GetAsync($"{CoursesWriteApi()}/{id}/modules/{moduleId}/lessons/{lessonId}");
                if (!response.IsSuccessStatusCode)
                {
                    TempData["CourseNotice"] = "Lesson was not found.";
                    return RedirectToAction(nameof(CourseLessons), new { id });
                }

                var lesson = await response.Content.ReadFromJsonAsync<LessonUIVM>();
                if (lesson is null)
                {
                    TempData["CourseNotice"] = "Lesson was not found.";
                    return RedirectToAction(nameof(CourseLessons), new { id });
                }

                return View(new LessonEditUIVM
                {
                    CourseId = id,
                    ModuleId = moduleId,
                    LessonId = lesson.Id,
                    Title = lesson.Title,
                    Kind = lesson.Kind,
                    Seconds = lesson.Seconds,
                    CurrentVideo = lesson.Video
                });
            }
            catch (HttpRequestException)
            {
                TempData["CourseNotice"] = "Could not load the lesson.";
                return RedirectToAction(nameof(CourseLessons), new { id });
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = Roles.TeacherPanelRoles)]
        [RequestSizeLimit(MaxLessonVideoBytes)]
        [RequestFormLimits(MultipartBodyLengthLimit = MaxLessonVideoBytes)]
        public async Task<IActionResult> EditLesson(int id, int moduleId, int lessonId, LessonEditUIVM model)
        {
            SetDash("Edit lesson", "nav_courses");
            model.CourseId = id;
            model.ModuleId = moduleId;
            model.LessonId = lessonId;
            if (!ModelState.IsValid)
                return View(model);

            string? videoPath = null;
            if (model.Video is { Length: > 0 })
            {
                videoPath = await SaveLessonVideoAsync(model.Video);
                if (videoPath is null)
                {
                    ModelState.AddModelError(nameof(model.Video), "Choose an MP4, WEBM, or OGG video.");
                    return View(model);
                }
            }
            else if (IsVideoKind(model.Kind) && !IsLocalLessonVideo(model.CurrentVideo) && string.IsNullOrWhiteSpace(model.CurrentVideo))
            {
                ModelState.AddModelError(nameof(model.Video), "Choose an MP4, WEBM, or OGG video.");
                return View(model);
            }

            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var response = await client.PutAsJsonAsync($"{CoursesWriteApi()}/{id}/modules/{moduleId}/lessons/{lessonId}", new
                {
                    model.Title,
                    model.Kind,
                    model.Seconds,
                    Video = videoPath ?? (IsLocalLessonVideo(model.CurrentVideo) ? model.CurrentVideo : null)
                });
                if (response.IsSuccessStatusCode)
                {
                    if (!string.IsNullOrWhiteSpace(videoPath))
                        DeleteLessonVideo(model.CurrentVideo);
                    TempData["CourseNotice"] = "Lesson updated.";
                    return RedirectToAction(nameof(CourseLessons), new { id });
                }

                if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    TempData["CourseNotice"] = "Lesson was not found.";
                    return RedirectToAction(nameof(CourseLessons), new { id });
                }

                AddApiErrors(await ReadErrorsAsync(response), "Could not update the lesson.");
            }
            catch (HttpRequestException)
            {
                ModelState.AddModelError(string.Empty, "Could not update the lesson.");
            }

            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = Roles.TeacherPanelRoles)]
        public async Task<IActionResult> DeleteLesson(int id, int moduleId, int lessonId)
        {
            string? video = null;
            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var get = await client.GetAsync($"{CoursesWriteApi()}/{id}/modules/{moduleId}/lessons/{lessonId}");
                if (get.IsSuccessStatusCode)
                {
                    var lesson = await get.Content.ReadFromJsonAsync<LessonUIVM>();
                    video = lesson?.Video;
                }
            }
            catch (HttpRequestException)
            {
            }

            TempData["CourseNotice"] = await SendCurriculumDeleteAsync(
                $"{CoursesWriteApi()}/{id}/modules/{moduleId}/lessons/{lessonId}",
                "Lesson deleted.",
                "Could not delete the lesson.");
            if (TempData["CourseNotice"] as string == "Lesson deleted.")
                DeleteLessonVideo(video);

            return RedirectToAction(nameof(CourseLessons), new { id });
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
                var response = await client.GetAsync("api/admin/Students");
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
        public async Task<IActionResult> Messages(string? userId)
        {
            SetDash("Messages", "dash_messages");
            var page = await LoadMessagesPageAsync(userId);
            if (page.Thread is null && !string.IsNullOrWhiteSpace(userId))
                TempData["MessageNotice"] = "Conversation was not found.";

            return View(page);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SendMessage(string receiverId, string body)
        {
            SetDash("Messages", "dash_messages");
            var page = await LoadMessagesPageAsync(receiverId);
            page.ReceiverId = receiverId;
            page.Body = body;

            if (string.IsNullOrWhiteSpace(receiverId))
            {
                ModelState.AddModelError(string.Empty, "Choose someone to message.");
                return View(nameof(Messages), page);
            }

            if (string.IsNullOrWhiteSpace(body) || body.Trim().Length > 2000)
            {
                ModelState.AddModelError(nameof(page.Body), "Write a message.");
                return View(nameof(Messages), page);
            }

            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var response = await client.PostAsJsonAsync("api/Messages", new
                {
                    ReceiverId = receiverId,
                    Body = body.Trim()
                });
                if (response.IsSuccessStatusCode)
                    return RedirectToAction(nameof(Messages), new { userId = receiverId });

                AddApiErrors(await ReadErrorsAsync(response), "Could not send the message.");
            }
            catch (HttpRequestException)
            {
                ModelState.AddModelError(string.Empty, "Could not send the message.");
            }

            return View(nameof(Messages), page);
        }

        [HttpGet]
        public async Task<IActionResult> Profile()
        {
            SetDash("Profile", "dash_profile");
            var page = await LoadProfilePageAsync();
            if (page is null)
            {
                TempData["ProfileNotice"] = "Could not load the profile.";
                page = new ProfilePageUIVM();
            }

            return View(page);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> UpdateProfile([Bind(Prefix = "Profile")] ProfileUIVM model)
        {
            SetDash("Profile", "dash_profile");
            var page = await LoadProfilePageAsync() ?? new ProfilePageUIVM();
            page.Profile = model;

            if (!ModelState.IsValid)
                return View(nameof(Profile), page);

            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var response = await client.PutAsJsonAsync("api/Account/profile", new
                {
                    model.Name,
                    model.Surname,
                    model.Phone
                });
                if (response.IsSuccessStatusCode)
                {
                    var body = await response.Content.ReadFromJsonAsync<ProfileTokenUIVM>();
                    if (!string.IsNullOrWhiteSpace(body?.Token))
                        Response.Cookies.Append(AuthCookie.Name, body.Token, AuthCookie.Options());

                    TempData["ProfileNotice"] = "Profile updated.";
                    return RedirectToAction(nameof(Profile));
                }

                AddApiErrors(await ReadErrorsAsync(response), "Could not update the profile.");
            }
            catch (HttpRequestException)
            {
                ModelState.AddModelError(string.Empty, "Could not update the profile.");
            }

            return View(nameof(Profile), page);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ChangePassword([Bind(Prefix = "Password")] ProfilePasswordUIVM model)
        {
            SetDash("Profile", "dash_profile");
            var page = await LoadProfilePageAsync() ?? new ProfilePageUIVM();
            page.Password = model;

            if (!ModelState.IsValid)
                return View(nameof(Profile), page);

            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var response = await client.PutAsJsonAsync("api/Account/password", new
                {
                    model.CurrentPassword,
                    model.NewPassword,
                    model.ConfirmPassword
                });
                if (response.IsSuccessStatusCode)
                {
                    TempData["ProfileNotice"] = "Password updated.";
                    return RedirectToAction(nameof(Profile));
                }

                AddApiErrors(await ReadErrorsAsync(response), "Could not update the password.");
            }
            catch (HttpRequestException)
            {
                ModelState.AddModelError(string.Empty, "Could not update the password.");
            }

            return View(nameof(Profile), page);
        }

        [HttpGet]
        [Authorize(Roles = Roles.StudentPanelRoles)]
        public async Task<IActionResult> Learn(string? slug, int? lessonId)
        {
            if (!Roles.IsStudent(User))
                return PlaceholderPage("Continue learning", "learn_continue");

            SetDash("Continue learning", "learn_continue");

            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);

                if (string.IsNullOrWhiteSpace(slug))
                {
                    var mineResponse = await client.GetAsync("api/Enrollments");
                    if (mineResponse.IsSuccessStatusCode)
                    {
                        var mine = await mineResponse.Content.ReadFromJsonAsync<List<CourseUIVM>>()
                            ?? new List<CourseUIVM>();
                        var first = mine.FirstOrDefault();
                        if (first is not null)
                            return RedirectToAction(nameof(Learn), new { slug = first.Slug });
                    }

                    return View((CourseDetailUIVM?)null);
                }

                var response = await client.GetAsync($"api/Enrollments/learn/{Uri.EscapeDataString(slug)}");
                if (!response.IsSuccessStatusCode)
                {
                    TempData["CourseNotice"] = "Enroll in a course to start learning.";
                    return RedirectToAction(nameof(MyCourses));
                }

                var course = await response.Content.ReadFromJsonAsync<CourseDetailUIVM>();
                ViewBag.LessonId = lessonId;
                return View(course);
            }
            catch (HttpRequestException)
            {
                return View((CourseDetailUIVM?)null);
            }
        }

        [HttpGet]
        [Authorize(Roles = Roles.TeacherPanelRoles)]
        public async Task<IActionResult> Studio()
        {
            if (Roles.IsStaff(User))
                return RedirectToAction(nameof(Courses));

            SetDash("Course studio", "studio_open");
            var items = new List<CourseUIVM>();

            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var response = await client.GetAsync("api/studio/Courses");
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
        public async Task<IActionResult> Applications()
        {
            SetDash("Teacher applications", "apply_admin");
            var items = new List<TeacherApplicationListUIVM>();

            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var response = await client.GetAsync("api/admin/TeacherApplications");
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
                var response = await client.PostAsJsonAsync($"api/admin/TeacherApplications/{id}/accept", new { });
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
                var response = await client.PostAsJsonAsync($"api/admin/TeacherApplications/{id}/reject", new { });
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

        private async Task<string> SendCurriculumDeleteAsync(string url, string ok, string fail)
        {
            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var response = await client.DeleteAsync(url);
                if (response.IsSuccessStatusCode)
                    return ok;
                return response.StatusCode == System.Net.HttpStatusCode.NotFound
                    ? "Item was not found."
                    : fail;
            }
            catch (HttpRequestException)
            {
                return fail;
            }
        }

        private async Task<CourseLessonsPageUIVM?> LoadLessonsPageAsync(int id)
        {
            if (id <= 0) return null;

            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var response = await client.GetAsync(CoursesWriteApi() + "/" + id + "/modules");
                if (!response.IsSuccessStatusCode)
                    return null;

                var course = await response.Content.ReadFromJsonAsync<CourseDetailUIVM>();
                if (course is null)
                    return null;

                return new CourseLessonsPageUIVM
                {
                    Id = course.Id,
                    Title = course.Title,
                    Slug = course.Slug,
                    Modules = course.Modules ?? new List<CourseModuleUIVM>()
                };
            }
            catch (HttpRequestException)
            {
                return null;
            }
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

        private void DeleteCourseImage(string? path)
        {
            DeleteLocalFile(path, "images/courses/");
        }

        private async Task<string?> SaveLessonVideoAsync(IFormFile? file)
        {
            if (file is null || file.Length is 0 or > MaxLessonVideoBytes)
                return null;

            var extension = Path.GetExtension(file.FileName);
            if (!VideoExtensions.Contains(extension))
                return null;

            var folder = Path.Combine(_environment.WebRootPath, "videos", "lessons");
            Directory.CreateDirectory(folder);

            var fileName = "lesson-" + Guid.NewGuid().ToString("N")[..12] + extension.ToLowerInvariant();
            var fullPath = Path.Combine(folder, fileName);
            await using var stream = System.IO.File.Create(fullPath);
            await file.CopyToAsync(stream);

            return "videos/lessons/" + fileName;
        }

        private void DeleteLessonVideo(string? path)
        {
            DeleteLocalFile(path, "videos/lessons/");
        }

        private void DeleteLocalFile(string? path, string prefix)
        {
            if (string.IsNullOrWhiteSpace(path) || !path.Replace('\\', '/').StartsWith(prefix, StringComparison.OrdinalIgnoreCase))
                return;

            var fullPath = Path.Combine(_environment.WebRootPath, path.Replace('/', Path.DirectorySeparatorChar));
            if (System.IO.File.Exists(fullPath))
                System.IO.File.Delete(fullPath);
        }

        private static bool IsVideoKind(string? kind)
        {
            return string.Equals(kind, "video", StringComparison.OrdinalIgnoreCase);
        }

        private static bool IsLocalLessonVideo(string? path)
        {
            return !string.IsNullOrWhiteSpace(path)
                && path.Replace('\\', '/').StartsWith("videos/lessons/", StringComparison.OrdinalIgnoreCase);
        }

        private static List<string> LessonVideos(CourseDetailUIVM? course)
        {
            return course?.Modules
                .SelectMany(m => m.Lessons)
                .Select(m => m.Video)
                .Where(m => !string.IsNullOrWhiteSpace(m))
                .Cast<string>()
                .ToList() ?? new List<string>();
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

        private string CoursesWriteApi()
        {
            return Roles.IsStaff(User) ? "api/admin/Courses" : "api/studio/Courses";
        }

        private string CourseListAction()
        {
            return Roles.IsStaff(User) ? nameof(Courses) : nameof(Studio);
        }

        private async Task<MessagesPageUIVM> LoadMessagesPageAsync(string? userId)
        {
            var page = new MessagesPageUIVM { ReceiverId = userId };
            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var inbox = await client.GetAsync("api/Messages");
                if (inbox.IsSuccessStatusCode)
                {
                    page.Inbox = await inbox.Content.ReadFromJsonAsync<List<ConversationUIVM>>()
                        ?? new List<ConversationUIVM>();
                }

                var contacts = await client.GetAsync("api/Messages/contacts");
                if (contacts.IsSuccessStatusCode)
                {
                    page.Contacts = await contacts.Content.ReadFromJsonAsync<List<ContactUIVM>>()
                        ?? new List<ContactUIVM>();
                }

                if (!string.IsNullOrWhiteSpace(userId))
                {
                    var thread = await client.GetAsync("api/Messages/" + Uri.EscapeDataString(userId));
                    if (thread.IsSuccessStatusCode)
                        page.Thread = await thread.Content.ReadFromJsonAsync<ThreadUIVM>();
                }
            }
            catch (HttpRequestException)
            {
            }

            return page;
        }

        private async Task<ProfilePageUIVM?> LoadProfilePageAsync()
        {
            try
            {
                var client = ApiClient.Create(_httpClientFactory, Request);
                var response = await client.GetAsync("api/Account/me");
                if (!response.IsSuccessStatusCode)
                    return null;

                var profile = await response.Content.ReadFromJsonAsync<ProfileUIVM>();
                if (profile is null)
                    return null;

                return new ProfilePageUIVM { Profile = profile };
            }
            catch (HttpRequestException)
            {
                return null;
            }
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

        private sealed class ProfileTokenUIVM
        {
            public string? Token { get; set; }
        }

        private sealed class ApiErrorResponse
        {
            public List<string>? Errors { get; set; }
        }
    }
}
