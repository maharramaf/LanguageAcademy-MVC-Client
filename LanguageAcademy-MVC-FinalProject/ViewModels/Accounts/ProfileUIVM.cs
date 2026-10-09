using System.ComponentModel.DataAnnotations;

namespace LanguageAcademy_MVC_FinalProject.ViewModels.Accounts
{
    public class ProfileUIVM
    {
        [Required(ErrorMessage = "Name is required.")]
        [MaxLength(80, ErrorMessage = "Name is required.")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Surname is required.")]
        [MaxLength(80, ErrorMessage = "Surname is required.")]
        public string Surname { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Phone is required.")]
        [MaxLength(40, ErrorMessage = "Enter a valid phone number.")]
        public string Phone { get; set; } = string.Empty;

        public string Role { get; set; } = string.Empty;
    }
}
