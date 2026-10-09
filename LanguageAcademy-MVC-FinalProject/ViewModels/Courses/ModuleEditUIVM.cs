using System.ComponentModel.DataAnnotations;

namespace LanguageAcademy_MVC_FinalProject.ViewModels.Courses
{
    public class ModuleEditUIVM
    {
        public int CourseId { get; set; }
        public int ModuleId { get; set; }

        [Required(ErrorMessage = "Module title is required.")]
        [MaxLength(160, ErrorMessage = "Module title is required.")]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "Module info is required.")]
        [MaxLength(80, ErrorMessage = "Module info is required.")]
        public string Info { get; set; } = string.Empty;
    }
}
