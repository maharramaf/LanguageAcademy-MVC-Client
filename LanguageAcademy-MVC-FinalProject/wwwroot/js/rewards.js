/* Student XP, MF Points, levels, achievements. Key: mf-rewards. Reuses membership streak UI. */
const MF_REWARDS_KEY = "mf-rewards";
const MF_XP_RULES = { lesson: 20, homework: 50, quiz: 50, course: 200 };
const MF_POINT_RULES = { homework: 20, quiz: 30, course: 100 };
const MF_LEVELS = [
  { level: 1, xp: 0, key: "reward_level_1" },
  { level: 2, xp: 200, key: "reward_level_2" },
  { level: 3, xp: 500, key: "reward_level_3" },
  { level: 4, xp: 1000, key: "reward_level_4" },
  { level: 5, xp: 2000, key: "reward_level_5" }
];

function rewardText(key, fallback) {
  if (typeof window.mfT === "function") return window.mfT(key, fallback || key);
  return fallback || key;
}

function defaultRewards() {
  return {
    xp: 180,
    points: 40,
    streakDays: 3,
    lastActive: null,
    homeworkDone: 2,
    quizzesDone: 1,
    coursesDone: 0,
    lessonsDone: 3,
    achievements: { homework_hero: false, quiz_master: false, streak_7: false, course_champion: false, fast_learner: false }
  };
}

function readRewards() {
  try {
    const saved = JSON.parse(localStorage.getItem(MF_REWARDS_KEY) || "");
    if (saved && typeof saved.xp === "number") return saved;
  } catch (error) { /* defaults */ }
  return defaultRewards();
}

function writeRewards(state) {
  try { localStorage.setItem(MF_REWARDS_KEY, JSON.stringify(state)); } catch (error) { /* ignore */ }
}

function levelFromXp(xp) {
  let current = MF_LEVELS[0];
  MF_LEVELS.forEach(function (item) {
    if (xp >= item.xp) current = item;
  });
  return current;
}

function nextLevelFromXp(xp) {
  for (let i = 0; i < MF_LEVELS.length; i += 1) {
    if (xp < MF_LEVELS[i].xp) return MF_LEVELS[i];
  }
  return null;
}

function pushRewardNotice(id, titleKey, messageKey) {
  if (typeof mfNotifyItems === "undefined") return;
  if (mfNotifyItems.some(function (item) { return String(item.id) === id; })) return;
  mfNotifyItems.unshift({
    id: id,
    type: "announcement",
    titleKey: titleKey,
    messageKey: messageKey,
    timeKey: "time_just_now",
    href: "dashboard.html#rewards-section",
    read: false,
    extra: true
  });
  if (typeof renderNotifications === "function") renderNotifications();
}

function syncAchievements(state) {
  const before = JSON.stringify(state.achievements);
  state.achievements.homework_hero = state.homeworkDone >= 5;
  state.achievements.quiz_master = state.quizzesDone >= 10;
  state.achievements.streak_7 = state.streakDays >= 7;
  state.achievements.course_champion = state.coursesDone >= 1;
  state.achievements.fast_learner = state.lessonsDone >= 10;
  if (JSON.stringify(state.achievements) !== before) {
    Object.keys(state.achievements).forEach(function (key) {
      if (state.achievements[key]) {
        pushRewardNotice("ach-" + key, "reward_ach_unlocked", "reward_ach_" + key);
      }
    });
  }
}

function bumpStreak(state) {
  const today = new Date().toISOString().slice(0, 10);
  if (state.lastActive === today) return;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const y = yesterday.toISOString().slice(0, 10);
  state.streakDays = state.lastActive === y ? (state.streakDays || 0) + 1 : 1;
  state.lastActive = today;
}

function showRewardToast(parts) {
  let toast = document.querySelector("[data-reward-toast]");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "reward-toast";
    toast.setAttribute("data-reward-toast", "");
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  toast.innerHTML = '<strong>🎉 ' + rewardText("reward_great", "Great Job!") + '</strong><p>' + parts.join("<br>") + '</p>';
  toast.hidden = false;
  window.clearTimeout(showRewardToast.timer);
  showRewardToast.timer = window.setTimeout(function () { toast.hidden = true; }, 4200);
}

