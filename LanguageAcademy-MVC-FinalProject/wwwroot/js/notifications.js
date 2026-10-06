/* Frontend notification prototype. Shown in this visit only. No network calls. */
const MF_NOTIFICATIONS = [
  { id: 1, type: "course", titleKey: "notification_new_course", messageKey: "notification_new_course_message", detailKey: "course_ielts", timeKey: "time_5_minutes", href: "catalog.html", read: false },
  { id: 2, type: "lesson", titleKey: "notification_new_lesson", messageKey: "notification_new_lesson_message", detailKey: "course_speaking", timeKey: "time_20_minutes", href: "course-details.html?course=english-beginner", read: false },
  { id: 3, type: "quiz", titleKey: "notification_quiz_result", messageKey: "notification_quiz_result_message", detailKey: "course_business", timeKey: "time_1_hour", href: "learn.html#grades", read: true },
  { id: 4, type: "certificate", titleKey: "notification_certificate", messageKey: "notification_certificate_message", detailKey: "course_spanish", timeKey: "time_yesterday", href: "certificate.html?course=english-a2", read: true },
  { id: 5, type: "enrollment", titleKey: "notification_enrollment", messageKey: "notification_enrollment_message", detailKey: "course_en_beginner", timeKey: "time_yesterday", href: "dashboard.html#my-courses-section", read: true },
  { id: 6, type: "announcement", titleKey: "notification_announcement", messageKey: "notification_announcement_message", detailKey: "", timeKey: "time_just_now", href: "notifications.html", read: false },
  { id: 7, type: "instructor", titleKey: "notification_new_student", messageKey: "notification_new_student_message", detailKey: "course_business", timeKey: "time_1_hour", href: "dashboard.html#students-section", read: true }
];

const MF_NOTIFY_ICONS = {
  course: "bi-journal-bookmark",
  lesson: "bi-play-circle",
  quiz: "bi-patch-check",
  certificate: "bi-award",
  enrollment: "bi-person-check",
  instructor: "bi-person-plus",
  announcement: "bi-megaphone"
};

let mfNotifyItems = MF_NOTIFICATIONS.map(function (item) { return Object.assign({}, item); });
let mfNotifyFilter = "all";
let mfNotifyIssued = {};

function mfNotifyText(key, fallback) {
  if (!key) return "";
  if (typeof window.mfT === "function") return window.mfT(key, fallback || key);
  return fallback || key;
}

function loadNotificationState() {}

function saveNotificationState() {}

function unreadNotificationCount() {
  return mfNotifyItems.filter(function (item) { return !item.read && !isAdminDashboardNotice(item); }).length;
}

function updateNotificationBadge() {
  const count = unreadNotificationCount();
  const label = count > 99 ? "99+" : String(count);
  document.querySelectorAll(".notify-badge").forEach(function (badge) {
    badge.hidden = count === 0;
    badge.textContent = label;
  });
  document.querySelectorAll(".notify-toggle").forEach(function (button) {
    button.setAttribute("aria-label", mfNotifyText("open_notifications", "Notifications") + (count ? " (" + label + ")" : ""));
  });
}

function notificationMarkup(item, compact) {
  const icon = MF_NOTIFY_ICONS[item.type] || "bi-bell";
  const course = item.courseKey ? mfNotifyText(item.courseKey, "") : (item.detailKey ? mfNotifyText(item.detailKey, "") : "");
  let message = mfNotifyText(item.messageKey);
  if (item.courseKey) message = message.replace(/\{courseName\}/g, course);
  return (
    '<button class="notify-item' + (item.read ? "" : " is-unread") + '" type="button" data-notify-id="' + item.id + '">' +
      '<i class="bi ' + icon + '" aria-hidden="true"></i>' +
      '<span>' +
        '<strong>' + mfNotifyText(item.titleKey) + '</strong>' +
        (course ? '<em>' + course + '</em>' : '') +
        (compact ? '' : '<small>' + message + '</small>') +
        '<time>' + mfNotifyText(item.timeKey) + '</time>' +
      '</span>' +
    '</button>'
  );
}

