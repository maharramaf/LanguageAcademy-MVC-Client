namespace LanguageAcademy_MVC_FinalProject.Helpers
{
    public static class AuthCookie
    {
        public const string Name = "access_token";

        public static CookieOptions Options()
        {
            return new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Lax,
                Expires = DateTimeOffset.UtcNow.AddHours(8),
                Path = "/"
            };
        }
    }
}