function mfGrantReward(kind, options) {
  const state = readRewards();
  const opts = options || {};
  const xpGain = MF_XP_RULES[kind] || 0;
  const pointGain = MF_POINT_RULES[kind] || 0;
  const oldLevel = levelFromXp(state.xp).level;
  state.xp += xpGain;
  state.points += pointGain;
  bumpStreak(state);
  if (kind === "lesson") state.lessonsDone += 1;
  if (kind === "homework") state.homeworkDone += 1;
  if (kind === "quiz") state.quizzesDone += 1;
  if (kind === "course") state.coursesDone += 1;
  syncAchievements(state);
  writeRewards(state);
  const newLevel = levelFromXp(state.xp).level;
  const lines = [];
  if (opts.label) lines.push(opts.label);
  if (xpGain) {
    lines.push("+" + xpGain + " XP");
    pushRewardNotice("xp-" + kind + "-" + Date.now(), "reward_xp_title", "reward_xp_" + kind);
  }
  if (pointGain) {
    lines.push("+" + pointGain + " " + rewardText("reward_mf_points", "MF Points"));
    pushRewardNotice("pts-" + kind + "-" + Date.now(), "reward_points_title", "reward_points_" + kind);
  }
  if (newLevel > oldLevel) {
    lines.push(rewardText("reward_level_up", "You reached a new level!") + " " + newLevel);
    pushRewardNotice("level-" + newLevel, "reward_level_up", "reward_level_" + newLevel);
  }
  if (lines.length) showRewardToast(lines);
  document.dispatchEvent(new CustomEvent("mf-rewards"));
  initRewards();
  return state;
}

function achievementProgress(state, key) {
  if (key === "homework_hero") return { done: Math.min(state.homeworkDone, 5), total: 5 };
  if (key === "quiz_master") return { done: Math.min(state.quizzesDone, 10), total: 10 };
  if (key === "streak_7") return { done: Math.min(state.streakDays, 7), total: 7 };
  if (key === "course_champion") return { done: Math.min(state.coursesDone, 1), total: 1 };
  if (key === "fast_learner") return { done: Math.min(state.lessonsDone, 10), total: 10 };
  return { done: 0, total: 1 };
}

function rewardsMarkup() {
  const state = readRewards();
  const level = levelFromXp(state.xp);
  const next = nextLevelFromXp(state.xp);
  const startXp = level.xp;
  const endXp = next ? next.xp : level.xp;
  const span = Math.max(1, endXp - startXp);
  const pct = next ? Math.min(100, Math.round((state.xp - startXp) * 100 / span)) : 100;
  const keys = ["homework_hero", "quiz_master", "streak_7", "course_champion", "fast_learner"];
  const badges = keys.map(function (key) {
    const on = state.achievements[key];
    const progress = achievementProgress(state, key);
    return '<div class="plan-badge-item' + (on ? " is-on" : "") + '">' +
      (on ? "🏆" : "🔒") + " " + rewardText("reward_ach_" + key, key) +
      '<small>' + progress.done + " / " + progress.total + (on ? " · " + rewardText("reward_unlocked", "UNLOCKED") : " · " + rewardText("reward_locked", "LOCKED")) + '</small></div>';
  }).join("");
  return '<div class="plan-grid">' +
    '<section class="panel"><h3>' + rewardText("reward_xp", "Your XP") + '</h3><p class="plan-metric">' + state.xp.toLocaleString() + ' XP</p>' +
      '<p>' + rewardText("reward_level", "Current Level") + ': <strong>' + level.level + " — " + rewardText(level.key, level.key) + '</strong></p>' +
      '<div class="progress" aria-hidden="true"><span style="width:' + pct + '%"></span></div>' +
      '<p>' + (next ? rewardText("reward_next_level", "Progress to next level") + ": " + pct + "%" : rewardText("reward_max_level", "Max level reached")) + '</p></section>' +
    '<section class="panel"><h3>' + rewardText("reward_mf_points", "MF Points") + '</h3><p class="plan-metric">' + state.points + '</p><p class="form-note">' + rewardText("reward_points_note", "Points can later become discount coupons. Demo only.") + '</p></section>' +
    '<section class="panel"><h3>🔥 ' + rewardText("plan_streak", "Learning Streak") + '</h3><p class="plan-metric">' + state.streakDays + ' <small>' + rewardText("plan_days", "Days") + '</small></p></section>' +
    '<section class="panel"><h3>' + rewardText("plan_achievements", "Achievements") + '</h3><div class="plan-badges">' + badges + '</div></section>' +
  '</div>';
}

