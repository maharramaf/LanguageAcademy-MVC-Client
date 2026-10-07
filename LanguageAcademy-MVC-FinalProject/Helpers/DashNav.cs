namespace LanguageAcademy_MVC_FinalProject.Helpers
{
    public static class DashNav
    {
        public static readonly DashNavItem[] Items =
        {
            new("Index", "dash_home", "Dashboard", "bi-grid"),
            new("MyCourses", "dash_my_courses", "My Courses", "bi-book"),
            new("Plans", "plan_nav", "Plans", "bi-stars"),
            new("TeacherPlan", "tp_title", "Teacher Subscription", "bi-person-badge"),
            new("Rewards", "reward_title", "Rewards", "bi-trophy"),
            new("Earnings", "tp_earnings", "Earnings", "bi-cash-coin"),
            new("Courses", "nav_courses", "Courses", "bi-journal-bookmark"),
            new("Teachers", "nav_teachers", "Teachers", "bi-person-workspace"),
            new("Students", "nav_students", "Students", "bi-people"),
            new("Messages", "dash_messages", "Messages", "bi-chat-dots"),
            new("Profile", "dash_profile", "Profile", "bi-person-circle"),
            new("Learn", "learn_continue", "Continue learning", "bi-play-circle"),
            new("Studio", "studio_open", "Course studio", "bi-easel"),
            new("Applications", "apply_admin", "Teacher applications", "bi-file-earmark-person")
        };
    }

    public sealed record DashNavItem(string Action, string I18n, string Text, string Icon);
}
