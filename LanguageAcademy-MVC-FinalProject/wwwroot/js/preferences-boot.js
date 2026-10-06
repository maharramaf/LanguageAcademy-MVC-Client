/* Apply saved theme, language, and admin-panel access before the page paints. */
(function () {
  var AUTH_KEY = "mf-auth";
  var ADMIN_ROLES = { superadmin: 1, "super admin": 1, admin: 1 };

  function normalizeRole(role) {
    return String(role || "").toLowerCase().replace(/[_-]+/g, " ").trim();
  }

  function readAuth() {
    try {
      var saved = JSON.parse(localStorage.getItem(AUTH_KEY) || "null");
      return saved && typeof saved === "object" ? saved : null;
    } catch (e) {
      return null;
    }
  }

  function rolesOf(auth) {
    if (!auth) return [];
    var list = Array.isArray(auth.roles) ? auth.roles : (auth.role ? [auth.role] : []);
    return list.map(normalizeRole).filter(Boolean);
  }

  function canSeeAdminPanel() {
    var roles = rolesOf(readAuth());
    for (var i = 0; i < roles.length; i += 1) {
      if (ADMIN_ROLES[roles[i]]) return true;
    }
    return false;
  }

  function roleFromEmail(email) {
    var value = String(email || "").toLowerCase();
    if (value.indexOf("superadmin") !== -1 || value.indexOf("super admin") !== -1) return "SuperAdmin";
    if (value.indexOf("admin") !== -1) return "Admin";
    return "Member";
  }

  function syncAdminClass() {
    document.documentElement.classList.toggle("mf-admin", canSeeAdminPanel());
  }

  function saveAuth(email, role) {
    var nextRole = role || roleFromEmail(email);
    try {
      localStorage.setItem(AUTH_KEY, JSON.stringify({
        email: email || "",
        role: nextRole,
        roles: [nextRole]
      }));
    } catch (e) { /* storage may be blocked */ }
    syncAdminClass();
  }

  function clearAuth() {
    try { localStorage.removeItem(AUTH_KEY); } catch (e) { /* storage may be blocked */ }
    syncAdminClass();
  }

  function isDashboardHref(href) {
    if (!href) return false;
    var page = String(href).split("#")[0].split("?")[0].replace(/\\/g, "/").split("/").pop().toLowerCase();
    return page === "dashboard.html" || page === "dashboard";
  }

  function hideDashboardLinks(root) {
    if (canSeeAdminPanel()) return;
    (root || document).querySelectorAll("a[href]").forEach(function (link) {
      if (!isDashboardHref(link.getAttribute("href"))) return;
      link.setAttribute("data-admin-panel", "");
      link.hidden = true;
    });
  }

  window.mfAuth = readAuth;
  window.mfCanSeeAdminPanel = canSeeAdminPanel;
  window.mfRoleFromEmail = roleFromEmail;
  window.mfSaveAuth = saveAuth;
  window.mfClearAuth = clearAuth;
  window.mfIsDashboardHref = isDashboardHref;
  window.mfHideDashboardLinks = hideDashboardLinks;

  try {
    var theme = localStorage.getItem("mf-theme");
    if (theme === "dark") document.documentElement.setAttribute("data-theme", "dark");
    var language = localStorage.getItem("mf-language") || "az";
    if (language === "az" || language === "ru" || language === "en") document.documentElement.lang = language;
  } catch (e) {}

  syncAdminClass();

  var page = ((location.pathname || "").split("/").pop() || "").toLowerCase();
  if ((page === "dashboard.html" || page === "dashboard") && !canSeeAdminPanel()) {
    location.replace("index.html");
  }

  document.addEventListener("DOMContentLoaded", function () {
    hideDashboardLinks(document);
  });
  document.addEventListener("click", function (event) {
    if (canSeeAdminPanel()) return;
    var link = event.target && event.target.closest ? event.target.closest("a[href]") : null;
    if (link && isDashboardHref(link.getAttribute("href"))) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);
})();