function renderRewardsPanel() {
  const html = rewardsMarkup();
  document.querySelectorAll("[data-student-rewards]").forEach(function (root) {
    root.innerHTML = html;
  });
}

function initRewards() {
  renderRewardsPanel();
  const page = document.querySelector("[data-rewards-page]");
  if (page) {
    const state = readRewards();
    const level = levelFromXp(state.xp);
    const next = nextLevelFromXp(state.xp);
    const startXp = level.xp;
    const endXp = next ? next.xp : level.xp;
    const span = Math.max(1, endXp - startXp);
    const pct = next ? Math.min(100, Math.round((state.xp - startXp) * 100 / span)) : 100;
    const keys = ["homework_hero", "quiz_master", "streak_7", "course_champion", "fast_learner"];
    page.innerHTML =
      '<div class="section-header"><p class="eyebrow">' + rewardText("reward_title", "Rewards") + '</p><h2>' + rewardText("reward_lead", "Earn XP and MF Points as you learn.") + '</h2></div>' +
      '<div class="plan-grid">' +
        '<section class="panel"><h3>' + rewardText("reward_xp", "Your XP") + '</h3><p class="plan-metric">' + state.xp.toLocaleString() + ' XP</p>' +
          '<p>' + rewardText("reward_level", "Current Level") + ': <strong>' + level.level + " — " + rewardText(level.key, level.key) + '</strong></p>' +
          '<div class="progress" aria-hidden="true"><span style="width:' + pct + '%"></span></div></section>' +
        '<section class="panel"><h3>' + rewardText("reward_mf_points", "MF Points") + '</h3><p class="plan-metric">' + state.points + '</p></section>' +
        '<section class="panel"><h3>🔥 ' + rewardText("plan_streak", "Learning Streak") + '</h3><p class="plan-metric">' + state.streakDays + '</p></section>' +
        '<section class="panel"><h3>' + rewardText("plan_achievements", "Achievements") + '</h3><div class="plan-badges">' + keys.map(function (key) {
          const on = state.achievements[key];
          const progress = achievementProgress(state, key);
          return '<div class="plan-badge-item' + (on ? " is-on" : "") + '">' + (on ? "🏆" : "🔒") + " " + rewardText("reward_ach_" + key, key) + "<small>" + progress.done + " / " + progress.total + "</small></div>";
        }).join("") + '</div></section>' +
      '</div>' +
      '<section class="panel" style="margin-top:16px;"><h3>' + rewardText("reward_homework", "Homework Rewards") + '</h3><p>' + rewardText("reward_homework_lead", "Complete homework on the learning page to earn +50 XP and +20 MF Points.") + '</p><a class="btn btn-primary" href="learn.html">' + rewardText("learn_continue", "Continue learning") + '</a></section>';
  }
  if (initRewards.bound) return;
  initRewards.bound = true;
  document.addEventListener("mf-rewards", initRewards);
  document.addEventListener("mf-language", initRewards);
}

window.mfGrantReward = mfGrantReward;
window.mfReadRewards = readRewards;
window.initRewards = initRewards;
document.addEventListener("DOMContentLoaded", initRewards);
