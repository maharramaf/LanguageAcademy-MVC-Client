/* Teacher subscription mock. Key: mf-teacher-plan. Separate from student Premium membership. */
const MF_TEACHER_KEY = "mf-teacher-plan";
const MF_TEACHER_EARN_KEY = "mf-teacher-earnings";
const MF_TEACHER_PLANS = {
  free: { id: "free", price: 0, courses: 1, lessons: 10, students: 25 },
  standard: { id: "standard", price: 19, courses: 10, lessons: 50, students: 200 },
  premium: { id: "premium", price: 39, courses: 999, lessons: 999, students: 9999 }
};

function teacherText(key, fallback) {
  if (typeof window.mfT === "function") return window.mfT(key, fallback || key);
  return fallback || key;
}

function teacherMoney(amount) {
  if (typeof window.formatPrice === "function") return window.formatPrice(amount);
  return "₼" + Number(amount || 0);
}

function readTeacherPlan() {
  try {
    const saved = JSON.parse(localStorage.getItem(MF_TEACHER_KEY) || "");
    if (saved && MF_TEACHER_PLANS[saved.plan]) return saved;
  } catch (error) { /* default free */ }
  return { plan: "free", status: "active", startedAt: null, expiresAt: null, coursesUsed: 1, lessonsUsed: 4, studentsUsed: 12 };
}

function writeTeacherPlan(record) {
  try { localStorage.setItem(MF_TEACHER_KEY, JSON.stringify(record)); } catch (error) { /* ignore */ }
}

function mfTeacherPlan() {
  return readTeacherPlan().plan;
}

function mfTeacherLimits() {
  return MF_TEACHER_PLANS[mfTeacherPlan()] || MF_TEACHER_PLANS.free;
}

function mfTeacherCanAddCourse() {
  const state = readTeacherPlan();
  const limits = MF_TEACHER_PLANS[state.plan] || MF_TEACHER_PLANS.free;
  return (state.coursesUsed || 0) < limits.courses;
}

function mfTeacherCanAddLesson(count) {
  const limits = mfTeacherLimits();
  return Number(count || 0) < limits.lessons;
}

function mfActivateTeacherPlan(planId) {
  if (!MF_TEACHER_PLANS[planId]) return readTeacherPlan();
  const start = new Date();
  const end = new Date(start.getTime());
  end.setMonth(end.getMonth() + 1);
  const current = readTeacherPlan();
  const record = {
    plan: planId,
    status: "active",
    startedAt: start.toISOString(),
    expiresAt: end.toISOString(),
    coursesUsed: current.coursesUsed || 1,
    lessonsUsed: current.lessonsUsed || 4,
    studentsUsed: current.studentsUsed || 12
  };
  writeTeacherPlan(record);
  if (typeof mfNotifyItems !== "undefined" && !window.mfNotifyLive) {
    const id = "teacher-plan-" + planId;
    if (!mfNotifyItems.some(function (item) { return String(item.id) === id; })) {
      mfNotifyItems.unshift({
        id: id,
        type: "announcement",
        titleKey: "tp_note_upgraded",
        messageKey: "tp_note_upgraded_text",
        timeKey: "time_just_now",
        href: "dashboard.html#teacher-plan-section",
        read: false,
        extra: true
      });
      if (typeof renderNotifications === "function") renderNotifications();
    }
  }
  document.dispatchEvent(new CustomEvent("mf-teacher-plan"));
  initTeacherPlan();
  return record;
}

function readTeacherEarnings() {
  try {
    const saved = JSON.parse(localStorage.getItem(MF_TEACHER_EARN_KEY) || "");
    if (saved && typeof saved.totalSales === "number") return saved;
  } catch (error) { /* mock defaults */ }
  return {
    totalSales: 1250,
    teacherShare: 1000,
    platformShare: 250,
    coursesSold: 24,
    thisMonth: 320,
    commissionPercent: 20
  };
}

function planLabel(planId) {
  if (planId === "premium") return teacherText("tp_premium", "Premium Teacher");
  if (planId === "standard") return teacherText("tp_standard", "Standard Teacher");
  return teacherText("tp_free", "Free Teacher");
}

