using System.ComponentModel.DataAnnotations;

namespace LanguageAcademy_MVC_FinalProject.ViewModels.Accounts
{
    public class LoginUIVM
    {
        [Required]
        [EmailAddress]
        [MaxLength(254)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MinLength(8, ErrorMessage = "Use at least 8 characters.")]
        public string Password { get; set; } = string.Empty;
    }
}