function emptyNotificationMarkup() {
  return (
    '<div class="notify-empty">' +
      '<i class="bi bi-bell" aria-hidden="true"></i>' +
      '<strong>' + mfNotifyText("no_notifications", "No new notifications") + '</strong>' +
      '<p>' + mfNotifyText("notifications_caught_up", "You're all caught up.") + '</p>' +
    '</div>'
  );
}

function isAdminDashboardNotice(item) {
  return item && typeof window.mfIsDashboardHref === "function" && window.mfIsDashboardHref(item.href)
    && !(typeof window.mfCanSeeAdminPanel === "function" && window.mfCanSeeAdminPanel());
}

function visibleNotifications() {
  return mfNotifyItems.filter(function (item) {
    if (isAdminDashboardNotice(item)) return false;
    if (mfNotifyFilter === "all") return true;
    if (mfNotifyFilter === "unread") return !item.read;
    return item.type === mfNotifyFilter;
  });
}

function renderNotifications() {
  const unread = unreadNotificationCount();
  document.querySelectorAll(".notify-list").forEach(function (list) {
    if (unread === 0) {
      list.innerHTML = emptyNotificationMarkup();
      return;
    }
    list.innerHTML = mfNotifyItems.filter(function (item) {
      return !isAdminDashboardNotice(item);
    }).map(function (item) {
      return notificationMarkup(item, true);
    }).join("");
  });

  const page = document.querySelector("[data-notifications]");
  if (page) {
    const rows = visibleNotifications();
    page.innerHTML = rows.length
      ? rows.map(function (item) { return notificationMarkup(item, false); }).join("")
      : emptyNotificationMarkup();
  }
  updateNotificationBadge();
}

function markNotificationAsRead(id) {
  const item = mfNotifyItems.find(function (entry) { return String(entry.id) === String(id); });
  if (!item || item.read) return item;
  item.read = true;
  saveNotificationState();
  renderNotifications();
  return item;
}

function markAllNotificationsAsRead() {
  mfNotifyItems.forEach(function (item) { item.read = true; });
  saveNotificationState();
  renderNotifications();
}

function closeNotificationPanel(except) {
  document.querySelectorAll(".notify-switch").forEach(function (wrap) {
    if (wrap === except) return;
    const panel = wrap.querySelector(".notify-panel");
    const button = wrap.querySelector(".notify-toggle");
    if (panel) panel.hidden = true;
    if (button) button.setAttribute("aria-expanded", "false");
  });
}

function toggleNotificationPanel(wrap) {
  const panel = wrap.querySelector(".notify-panel");
  const button = wrap.querySelector(".notify-toggle");
  if (!panel || !button) return;
  const open = panel.hidden;
  closeNotificationPanel(open ? wrap : null);
  panel.hidden = !open;
  button.setAttribute("aria-expanded", open ? "true" : "false");
}

function bindNotificationList(root) {
  if (!root || root.dataset.notifyBound === "1") return;
  root.dataset.notifyBound = "1";
  root.addEventListener("click", function (event) {
    const button = event.target.closest("[data-notify-id]");
    if (!button || !root.contains(button)) return;
    const item = markNotificationAsRead(button.getAttribute("data-notify-id"));
    if (item && item.href && root.classList.contains("notify-list")) {
      if (isAdminDashboardNotice(item)) return;
      window.location.href = item.href;
    }
  });
}

