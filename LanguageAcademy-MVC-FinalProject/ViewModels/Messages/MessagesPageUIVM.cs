using System.ComponentModel.DataAnnotations;

namespace LanguageAcademy_MVC_FinalProject.ViewModels.Messages
{
    public class MessagesPageUIVM
    {
        public List<ConversationUIVM> Inbox { get; set; } = new();
        public List<ContactUIVM> Contacts { get; set; } = new();
        public ThreadUIVM? Thread { get; set; }
        public string? ReceiverId { get; set; }

        [Required(ErrorMessage = "Write a message.")]
        [MaxLength(2000, ErrorMessage = "Write a message.")]
        public string Body { get; set; } = string.Empty;
    }
}
