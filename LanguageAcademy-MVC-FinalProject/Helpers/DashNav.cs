using System.Security.Claims;

namespace LanguageAcademy_MVC_FinalProject.Helpers
{
    public static class DashNav
    {
        public static readonly DashNavItem[] Items =
        {
            new("Index", "dash_home", "Dashboard", "bi-grid", Teacher: true, Student: true),
            new("MyCourses", "dash_my_courses", "My Courses", "bi-book", Teacher: true, Student: true),
            new("Plans", "plan_nav", "Plans", "bi-stars", Teacher: true, Student: true),
            new("TeacherPlan", "tp_title", "Teacher Subscription", "bi-person-badge", Teacher: true),
            new("Rewards", "reward_title", "Rewards", "bi-trophy", Student: true),
            new("Certificates", "dash_certificates", "Certificates", "bi-award", Student: true),
            new("Earnings", "tp_earnings", "Earnings", "bi-cash-coin", Teacher: true),
            new("Courses", "nav_courses", "Courses", "bi-journal-bookmark"),
            new("Teachers", "nav_teachers", "Teachers", "bi-person-workspace"),
            new("Students", "nav_students", "Students", "bi-people"),
            new("Messages", "dash_messages", "Messages", "bi-chat-dots", Teacher: true, Student: true),
            new("Profile", "dash_profile", "Profile", "bi-person-circle", Teacher: true, Student: true),
            new("Learn", "learn_continue", "Continue learning", "bi-play-circle", Student: true),
            new("Studio", "studio_open", "Course studio", "bi-easel", Teacher: true),
            new("Applications", "apply_admin", "Teacher applications", "bi-file-earmark-person")
        };

        public static IEnumerable<DashNavItem> For(ClaimsPrincipal user)
        {
            if (Roles.IsStaff(user))
                return Items.Where(item => item.Action != "Studio");

            if (user.IsInRole(Roles.Teacher))
                return Items.Where(item => item.Teacher);

            if (Roles.IsStudent(user))
                return Items.Where(item => item.Student);

            return Array.Empty<DashNavItem>();
        }
    }

    public sealed record DashNavItem(
        string Action,
        string I18n,
        string Text,
        string Icon,
        bool Teacher = false,
        bool Student = false);
}
