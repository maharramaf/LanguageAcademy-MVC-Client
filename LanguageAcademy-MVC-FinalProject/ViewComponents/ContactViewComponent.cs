using LanguageAcademy_MVC_FinalProject.ViewModels.Contacts;
using Microsoft.AspNetCore.Mvc;

namespace LanguageAcademy_MVC_FinalProject.ViewComponents
{
    public class ContactViewComponent : ViewComponent
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public ContactViewComponent(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            ContactSectionUIVM? section = null;
            try
            {
                var client = _httpClientFactory.CreateClient("LanguageAcademyApi");
                section = await client.GetFromJsonAsync<ContactSectionUIVM>("api/Contact");
            }
            catch (HttpRequestException)
            {
                // API işləmirsə contact gizlədilir, səhifənin qalanı yenə açılsın
            }

            return View(section);
        }
    }
}
