namespace LanguageAcademy_MVC_FinalProject.ViewModels.Rewards
{
    public class RewardsUIVM
    {
        public int Xp { get; set; }
        public int Points { get; set; }
        public int Level { get; set; }
        public string LevelName { get; set; } = string.Empty;
        public int ProgressPercent { get; set; }
        public string NextLevelText { get; set; } = string.Empty;
        public int StreakDays { get; set; }
        public int CoursesDone { get; set; }
        public List<RewardAchievementUIVM> Achievements { get; set; } = new();
    }
}
