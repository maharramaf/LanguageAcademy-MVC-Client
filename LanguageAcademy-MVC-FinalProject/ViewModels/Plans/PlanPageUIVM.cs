namespace LanguageAcademy_MVC_FinalProject.ViewModels.Plans
{
    public class PlanPageUIVM
    {
        public string Current { get; set; } = "demo";
        public string CurrentTitle { get; set; } = string.Empty;
        public int AssignedCount { get; set; }
        public int? CourseLimit { get; set; }
        public bool ShowUsage { get; set; }
        public List<PlanUIVM> Items { get; set; } = new();

        public string DisplayCurrent
        {
            get
            {
                if (!string.IsNullOrWhiteSpace(CurrentTitle))
                    return CurrentTitle;

                return Items.FirstOrDefault(item =>
                    string.Equals(item.Type, Current, StringComparison.OrdinalIgnoreCase))?.Title
                    ?? Current;
            }
        }
    }
}