function renderTeacherPlanCard() {
  const state = readTeacherPlan();
  const limits = MF_TEACHER_PLANS[state.plan] || MF_TEACHER_PLANS.free;
  const price = teacherMoney(limits.price);
  return '<section class="panel plan-card' + (state.plan === "premium" ? " is-premium" : "") + '">' +
    '<p class="eyebrow">' + teacherText("tp_current", "Current Teacher Plan") + '</p>' +
    '<h2>' + planLabel(state.plan) + '</h2>' +
    '<p class="plan-metric">' + price + ' <small>/ ' + teacherText("plan_month", "month") + '</small></p>' +
    '<p>' + teacherText("plan_status", "Status") + ': ' + teacherText("plan_active", "Active") + '</p>' +
    (state.expiresAt ? '<p>' + teacherText("plan_next", "Next billing date") + ': ' + new Date(state.expiresAt).toLocaleDateString() + '</p>' : '') +
    '<ul class="plan-metrics">' +
      '<li><span>' + teacherText("tp_courses_used", "Courses used") + '</span><strong>' + (state.coursesUsed || 0) + ' / ' + (limits.courses >= 999 ? "∞" : limits.courses) + '</strong></li>' +
      '<li><span>' + teacherText("tp_lessons_limit", "Lessons per course") + '</span><strong>' + (limits.lessons >= 999 ? "∞" : limits.lessons) + '</strong></li>' +
      '<li><span>' + teacherText("tp_students_used", "Students") + '</span><strong>' + (state.studentsUsed || 0) + ' / ' + (limits.students >= 9999 ? "∞" : limits.students) + '</strong></li>' +
    '</ul>' +
    '<a class="btn btn-outline btn-sm" href="dashboard.html#teacher-plan-section" data-admin-panel data-open-teacher-plans>' + teacherText("plan_manage", "Manage Plan") + '</a>' +
  '</section>';
}

function renderTeacherEarnings() {
  const data = readTeacherEarnings();
  return '<section class="panel">' +
    '<h3>' + teacherText("tp_earnings", "Teacher Earnings") + '</h3>' +
    '<p class="form-note">' + teacherText("tp_earnings_note", "Mock preview data. Not real financial information.") + '</p>' +
    '<ul class="plan-metrics">' +
      '<li><span>' + teacherText("tp_total_sales", "Total Sales") + '</span><strong>' + teacherMoney(data.totalSales) + '</strong></li>' +
      '<li><span>' + teacherText("tp_teacher_share", "Teacher Earnings") + '</span><strong>' + teacherMoney(data.teacherShare) + '</strong></li>' +
      '<li><span>' + teacherText("tp_platform_share", "Platform Commission") + '</span><strong>' + teacherMoney(data.platformShare) + '</strong></li>' +
      '<li><span>' + teacherText("tp_courses_sold", "Courses Sold") + '</span><strong>' + data.coursesSold + '</strong></li>' +
      '<li><span>' + teacherText("tp_this_month", "This Month") + '</span><strong>' + teacherMoney(data.thisMonth) + '</strong></li>' +
      '<li><span>' + teacherText("tp_commission_rate", "Commission rate") + '</span><strong>' + data.commissionPercent + '%</strong></li>' +
    '</ul>' +
  '</section>';
}

function teacherPlanAction(planId, current) {
  if (planId === current) return '<p class="pill pill-success">' + teacherText("tp_current_btn", "Current Plan") + '</p>';
  const rank = { free: 0, standard: 1, premium: 2 };
  if ((rank[planId] || 0) < (rank[current] || 0)) {
    return '<button class="btn btn-outline btn-sm" type="button" data-teacher-plan="' + planId + '">' + teacherText("tp_switch", "Switch plan") + '</button>';
  }
  if (planId === "free") return '<button class="btn btn-outline btn-sm" type="button" data-teacher-plan="free">' + teacherText("tp_current_btn", "Current Plan") + '</button>';
  return '<a class="btn btn-primary btn-sm" href="checkout.html?plan=teacher-' + planId + '">' + teacherText("tp_upgrade_" + planId, "Upgrade") + '</a>';
}

