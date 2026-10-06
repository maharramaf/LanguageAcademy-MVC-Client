namespace LanguageAcademy_MVC_FinalProject.ViewModels.Reviews
{
    public class ReviewSectionUIVM
    {
        public int Id { get; set; }
        public string Subtitle { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public List<ReviewUIVM> Reviews { get; set; } = new();
    }
}
