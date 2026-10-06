using Microsoft.AspNetCore.Mvc;

namespace LanguageAcademy_MVC_FinalProject.Controllers
{
    public class TeachersController : Controller
    {
        public IActionResult Index()
        {
            ViewData["Title"] = "Teachers | MF Language Academy";
            ViewData["SkipHref"] = "#teachers-hero";
            return View();
        }
    }
}
