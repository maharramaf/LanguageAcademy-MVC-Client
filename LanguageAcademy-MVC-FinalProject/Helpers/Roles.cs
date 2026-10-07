using System.Security.Claims;

namespace LanguageAcademy_MVC_FinalProject.Helpers
{
    public static class Roles
    {
        public const string Student = "Student";
        public const string Teacher = "Teacher";
        public const string Admin = "Admin";
        public const string SuperAdmin = "SuperAdmin";

        public static bool IsStaff(string? role)
        {
            return role == Admin || role == SuperAdmin;
        }

        public static bool IsStaff(ClaimsPrincipal user)
        {
            return user.Identity?.IsAuthenticated == true
                && (user.IsInRole(Admin) || user.IsInRole(SuperAdmin));
        }
    }
}
