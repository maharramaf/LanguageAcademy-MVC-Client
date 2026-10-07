namespace LanguageAcademy_MVC_FinalProject.Helpers
{
    public static class AuthCookie
    {
        public const string Name = "access_token";

        public static bool Exists(HttpRequest request)
        {
            return request.Cookies.ContainsKey(Name)
                && !string.IsNullOrWhiteSpace(request.Cookies[Name]);
        }

        public static CookieOptions Options()
        {
            return BaseOptions(DateTimeOffset.UtcNow.AddHours(8));
        }

        public static CookieOptions DeleteOptions()
        {
            return BaseOptions(DateTimeOffset.UtcNow.AddDays(-1));
        }

        private static CookieOptions BaseOptions(DateTimeOffset expires)
        {
            return new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Lax,
                Expires = expires,
                Path = "/"
            };
        }
    }
}
