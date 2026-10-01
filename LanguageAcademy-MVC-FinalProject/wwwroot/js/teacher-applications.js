/* Teacher applications. On-screen demo only. A later server will store the record. */
let mfApplications = [];
const mfApplyFiles = {};

function applyText(key, fallback) {
  if (typeof window.mfT === "function") return window.mfT(key, fallback || key);
  return fallback || key;
}

function readApplications() {
  return mfApplications;
}

function writeApplications(list) {
  mfApplications = list;
}

function applyValue(form, name) {
  const field = form.querySelector('[name="' + name + '"]');
  return field ? field.value.trim() : "";
}

function setApplyError(form, name, message) {
  const error = form.querySelector('[data-error-for="' + name + '"]');
  const input = form.querySelector('[name="' + name + '"]');
  const field = input ? input.closest(".field") : null;
  if (field) field.classList.toggle("has-error", Boolean(message));
  if (error) error.textContent = message || "";
  return !message;
}

function selectedCv(form) {
  const input = form.querySelector('[name="cv"]');
  return input && input.files && input.files[0] ? input.files[0] : null;
}

function escapeFileName(value) {
  return String(value).replace(/[&<>"']/g, function (char) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
  });
}

function fileSizeLabel(file) {
  return file.size > 1048576 ? (file.size / 1048576).toFixed(1) + " MB" : Math.max(1, Math.round(file.size / 1024)) + " KB";
}

function paintFile(form, name) {
  const input = form.querySelector('[name="' + name + '"]');
  const drop = input && input.closest("[data-file-drop]");
  const picked = drop && drop.querySelector("[data-file-picked]");
  if (!drop || !picked) return;
  const file = input.files && input.files[0] ? input.files[0] : null;
  drop.classList.toggle("is-filled", Boolean(file));
  if (!file) {
    picked.hidden = true;
    picked.innerHTML = "";
    return;
  }
  const icon = name === "cv" ? "bi-file-earmark-pdf" : "bi-image";
  picked.hidden = false;
  picked.innerHTML = '<i class="bi ' + icon + '" aria-hidden="true"></i><span class="file-drop-meta"><strong>' + escapeFileName(file.name) + '</strong><small>' + fileSizeLabel(file) + '</small></span><span class="file-drop-actions"><label class="file-drop-action" for="' + input.id + '">' + applyText("apply_change", "Change") + '</label><button type="button" class="file-drop-action" data-file-clear="' + name + '">' + applyText("apply_remove", "Remove") + '</button></span>';
}

function pushApplyNotice(id, titleKey, messageKey, href) {
  if (typeof mfNotifyItems === "undefined" || typeof saveNotificationState !== "function") return;
  if (mfNotifyItems.some(function (item) { return String(item.id) === id; })) return;
  mfNotifyItems.unshift({
    id: id,
    type: "instructor",
    titleKey: titleKey,
    messageKey: messageKey,
    timeKey: "time_just_now",
    href: href,
    read: false,
    extra: true
  });
  saveNotificationState();
  if (typeof renderNotifications === "function") renderNotifications();
}