function ensureNotificationPage() {
  const list = document.querySelector("[data-notifications]");
  if (!list || document.querySelector(".notify-toolbar")) return;
  const bar = document.createElement("div");
  bar.className = "notify-toolbar";
  const filters = [
    ["all", "filter_all", "All"],
    ["unread", "notify_filter_unread", "Unread"],
    ["course", "nav_courses", "Courses"],
    ["lesson", "faq_cat_lessons", "Lessons"],
    ["quiz", "faq_cat_quizzes", "Quizzes"],
    ["certificate", "faq_cat_certs", "Certificates"],
    ["announcement", "notification_announcement", "Announcement"]
  ];
  bar.innerHTML =
    '<div class="notify-filters">' +
      filters.map(function (filter, index) {
        return '<button type="button" class="filter-btn' + (index === 0 ? " is-active" : "") + '" data-notify-filter="' + filter[0] + '" data-i18n="' + filter[1] + '">' + filter[2] + '</button>';
      }).join("") +
    '</div>' +
    '<button class="btn btn-outline notify-mark-all" type="button" data-i18n="mark_all_read">Mark all as read</button>';
  list.parentNode.insertBefore(bar, list);
  bar.addEventListener("click", function (event) {
    const filter = event.target.closest("[data-notify-filter]");
    if (filter) {
      mfNotifyFilter = filter.getAttribute("data-notify-filter");
      bar.querySelectorAll("[data-notify-filter]").forEach(function (button) {
        button.classList.toggle("is-active", button === filter);
      });
      renderNotifications();
      return;
    }
    if (event.target.closest(".notify-mark-all")) markAllNotificationsAsRead();
  });
  bindNotificationList(list);
}

function mountNotificationControls() {
  document.querySelectorAll(".header-tools").forEach(function (tools) {
    if (tools.querySelector(".notify-switch")) return;
    const wrap = document.createElement("div");
    wrap.className = "notify-switch";
    wrap.innerHTML =
      '<button class="notify-toggle" type="button" aria-haspopup="dialog" aria-expanded="false" data-i18n-aria-label="open_notifications">' +
        '<i class="bi bi-bell" aria-hidden="true"></i>' +
        '<span class="notify-badge" hidden>0</span>' +
      '</button>' +
      '<div class="notify-panel" role="dialog" hidden>' +
        '<div class="notify-head">' +
          '<strong data-i18n="notes_title">Notifications</strong>' +
          '<button class="notify-mark-all" type="button" data-i18n="mark_all_read">Mark all as read</button>' +
        '</div>' +
        '<div class="notify-list"></div>' +
        '<a class="notify-all" href="notifications.html" data-i18n="view_all_notifications">View all notifications</a>' +
      '</div>';
    const theme = tools.querySelector(".theme-toggle");
    if (theme && theme.nextSibling) tools.insertBefore(wrap, theme.nextSibling);
    else tools.appendChild(wrap);
    const button = wrap.querySelector(".notify-toggle");
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      toggleNotificationPanel(wrap);
    });
    wrap.querySelector(".notify-mark-all").addEventListener("click", function () {
      markAllNotificationsAsRead();
    });
    bindNotificationList(wrap.querySelector(".notify-list"));
  });
}

function initNotifications() {
  if (document.documentElement.dataset.notifyReady === "1") {
    mountNotificationControls();
    ensureNotificationPage();
    renderNotifications();
    if (typeof window.applyTranslations === "function") window.applyTranslations();
    return;
  }
  document.documentElement.dataset.notifyReady = "1";
  loadNotificationState();
  mountNotificationControls();
  ensureNotificationPage();
  renderNotifications();
  if (typeof window.applyTranslations === "function") window.applyTranslations();
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".notify-switch")) closeNotificationPanel(null);
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeNotificationPanel(null);
  });
  document.addEventListener("mf-language", function () {
    renderNotifications();
    if (typeof window.applyTranslations === "function") window.applyTranslations();
  });
}

window.MF_NOTIFICATIONS = MF_NOTIFICATIONS;
window.initNotifications = initNotifications;
window.renderNotifications = renderNotifications;
window.updateNotificationBadge = updateNotificationBadge;
window.markNotificationAsRead = markNotificationAsRead;
window.markAllNotificationsAsRead = markAllNotificationsAsRead;
window.toggleNotificationPanel = toggleNotificationPanel;
window.closeNotificationPanel = closeNotificationPanel;
window.mfNotifyIssued = function () { return mfNotifyIssued; };
window.mfIssueCertificateNotice = function (id) {
  if (mfNotifyIssued[id]) return false;
  mfNotifyIssued[id] = true;
  return true;
};

document.addEventListener("DOMContentLoaded", function () {
  initNotifications();
});
