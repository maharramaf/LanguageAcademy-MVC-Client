using System.ComponentModel.DataAnnotations;

namespace LanguageAcademy_MVC_FinalProject.ViewModels.Courses
{
    public class LessonEditUIVM
    {
        public int CourseId { get; set; }
        public int ModuleId { get; set; }
        public int LessonId { get; set; }

        [Required(ErrorMessage = "Lesson title is required.")]
        [MaxLength(160, ErrorMessage = "Lesson title is required.")]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "Lesson type is required.")]
        public string Kind { get; set; } = "video";

        [Range(0, 86400, ErrorMessage = "Duration cannot be negative.")]
        public int Seconds { get; set; }

        public string? CurrentVideo { get; set; }

        public IFormFile? Video { get; set; }
    }
}
