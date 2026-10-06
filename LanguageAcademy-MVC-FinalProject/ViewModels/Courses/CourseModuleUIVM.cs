namespace LanguageAcademy_MVC_FinalProject.ViewModels.Courses
{
    public class CourseModuleUIVM
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Info { get; set; } = string.Empty;
        public int Order { get; set; }
        public List<LessonUIVM> Lessons { get; set; } = new();
    }
}
