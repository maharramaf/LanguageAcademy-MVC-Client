namespace LanguageAcademy_MVC_FinalProject.ViewModels.HowWeWorks
{
    public class HowWeWorkUIVM
    {
        public int Id { get; set; }
        public string Eyebrow { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public List<HowWeWorkCardUIVM> Cards { get; set; } = new();
    }
}
