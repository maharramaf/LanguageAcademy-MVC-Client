using System.Net.Http.Headers;

namespace LanguageAcademy_MVC_FinalProject.Helpers
{
    public static class ApiClient
    {
        public static HttpClient Create(IHttpClientFactory factory, HttpRequest request)
        {
            var client = factory.CreateClient("LanguageAcademyApi");
            if (request.Cookies.TryGetValue(AuthCookie.Name, out var token)
                && !string.IsNullOrWhiteSpace(token))
            {
                client.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Bearer", token);
            }

            return client;
        }
    }
}
