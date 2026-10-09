namespace LanguageAcademy_MVC_FinalProject.ViewModels.Courses
{
    public class CourseLessonsPageUIVM
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public List<CourseModuleUIVM> Modules { get; set; } = new();
        public ModuleCreateUIVM Module { get; set; } = new();
    }
}
