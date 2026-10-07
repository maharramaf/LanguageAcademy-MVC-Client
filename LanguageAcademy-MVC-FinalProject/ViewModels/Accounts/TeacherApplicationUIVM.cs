using System.ComponentModel.DataAnnotations;

namespace LanguageAcademy_MVC_FinalProject.ViewModels.Accounts
{
    public class TeacherApplicationUIVM
    {
        [Required]
        [MaxLength(80)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(80)]
        public string Surname { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MaxLength(254)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MaxLength(40)]
        public string Phone { get; set; } = string.Empty;

        [Required]
        [MaxLength(80)]
        public string Country { get; set; } = string.Empty;

        [Required]
        [MaxLength(160)]
        public string Education { get; set; } = string.Empty;

        [Required]
        [MaxLength(160)]
        public string Institution { get; set; } = string.Empty;

        [Required]
        [MaxLength(160)]
        public string Experience { get; set; } = string.Empty;

        [Range(0, 60)]
        public int Years { get; set; }

        [Required]
        [MaxLength(160)]
        public string Languages { get; set; } = string.Empty;

        [Required]
        [MaxLength(120)]
        public string Subject { get; set; } = string.Empty;

        [Required]
        [MaxLength(2000)]
        public string Bio { get; set; } = string.Empty;

        [MaxLength(400)]
        public string? Portfolio { get; set; }
    }
}
