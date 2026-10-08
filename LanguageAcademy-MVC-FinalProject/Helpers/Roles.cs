using System.Security.Claims;

namespace LanguageAcademy_MVC_FinalProject.Helpers
{
    public static class Roles
    {
        public const string Student = "Student";
        public const string Teacher = "Teacher";
        public const string Admin = "Admin";
        public const string SuperAdmin = "SuperAdmin";
        public const string StaffRoles = Admin + "," + SuperAdmin;
        public const string TeacherPanelRoles = StaffRoles + "," + Teacher;
        public const string StudentPanelRoles = StaffRoles + "," + Student;
        public const string DashboardRoles = TeacherPanelRoles + "," + Student;

        public static bool IsStaff(string? role)
        {
            return role == Admin || role == SuperAdmin;
        }

        public static bool IsStaff(ClaimsPrincipal user)
        {
            return user.Identity?.IsAuthenticated == true
                && (user.IsInRole(Admin) || user.IsInRole(SuperAdmin));
        }

        public static bool CanOpenDashboard(string? role)
        {
            return IsStaff(role) || role == Teacher;
        }

        public static bool CanOpenDashboard(ClaimsPrincipal user)
        {
            return IsStaff(user) || (user.Identity?.IsAuthenticated == true && user.IsInRole(Teacher));
        }

        public static bool IsStudent(ClaimsPrincipal user)
        {
            return user.Identity?.IsAuthenticated == true
                && user.IsInRole(Student)
                && !CanOpenDashboard(user);
        }

        public static string Label(ClaimsPrincipal user)
        {
            if (user.IsInRole(SuperAdmin))
                return SuperAdmin;
            if (user.IsInRole(Admin))
                return Admin;
            if (user.IsInRole(Teacher))
                return Teacher;
            return Student;
        }
    }
}
