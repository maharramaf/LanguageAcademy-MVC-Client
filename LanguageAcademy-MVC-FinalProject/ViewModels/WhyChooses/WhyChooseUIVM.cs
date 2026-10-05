namespace LanguageAcademy_MVC_FinalProject.ViewModels.WhyChooses
{
    public class WhyChooseUIVM
    {
        public int Id { get; set; }
        public string Eyebrow { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Lead { get; set; } = string.Empty;
        public List<WhyChooseCardUIVM> Cards { get; set; } = new();
    }
}
