/* Live notifications consume api/Notifications + SignalR /hubs/notify. */
window.mfNotifyLive = true;
const MF_NOTIFY_ICONS = {
  course: "bi-journal-bookmark",
  lesson: "bi-play-circle",
  quiz: "bi-patch-check",
  certificate: "bi-award",
  enrollment: "bi-person-check",
  instructor: "bi-person-plus",
  message: "bi-chat-dots",
  announcement: "bi-megaphone"
};

let mfNotifyItems = [];
let mfNotifyFilter = "all";
let mfNotifyIssued = {};

function mfNotifyText(key, fallback) {
  if (!key) return "";
  if (typeof window.mfT === "function") return window.mfT(key, fallback || key);
  return fallback || key;
}

function notifyTokenUrl() {
  const root = document.documentElement;
  return root.getAttribute("data-notify-token") || "";
}

function notifyListUrl() {
  return document.documentElement.getAttribute("data-notify-list") || "/Notifications/List";
}

function notifyReadUrl(id) {
  const base = document.documentElement.getAttribute("data-notify-read") || "/Notifications/Read";
  return base + "?id=" + encodeURIComponent(id);
}

function notifyReadAllUrl() {
  return document.documentElement.getAttribute("data-notify-read-all") || "/Notifications/ReadAll";
}

