namespace LanguageAcademy_MVC_FinalProject.ViewModels.Courses
{
    public class CourseDetailUIVM
    {
        public int Id { get; set; }
        public string Slug { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string Level { get; set; } = string.Empty;
        public string Duration { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Image { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
        public string Overview { get; set; } = string.Empty;
        public string? PreviewVideoUrl { get; set; }
        public List<string> Outcomes { get; set; } = new();
        public List<CourseModuleUIVM> Modules { get; set; } = new();
    }
}
