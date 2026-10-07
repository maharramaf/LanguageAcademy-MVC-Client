using System.Net.Http.Json;
using System.Text.Json;
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

                ApiErrorResponse? body = null;
                try
                {
                    body = await response.Content.ReadFromJsonAsync<ApiErrorResponse>();
                }
                catch (JsonException)
                {
                }

                var errors = body?.Errors?.Where(e => !string.IsNullOrWhiteSpace(e)).ToList();
                if (errors is { Count: > 0 })
                {
                    foreach (var error in errors)
                        ModelState.AddModelError(string.Empty, error);
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Could not create the account.");
                }
            }
            catch (HttpRequestException)
            {
                ModelState.AddModelError(string.Empty, "Could not create the account.");
            }

            return View(model);
        }

        private sealed class ApiErrorResponse
        {
            public List<string>? Errors { get; set; }
        }
    }
}
