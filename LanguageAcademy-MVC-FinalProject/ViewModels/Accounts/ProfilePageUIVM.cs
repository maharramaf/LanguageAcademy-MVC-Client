namespace LanguageAcademy_MVC_FinalProject.ViewModels.Accounts
{
    public class ProfilePageUIVM
    {
        public ProfileUIVM Profile { get; set; } = new();
        public ProfilePasswordUIVM Password { get; set; } = new();
    }
}
