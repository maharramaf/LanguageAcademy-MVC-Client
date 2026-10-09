namespace LanguageAcademy_MVC_FinalProject.ViewModels.Plans
{
    public class PlanPageUIVM
    {
        public string Current { get; set; } = "demo";
        public List<PlanUIVM> Items { get; set; } = new();
    }
}