function submitTeacherApplication(form) {
  const required = applyText("pay_err_required", "This field is required.");
  const names = ["firstName", "lastName", "email", "phone", "country", "education", "institution", "experience", "years", "languages", "subject", "bio"];
  const checks = names.map(function (name) { return setApplyError(form, name, applyValue(form, name) ? "" : required); });
  const email = applyValue(form, "email");
  checks.push(setApplyError(form, "email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : applyText("pay_err_email", "Enter a valid email.")));
  const file = selectedCv(form);
  if (!file) checks.push(setApplyError(form, "cv", applyText("apply_cv_required", "Upload a PDF CV.")));
  else if (file.type !== "application/pdf" && !/\.pdf$/i.test(file.name)) checks.push(setApplyError(form, "cv", applyText("apply_cv_pdf", "The CV must be a PDF file.")));
  else checks.push(setApplyError(form, "cv", ""));
  if (!checks.every(Boolean)) return false;
  const id = "app-" + Date.now().toString(36);
  const record = {
    id: id,
    fullName: applyValue(form, "firstName") + " " + applyValue(form, "lastName"),
    email: email,
    phone: applyValue(form, "phone"),
    country: applyValue(form, "country"),
    education: applyValue(form, "education"),
    institution: applyValue(form, "institution"),
    experience: applyValue(form, "experience"),
    yearsOfExperience: applyValue(form, "years"),
    languages: applyValue(form, "languages"),
    specialization: applyValue(form, "subject"),
    biography: applyValue(form, "bio"),
    portfolioUrl: applyValue(form, "portfolio"),
    cvFileName: file.name,
    cvSize: file.size,
    status: "pending",
    rejectionReason: "",
    submittedAt: new Date().toISOString()
  };
  mfApplyFiles[id] = URL.createObjectURL(file);
  const list = readApplications();
  list.unshift(record);
  writeApplications(list);
  pushApplyNotice("apply-submit-" + id, "apply_note_submitted", "apply_note_submitted_text", "dashboard.html#applications-section");
  form.querySelectorAll(".field, .form-row, .btn, .form-note, [data-student-field]").forEach(function (node) { node.hidden = true; });
  const pending = form.querySelector("[data-teacher-pending]");
  if (pending) pending.hidden = false;
  const status = document.querySelector("[data-apply-status]");
  if (status) renderTeacherStatus(status);
  return true;
}

function statusLabel(status) {
  if (status === "approved") return applyText("apply_approved", "Approved");
  if (status === "rejected") return applyText("apply_rejected", "Rejected");
  return applyText("apply_pending", "Pending review");
}

function renderApplications() {
  const root = document.querySelector("[data-applications]");
  if (!root) return;
  const list = readApplications();
  if (!list.length) {
    root.innerHTML = '<p>' + applyText("apply_empty", "No teacher applications yet.") + '</p>';
    return;
  }
  root.innerHTML = '<div class="table-wrap"><table class="data-table"><thead><tr><th>' + applyText("label_name", "Name") + '</th><th>' + applyText("label_email", "Email") + '</th><th>' + applyText("studio_subject", "Subject") + '</th><th>' + applyText("apply_experience", "Experience") + '</th><th>' + applyText("apply_status", "Status") + '</th><th>CV</th></tr></thead><tbody>' +
    list.map(function (item) {
      return '<tr><td data-label="Name">' + item.fullName + '</td><td data-label="Email">' + item.email + '</td><td data-label="Subject">' + item.specialization + '</td><td data-label="Experience">' + item.yearsOfExperience + '</td><td data-label="Status">' + statusLabel(item.status) + '</td><td><button class="btn btn-outline btn-sm" type="button" data-apply-open="' + item.id + '">' + applyText("apply_view", "View") + '</button></td></tr>';
    }).join("") +
    '</tbody></table></div>';
}

function renderApplicationDetail(id) {
  const box = document.querySelector("[data-application-detail]");
  const modal = document.querySelector('[data-modal="application"]');
  const item = readApplications().find(function (entry) { return entry.id === id; });
  if (!box || !item || !modal) return;
  const fileUrl = mfApplyFiles[id] || "";
  const cv = fileUrl
    ? '<p><a class="btn btn-outline btn-sm" href="' + fileUrl + '" target="_blank" rel="noopener">' + applyText("apply_preview", "Preview CV") + '</a> <a class="btn btn-outline btn-sm" href="' + fileUrl + '" download="' + item.cvFileName + '">' + applyText("apply_download", "Download CV") + '</a></p><iframe class="cv-frame" title="CV" src="' + fileUrl + '"></iframe>'
    : '<p><i class="bi bi-file-earmark-pdf" aria-hidden="true"></i> ' + item.cvFileName + '</p><p>' + applyText("apply_cv_session", "Open the CV preview in the same browser session it was uploaded.") + '</p>';
  box.innerHTML =
    '<p><strong>' + item.fullName + '</strong> · ' + statusLabel(item.status) + '</p>' +
    '<p>' + item.email + ' · ' + item.phone + ' · ' + item.country + '</p>' +
    '<p>' + applyText("apply_education", "Education") + ': ' + item.education + ' · ' + item.institution + '</p>' +
    '<p>' + applyText("apply_experience", "Experience") + ': ' + item.experience + ' · ' + item.yearsOfExperience + '</p>' +
    '<p>' + applyText("apply_languages", "Languages") + ': ' + item.languages + '</p>' +
    '<p>' + applyText("studio_subject", "Subject") + ': ' + item.specialization + '</p>' +
    '<p>' + item.biography + '</p>' +
    (item.portfolioUrl ? '<p><a href="' + item.portfolioUrl + '" target="_blank" rel="noopener">' + item.portfolioUrl + '</a></p>' : '') +
    cv +
    (item.status === "pending"
      ? '<div class="field"><label>' + applyText("apply_reason", "Rejection reason") + '</label><textarea data-apply-reason></textarea></div><div class="cert-card-actions"><button class="btn btn-primary" type="button" data-apply-approve="' + item.id + '">' + applyText("apply_approve", "Approve") + '</button><button class="btn btn-outline" type="button" data-apply-reject="' + item.id + '">' + applyText("apply_reject", "Reject") + '</button></div>'
      : (item.rejectionReason ? '<p>' + applyText("apply_reason", "Rejection reason") + ': ' + item.rejectionReason + '</p>' : ''));
  modal.hidden = false;
  modal.classList.add("is-open");
}

function decideApplication(id, status) {
  const list = readApplications();
  const item = list.find(function (entry) { return entry.id === id; });
  if (!item || item.status !== "pending") return;
  item.status = status;
  item.reviewedAt = new Date().toISOString();
  if (status === "rejected") {
    const reason = document.querySelector("[data-apply-reason]");
    item.rejectionReason = reason ? reason.value.trim() : "";
    pushApplyNotice("apply-no-" + id, "apply_note_rejected", "apply_note_rejected_text", "studio.html");
  } else {
    pushApplyNotice("apply-yes-" + id, "apply_note_approved", "apply_note_approved_text", "studio.html");
  }
  writeApplications(list);
  const modal = document.querySelector('[data-modal="application"]');
  if (modal) {
    modal.hidden = true;
    modal.classList.remove("is-open");
  }
  renderApplications();
  document.querySelectorAll("[data-apply-status]").forEach(renderTeacherStatus);
}

function renderTeacherStatus(node) {
  if (!node) return;
  const list = readApplications();
  const item = list[0];
  if (!item) {
    node.innerHTML = "";
    return;
  }
  let text = applyText("apply_status_pending", "Your teacher application is currently under review.");
  if (item.status === "approved") text = applyText("apply_status_approved", "Your teacher application has been approved. Instructor tools stay available as a preview.");
  if (item.status === "rejected") text = applyText("apply_status_rejected", "Your teacher application was rejected.") + (item.rejectionReason ? " " + item.rejectionReason : "");
  node.innerHTML = '<strong>' + statusLabel(item.status) + '</strong><p>' + text + '</p>';
}

function initTeacherApplications() {
  document.querySelectorAll("[data-apply-status]").forEach(renderTeacherStatus);
  const form = document.querySelector('[data-form="register"]');
  if (form && form.dataset.fileDropBound !== "1") {
    form.dataset.fileDropBound = "1";
    ["photo", "cv"].forEach(function (name) {
      const input = form.querySelector('[name="' + name + '"]');
      if (!input) return;
      input.addEventListener("change", function () { paintFile(form, name); });
    });
    form.addEventListener("click", function (event) {
      const clear = event.target.closest("[data-file-clear]");
      if (!clear) return;
      const input = form.querySelector('[name="' + clear.getAttribute("data-file-clear") + '"]');
      if (!input) return;
      input.value = "";
      paintFile(form, input.name);
    });
  }
  renderApplications();
  const list = document.querySelector("[data-applications]");
  if (list && list.dataset.applyBound !== "1") {
    list.dataset.applyBound = "1";
    list.addEventListener("click", function (event) {
      const open = event.target.closest("[data-apply-open]");
      if (open) renderApplicationDetail(open.getAttribute("data-apply-open"));
    });
    document.addEventListener("click", function (event) {
      const approve = event.target.closest("[data-apply-approve]");
      const reject = event.target.closest("[data-apply-reject]");
      if (approve) decideApplication(approve.getAttribute("data-apply-approve"), "approved");
      if (reject) decideApplication(reject.getAttribute("data-apply-reject"), "rejected");
    });
  }
}

window.submitTeacherApplication = submitTeacherApplication;
window.initTeacherApplications = initTeacherApplications;
document.addEventListener("DOMContentLoaded", initTeacherApplications);
document.addEventListener("mf-language", function () {
  renderApplications();
  document.querySelectorAll("[data-apply-status]").forEach(renderTeacherStatus);
  const form = document.querySelector('[data-form="register"]');
  if (form) ["photo", "cv"].forEach(function (name) { paintFile(form, name); });
});
