namespace LanguageAcademy_MVC_FinalProject.ViewModels.Stats
{
    public class StatItemUIVM
    {
        public int Id { get; set; }
        public string Icon { get; set; } = string.Empty;
        public int Value { get; set; }
        public string Suffix { get; set; } = string.Empty;
        public string Label { get; set; } = string.Empty;
        public int SortOrder { get; set; }
    }
}
