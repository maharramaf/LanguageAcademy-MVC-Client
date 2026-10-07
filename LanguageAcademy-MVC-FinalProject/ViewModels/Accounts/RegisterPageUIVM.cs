namespace LanguageAcademy_MVC_FinalProject.ViewModels.Accounts
{
    public class RegisterPageUIVM
    {
        public RegisterUIVM Student { get; set; } = new();
        public TeacherApplicationUIVM Instructor { get; set; } = new();
    }
}
