/* Frontend certificate mock. Eligible only at 100% progress. No network calls.
   Later an API can replace MF_CERTIFICATES. */
const MF_CERTIFICATES = [
  {
    id: "MF-ENG-A2-2026-0001",
    slug: "english-a2",
    progress: 100,
    studentName: "Maya Collins",
    courseKey: "course_en_a2",
    instructorName: "Emma Wilson",
    dateKey: "cert_date_en_a2",
    completionDate: "2026-09-30"
  }
];

function certText(key, fallback) {
  if (typeof window.mfT === "function") return window.mfT(key, fallback || key);
  return fallback || key;
}

function completedCertificates() {
  return MF_CERTIFICATES.filter(function (cert) {
    return Number(cert.progress) >= 100;
  });
}

function certificateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  if (window.location.hash.indexOf("?") !== -1 && !params.get("course")) {
    const extra = new URLSearchParams(window.location.hash.slice(window.location.hash.indexOf("?") + 1));
    const slug = extra.get("course");
    return completedCertificates().find(function (cert) { return cert.slug === slug; }) || null;
  }
  const slug = params.get("course") || "";
  return completedCertificates().find(function (cert) { return cert.slug === slug; }) || null;
}

function issueCertificateNotifications() {
  if (typeof window.mfIssueCertificateNotice !== "function" || typeof mfNotifyItems === "undefined") return;
  let added = false;
  completedCertificates().forEach(function (cert) {
    const noticeId = "cert-" + cert.slug;
    const alreadyListed = mfNotifyItems.some(function (item) { return String(item.id) === noticeId; });
    const firstTime = window.mfIssueCertificateNotice(cert.id);
    if (!firstTime || alreadyListed) return;
    mfNotifyItems.unshift({
      id: noticeId,
      type: "certificate",
      titleKey: "cert_congrats_title",
      messageKey: "cert_congrats_message",
      courseKey: cert.courseKey,
      timeKey: "time_just_now",
      href: "certificate.html?course=" + encodeURIComponent(cert.slug),
      read: false,
      extra: true
    });
    added = true;
  });
  if (added && typeof saveNotificationState === "function") saveNotificationState();
  if (added && typeof renderNotifications === "function") renderNotifications();
}

function renderCertificateList() {
  const list = document.querySelector("[data-certificate-list]");
  if (!list) return;
  const certs = completedCertificates();
  const count = document.querySelector("[data-certificate-count]");
  if (count) count.textContent = String(certs.length);
  if (!certs.length) {
    list.innerHTML =
      '<div class="cert-empty">' +
        '<strong>' + certText("cert_none_title", "No certificates yet") + '</strong>' +
        '<p>' + certText("cert_none_text", "Complete a course to earn your first certificate.") + '</p>' +
      '</div>';
    return;
  }
  list.innerHTML = certs.map(function (cert) {
    const href = "certificate.html?course=" + encodeURIComponent(cert.slug);
    return (
      '<div class="cert-card">' +
        '<div>' +
          '<h4>' + certText(cert.courseKey, cert.courseKey) + '</h4>' +
          '<p>' + certText("cert_completed_on", "Completed on") + ' · ' + certText(cert.dateKey, cert.completionDate) + '</p>' +
          '<p>' + certText("cert_id", "Certificate ID") + ' · ' + cert.id + '</p>' +
        '</div>' +
        '<div class="cert-card-actions">' +
          '<a class="btn btn-primary btn-sm" href="' + href + '">' + certText("cert_view", "View Certificate") + '</a>' +
          '<a class="btn btn-outline btn-sm" href="' + href + '" data-cert-print-link>' + certText("cert_download", "Download Certificate") + '</a>' +
        '</div>' +
      '</div>'
    );
  }).join("");
}

function renderCertificatePage() {
  const sheet = document.querySelector("[data-certificate]");
  const missing = document.querySelector("[data-certificate-missing]");
  if (!sheet) return;
  const cert = certificateFromUrl();
  if (!cert) {
    sheet.hidden = true;
    if (missing) missing.hidden = false;
    return;
  }
  if (missing) missing.hidden = true;
  sheet.hidden = false;
  const set = function (name, value) {
    const node = sheet.querySelector('[data-cert="' + name + '"]');
    if (node) node.textContent = value;
  };
  set("student", cert.studentName);
  set("course", certText(cert.courseKey, cert.courseKey));
  set("instructor", cert.instructorName);
  set("date", certText(cert.dateKey, cert.completionDate));
  set("id", cert.id);
  document.title = certText("cert_title", "Certificate of Completion") + " | MF Language Academy";
}

function initCertificates() {
  issueCertificateNotifications();
  renderCertificateList();
  renderCertificatePage();
  if (!initCertificates.bound) {
    initCertificates.bound = true;
    document.addEventListener("click", function (event) {
      const print = event.target.closest("[data-cert-print]");
      if (print) {
        event.preventDefault();
        window.print();
        return;
      }
      const link = event.target.closest("[data-cert-print-link]");
      if (!link) return;
      window.mfCertPrint = true;
    });
    document.addEventListener("mf-language", function () {
      renderCertificateList();
      renderCertificatePage();
    });
  }
  if (window.mfCertPrint && document.querySelector("[data-certificate]") && !document.querySelector("[data-certificate]").hidden) {
    window.mfCertPrint = false;
    window.setTimeout(function () { window.print(); }, 300);
  }
}

window.MF_CERTIFICATES = MF_CERTIFICATES;
window.initCertificates = initCertificates;
window.renderCertificatePage = renderCertificatePage;
window.renderCertificateList = renderCertificateList;

document.addEventListener("DOMContentLoaded", function () {
  initCertificates();
});
