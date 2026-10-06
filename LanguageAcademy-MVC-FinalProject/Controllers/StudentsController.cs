using Microsoft.AspNetCore.Mvc;

namespace LanguageAcademy_MVC_FinalProject.Controllers
{
    public class StudentsController : Controller
    {
        public IActionResult Index()
        {
            ViewData["Title"] = "Students | MF Language Academy";
            ViewData["SkipHref"] = "#students-hero";
            return View();
        }
    }
}
