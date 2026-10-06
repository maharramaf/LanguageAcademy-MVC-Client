namespace LanguageAcademy_MVC_FinalProject.ViewModels.Stats
{
    public class StatsUIVM
    {
        public int Id { get; set; }
        public List<StatItemUIVM> Items { get; set; } = new();
    }
}