function notifyWhen(value) {
  if (!value) return "";
  const text = String(value);
  const date = new Date(/[zZ]|[+-]\d{2}:\d{2}$/.test(text) ? text : text + "Z");
  if (Number.isNaN(date.getTime())) return "";
  const seconds = Math.max(0, (Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return Math.floor(seconds / 60) + " min ago";
  if (seconds < 86400) return Math.floor(seconds / 3600) + " h ago";
  return date.toLocaleDateString();
}

function unreadNotificationCount() {
  return mfNotifyItems.filter(function (item) { return !item.read; }).length;
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
  return (
    '<button class="notify-item' + (item.read ? "" : " is-unread") + '" type="button" data-notify-id="' + item.id + '" data-href="' + escapeAttr(item.href || "") + '">' +
      '<i class="bi ' + icon + '" aria-hidden="true"></i>' +
      '<span>' +
        '<strong>' + escapeHtml(item.title || "") + '</strong>' +
        (compact ? "" : '<small>' + escapeHtml(item.body || "") + "</small>") +
        "<time>" + escapeHtml(notifyWhen(item.createdAt)) + "</time>" +
      "</span>" +
    "</button>"
  );
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/'/g, "&#39;");
}

function emptyNotificationMarkup() {
  return (
    '<div class="notify-empty">' +
      '<i class="bi bi-bell" aria-hidden="true"></i>' +
      '<strong>' + mfNotifyText("no_notifications", "No new notifications") + "</strong>" +
      '<p>' + mfNotifyText("notifications_caught_up", "You're all caught up.") + "</p>" +
    "</div>"
  );
}

function visibleNotifications() {
  return mfNotifyItems.filter(function (item) {
    if (mfNotifyFilter === "all") return true;
    if (mfNotifyFilter === "unread") return !item.read;
    return item.type === mfNotifyFilter;
  });
}

function renderNotifications() {
  document.querySelectorAll(".notify-list").forEach(function (list) {
    list.innerHTML = mfNotifyItems.length
      ? mfNotifyItems.map(function (item) { return notificationMarkup(item, true); }).join("")
      : emptyNotificationMarkup();
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

function upsertNotification(item) {
  if (!item || !item.id) return;
  const index = mfNotifyItems.findIndex(function (entry) { return String(entry.id) === String(item.id); });
  if (index >= 0) mfNotifyItems[index] = item;
  else mfNotifyItems.unshift(item);
  renderNotifications();
}

function markNotificationAsRead(id) {
  const item = mfNotifyItems.find(function (entry) { return String(entry.id) === String(id); });
  if (!item || item.read) return item;
  item.read = true;
  renderNotifications();
  if (notifyTokenUrl()) {
    fetch(notifyReadUrl(id), { method: "POST", credentials: "same-origin" });
  }
  return item;
}

function markAllNotificationsAsRead() {
  mfNotifyItems.forEach(function (item) { item.read = true; });
  renderNotifications();
  if (notifyTokenUrl()) {
    fetch(notifyReadAllUrl(), { method: "POST", credentials: "same-origin" });
  }
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
    const href = button.getAttribute("data-href") || (item && item.href);
    if (href) window.location.href = href;
  });
}

function mountNotificationControls() {
  document.querySelectorAll(".header-tools").forEach(function (tools) {
    if (tools.querySelector(".notify-switch")) return;
    if (!notifyTokenUrl()) return;
    const wrap = document.createElement("div");
    wrap.className = "notify-switch";
    wrap.innerHTML =
      '<button class="notify-toggle" type="button" aria-haspopup="dialog" aria-expanded="false" data-i18n-aria-label="open_notifications">' +
        '<i class="bi bi-bell" aria-hidden="true"></i>' +
        '<span class="notify-badge" hidden>0</span>' +
      "</button>" +
      '<div class="notify-panel" role="dialog" hidden>' +
        '<div class="notify-head">' +
          '<strong data-i18n="notes_title">Notifications</strong>' +
          '<button class="notify-mark-all" type="button" data-i18n="mark_all_read">Mark all as read</button>' +
        "</div>" +
        '<div class="notify-list"></div>' +
      "</div>";
    const theme = tools.querySelector(".theme-toggle");
    if (theme && theme.nextSibling) tools.insertBefore(wrap, theme.nextSibling);
    else tools.appendChild(wrap);
    wrap.querySelector(".notify-toggle").addEventListener("click", function (event) {
      event.stopPropagation();
      toggleNotificationPanel(wrap);
    });
    wrap.querySelector(".notify-mark-all").addEventListener("click", function () {
      markAllNotificationsAsRead();
    });
    bindNotificationList(wrap.querySelector(".notify-list"));
  });
}

function loadNotifications() {
  if (!notifyTokenUrl()) {
    renderNotifications();
    return Promise.resolve();
  }
  return fetch(notifyListUrl(), { credentials: "same-origin" })
    .then(function (response) {
      if (!response.ok) throw new Error("list");
      return response.json();
    })
    .then(function (items) {
      mfNotifyItems = Array.isArray(items) ? items : [];
      renderNotifications();
    })
    .catch(function () {
      renderNotifications();
    });
}

function connectNotificationHub() {
  const tokenUrl = notifyTokenUrl();
  if (!tokenUrl || typeof signalR === "undefined") return;
  fetch(tokenUrl, { credentials: "same-origin" })
    .then(function (response) {
      if (!response.ok) throw new Error("token");
      return response.json();
    })
    .then(function (data) {
      const connection = new signalR.HubConnectionBuilder()
        .withUrl(data.hubUrl, { accessTokenFactory: function () { return data.token; } })
        .withAutomaticReconnect()
        .build();
      connection.on("ReceiveNotification", upsertNotification);
      return connection.start();
    })
    .catch(function () { /* keep the loaded list */ });
}

function initNotifications() {
  if (document.documentElement.dataset.notifyReady === "1") {
    mountNotificationControls();
    renderNotifications();
    return;
  }
  document.documentElement.dataset.notifyReady = "1";
  mountNotificationControls();
  loadNotifications().then(connectNotificationHub);
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

window.mfNotifyItems = mfNotifyItems;
window.initNotifications = initNotifications;
window.renderNotifications = renderNotifications;
window.updateNotificationBadge = updateNotificationBadge;
window.markNotificationAsRead = markNotificationAsRead;
window.markAllNotificationsAsRead = markAllNotificationsAsRead;
window.toggleNotificationPanel = toggleNotificationPanel;
window.closeNotificationPanel = closeNotificationPanel;
window.mfNotifyIssued = function () { return mfNotifyIssued; };
window.mfIssueCertificateNotice = function () { return false; };

document.addEventListener("DOMContentLoaded", function () {
  initNotifications();
});