function renderTeacherPlans() {
  const root = document.querySelector("[data-teacher-plans]");
  if (!root) return;
  const state = readTeacherPlan();
  const cards = ["free", "standard", "premium"].map(function (id) {
    const plan = MF_TEACHER_PLANS[id];
    const features = id === "premium"
      ? ["tp_feat_unlimited_courses", "tp_feat_advanced_analytics", "tp_feat_advanced_ai", "tp_feat_premium_resources", "tp_feat_priority"]
      : id === "standard"
        ? ["tp_feat_10_courses", "tp_feat_more_lessons", "tp_feat_more_students", "tp_feat_analytics", "tp_feat_students"]
        : ["tp_feat_1_course", "tp_feat_limited_lessons", "tp_feat_limited_students", "tp_feat_basic_analytics", "tp_feat_publish"];
    return '<section class="panel plan-card' + (id === "premium" ? " is-premium" : "") + (id === state.plan ? " is-current" : "") + '">' +
      '<p class="eyebrow">' + planLabel(id) + '</p>' +
      '<p class="plan-metric">' + teacherMoney(plan.price) + '</p>' +
      '<p>' + teacherText("plan_per_month", "per month") + '</p>' +
      '<ul class="offer-list">' + features.map(function (key) {
        return '<li><i class="bi bi-check2" aria-hidden="true"></i><span>' + teacherText(key, key) + '</span></li>';
      }).join("") + '</ul>' +
      teacherPlanAction(id, state.plan) +
    '</section>';
  }).join("");
  root.innerHTML =
    '<div class="section-header"><p class="eyebrow">' + teacherText("tp_title", "Teacher Subscription") + '</p><h2>' + teacherText("tp_compare", "Compare Teacher Plans") + '</h2><p>' + teacherText("tp_lead", "Choose a plan to publish courses on MF Language Academy. Demo billing only.") + '</p></div>' +
    '<div class="plan-offers teacher-plan-offers">' + cards + '</div>' +
    '<div class="plan-grid" style="margin-top:16px;">' + renderTeacherPlanCard() + renderTeacherEarnings() + '</div>';
}

function renderTeacherHome() {
  const html = '<div class="plan-grid">' + renderTeacherPlanCard() + renderTeacherEarnings() + '</div>';
  document.querySelectorAll("[data-teacher-membership]").forEach(function (root) {
    root.innerHTML = html;
  });
}

function renderStudioLimitNote() {
  const note = document.querySelector("[data-studio-limit]");
  if (!note) return;
  const state = readTeacherPlan();
  const limits = MF_TEACHER_PLANS[state.plan] || MF_TEACHER_PLANS.free;
  const blocked = !mfTeacherCanAddCourse() && state.plan === "free";
  note.hidden = !blocked;
  if (blocked) {
    note.innerHTML = '<p class="plan-lock"><i class="bi bi-lock" aria-hidden="true"></i> ' + teacherText("tp_limit_reached", "You've reached your Free Teacher limit.") + '</p>' +
      '<p><a class="btn btn-outline btn-sm" href="checkout.html?plan=teacher-standard">' + teacherText("tp_upgrade_standard", "Upgrade to Standard") + '</a> ' +
      '<a class="btn btn-outline btn-sm" href="checkout.html?plan=teacher-premium">' + teacherText("tp_upgrade_premium", "Upgrade to Premium") + '</a></p>';
  }
  const badge = document.querySelector("[data-studio-plan]");
  if (badge) badge.textContent = planLabel(state.plan) + " · " + teacherMoney(limits.price) + "/" + teacherText("plan_month", "month");
}

function openTeacherPlansView() {
  const target = document.getElementById("teacher-plan-section");
  if (!target) return false;
  document.querySelectorAll(".dash-view").forEach(function (view) {
    view.classList.toggle("is-active", view === target);
  });
  document.querySelectorAll("[data-view-target]").forEach(function (button) {
    button.classList.toggle("is-active", button.getAttribute("data-view-target") === "teacher-plan-section");
  });
  const title = document.querySelector(".dash-title");
  if (title) title.textContent = teacherText("tp_title", "Teacher Subscription");
  target.scrollIntoView({ block: "start" });
  return true;
}

function initTeacherPlan() {
  renderTeacherHome();
  renderTeacherPlans();
  renderStudioLimitNote();
  if (initTeacherPlan.bound) return;
  initTeacherPlan.bound = true;
  document.addEventListener("click", function (event) {
    const open = event.target.closest("[data-open-teacher-plans]");
    if (open && document.getElementById("teacher-plan-section")) {
      event.preventDefault();
      openTeacherPlansView();
      return;
    }
    const switchBtn = event.target.closest("[data-teacher-plan]");
    if (switchBtn) {
      event.preventDefault();
      mfActivateTeacherPlan(switchBtn.getAttribute("data-teacher-plan"));
    }
  });
  document.addEventListener("mf-teacher-plan", initTeacherPlan);
  document.addEventListener("mf-language", initTeacherPlan);
}

window.mfTeacherPlan = mfTeacherPlan;
window.mfTeacherLimits = mfTeacherLimits;
window.mfTeacherCanAddCourse = mfTeacherCanAddCourse;
window.mfTeacherCanAddLesson = mfTeacherCanAddLesson;
window.mfActivateTeacherPlan = mfActivateTeacherPlan;
window.initTeacherPlan = initTeacherPlan;
document.addEventListener("DOMContentLoaded", initTeacherPlan);
