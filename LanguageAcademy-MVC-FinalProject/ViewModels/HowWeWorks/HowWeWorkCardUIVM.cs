namespace LanguageAcademy_MVC_FinalProject.ViewModels.HowWeWorks
{
    public class HowWeWorkCardUIVM
    {
        public int Id { get; set; }
        public string Icon { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public int Order { get; set; }
    }
}
