namespace LanguageAcademy_MVC_FinalProject.ViewModels.Teachers
{
    public class TeacherSectionUIVM
    {
        public int Id { get; set; }
        public string Subtitle { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public List<TeacherUIVM> Teachers { get; set; } = new();
    }
}
