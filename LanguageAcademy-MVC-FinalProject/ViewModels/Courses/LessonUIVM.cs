namespace LanguageAcademy_MVC_FinalProject.ViewModels.Courses
{
    public class LessonUIVM
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Kind { get; set; } = string.Empty;
        public string? Video { get; set; }
        public int Seconds { get; set; }
        public int Order { get; set; }
        public bool Completed { get; set; }
    }
}
