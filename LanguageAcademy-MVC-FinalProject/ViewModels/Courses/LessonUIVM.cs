namespace LanguageAcademy_MVC_FinalProject.ViewModels.Courses
{
    public class LessonUIVM
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Kind { get; set; } = string.Empty;
        public string? VideoUrl { get; set; }
        public int DurationSeconds { get; set; }
        public int SortOrder { get; set; }
    }
}
