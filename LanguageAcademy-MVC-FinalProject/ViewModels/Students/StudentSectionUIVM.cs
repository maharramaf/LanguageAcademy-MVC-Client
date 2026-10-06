using LanguageAcademy_MVC_FinalProject.ViewModels.Reviews;

namespace LanguageAcademy_MVC_FinalProject.ViewModels.Students
{
    public class StudentSectionUIVM
    {
        public int Id { get; set; }
        public string Subtitle { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public string StoriesSubtitle { get; set; } = string.Empty;
        public string StoriesTitle { get; set; } = string.Empty;
        public string StoriesText { get; set; } = string.Empty;
        public List<ReviewUIVM> Reviews { get; set; } = new();
    }
}
