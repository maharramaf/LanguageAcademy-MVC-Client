using Microsoft.AspNetCore.Mvc;

namespace LanguageAcademy_MVC_FinalProject.Controllers
{
    public class AboutController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
