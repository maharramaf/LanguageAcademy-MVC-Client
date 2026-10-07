using System.Net.Http.Json;
using System.Text.Json;
using LanguageAcademy_MVC_FinalProject.Helpers;
using LanguageAcademy_MVC_FinalProject.ViewModels.Accounts;
using Microsoft.AspNetCore.Mvc;

namespace LanguageAcademy_MVC_FinalProject.Controllers
{
    public class AccountController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public AccountController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet]
        public IActionResult Register()
        {
            if (AuthCookie.Exists(Request))
                return RedirectToAction("Index", "Home");

            ViewData["Title"] = "Register | MF Language Academy";
            return View(new RegisterUIVM());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegisterUIVM model)
        {
            ViewData["Title"] = "Register | MF Language Academy";

            if (!ModelState.IsValid)
                return View(model);

            try
            {
                var client = _httpClientFactory.CreateClient("LanguageAcademyApi");
                var response = await client.PostAsJsonAsync("api/account/register", model);
                if (response.IsSuccessStatusCode)
                {
                    TempData["Register"] = "ok";
                    return RedirectToAction(nameof(Register));
                }

                AddApiErrors(await ReadErrorsAsync(response), "Could not create the account.");
            }
            catch (HttpRequestException)
            {
                ModelState.AddModelError(string.Empty, "Could not create the account.");
            }

            return View(model);
        }

        [HttpGet]
        public IActionResult Login()
        {
            if (AuthCookie.Exists(Request))
                return RedirectToAction("Index", "Home");

            ViewData["Title"] = "Login | MF Language Academy";
            return View(new LoginUIVM());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginUIVM model)
        {
            ViewData["Title"] = "Login | MF Language Academy";

            if (!ModelState.IsValid)
                return View(model);

            try
            {
                var client = _httpClientFactory.CreateClient("LanguageAcademyApi");
                var response = await client.PostAsJsonAsync("api/account/login", model);
                if (response.IsSuccessStatusCode)
                {
                    var body = await response.Content.ReadFromJsonAsync<LoginResultUIVM>();
                    if (!string.IsNullOrWhiteSpace(body?.Token))
                    {
                        Response.Cookies.Append(AuthCookie.Name, body.Token, AuthCookie.Options());
                        return RedirectToAction("Index", "Home");
                    }

                    ModelState.AddModelError(string.Empty, "Email or password is incorrect.");
                    return View(model);
                }

                AddApiErrors(await ReadErrorsAsync(response), "Email or password is incorrect.");
            }
            catch (HttpRequestException)
            {
                ModelState.AddModelError(string.Empty, "Email or password is incorrect.");
            }

            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Logout()
        {
            Response.Cookies.Delete(AuthCookie.Name, AuthCookie.DeleteOptions());
            return RedirectToAction("Index", "Home");
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

        private sealed class ApiErrorResponse
        {
            public List<string>? Errors { get; set; }
        }

        private sealed class LoginResultUIVM
        {
            public string Token { get; set; } = string.Empty;
        }
    }
}
