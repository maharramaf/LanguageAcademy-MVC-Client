using System.ComponentModel.DataAnnotations;

namespace LanguageAcademy_MVC_FinalProject.ViewModels.Courses
{
    public class CourseEditUIVM
    {
        public int Id { get; set; }
        public string Slug { get; set; } = string.Empty;
        public string CurrentImage { get; set; } = string.Empty;

        [Required(ErrorMessage = "Title is required.")]
        [MaxLength(160, ErrorMessage = "Title is required.")]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "Course type is required.")]
        public string Type { get; set; } = "standard";

        [Required(ErrorMessage = "Level is required.")]
        [MaxLength(60, ErrorMessage = "Level is required.")]
        public string Level { get; set; } = string.Empty;

        [Required(ErrorMessage = "Duration is required.")]
        [MaxLength(40, ErrorMessage = "Duration is required.")]
        public string Duration { get; set; } = string.Empty;

        [Range(0, 999999, ErrorMessage = "Price cannot be negative.")]
        public decimal Price { get; set; }

        public IFormFile? Image { get; set; }

        [Required(ErrorMessage = "Summary is required.")]
        [MaxLength(500, ErrorMessage = "Summary is required.")]
        public string Summary { get; set; } = string.Empty;

        [Required(ErrorMessage = "Overview is required.")]
        [MaxLength(2000, ErrorMessage = "Overview is required.")]
        public string Overview { get; set; } = string.Empty;
    }
}
