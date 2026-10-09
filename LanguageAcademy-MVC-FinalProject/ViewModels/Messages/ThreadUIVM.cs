namespace LanguageAcademy_MVC_FinalProject.ViewModels.Messages
{
    public class ThreadUIVM
    {
        public string UserId { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public List<MessageUIVM> Messages { get; set; } = new();
    }
}
