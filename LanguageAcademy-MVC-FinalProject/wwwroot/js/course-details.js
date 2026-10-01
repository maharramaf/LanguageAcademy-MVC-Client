function initCourseCurriculum() {
  document.querySelectorAll("[data-course-curriculum] .course-module-toggle").forEach(function (button) {
    button.addEventListener("click", function () {
      const module = button.closest(".course-module");
      const open = module.classList.contains("is-open");
      module.parentElement.querySelectorAll(".course-module").forEach(function (item) {
        item.classList.remove("is-open");
        const toggle = item.querySelector(".course-module-toggle");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      });
      if (!open) {
        module.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
}

function initCourseTabs() {
  document.querySelectorAll("[data-course-tabs]").forEach(function (tabs) {
    const root = tabs.parentElement;
    tabs.querySelectorAll("[data-tab]").forEach(function (button) {
      button.addEventListener("click", function () {
        const name = button.dataset.tab;
        tabs.querySelectorAll("[data-tab]").forEach(function (item) {
          item.classList.toggle("is-active", item === button);
        });
        root.querySelectorAll("[data-tab-panel]").forEach(function (panel) {
          panel.classList.toggle("is-active", panel.dataset.tabPanel === name);
        });
      });
    });
  });
}

function initCoursePreview() {
  const modal = document.querySelector('[data-modal="preview"]');
  document.querySelectorAll("[data-preview]").forEach(function (button) {
    button.addEventListener("click", function () {
      if (!modal) return;
      modal.hidden = false;
      modal.classList.add("is-open");
      document.body.classList.add("nav-lock");
      modal.querySelector(".modal-close")?.focus();
    });
  });
}

function initCourseFAQ() {
  document.querySelectorAll("[data-course-faq] .course-faq-toggle").forEach(function (button) {
    button.addEventListener("click", function () {
      const item = button.closest(".course-faq-item");
      const open = item.classList.contains("is-open");
      item.parentElement.querySelectorAll(".course-faq-item").forEach(function (entry) {
        entry.classList.remove("is-open");
        const toggle = entry.querySelector(".course-faq-toggle");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      });
      if (!open) {
        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
}

function initCourseReviewModal() {
  const modal = document.querySelector('[data-modal="review"]');
  document.querySelectorAll("[data-review]").forEach(function (button) {
    button.addEventListener("click", function () {
      if (!modal) return;
      modal.hidden = false;
      modal.classList.add("is-open");
      document.body.classList.add("nav-lock");
      modal.querySelector(".modal-close")?.focus();
    });
  });

  const form = document.querySelector("[data-review-form]");
  if (!form) return;
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = form.querySelector('[name="name"]');
    const message = form.querySelector('[name="message"]');
    const nameError = form.querySelector('[data-error-for="review-name"]');
    const textError = form.querySelector('[data-error-for="review-text"]');
    const nameOk = name.value.trim().length > 0;
    const textOk = message.value.trim().length >= 10;
    if (nameError) nameError.textContent = nameOk ? "" : (window.mfT ? window.mfT("err_name_required", "Name is required.") : "Name is required.");
    if (textError) textError.textContent = textOk ? "" : (window.mfT ? window.mfT("err_message_short", "Please write at least 10 characters.") : "Please write at least 10 characters.");
    name.closest(".field")?.classList.toggle("has-error", !nameOk);
    message.closest(".field")?.classList.toggle("has-error", !textOk);
    if (!nameOk || !textOk) return;
    form.querySelectorAll(".field, .btn").forEach(function (node) { node.hidden = true; });
    const success = form.querySelector(".form-success");
    if (success) success.hidden = false;
  });
}

function initCourseActions() {
  const enrollForm = document.querySelector('[data-form="enroll"]');
  enrollForm?.addEventListener("submit", function () {
    window.setTimeout(function () {
      const success = enrollForm.querySelector(".form-success");
      if (!success || success.hidden) return;
      document.querySelectorAll("[data-enroll]").forEach(function (button) {
        button.textContent = window.mfT ? window.mfT("enroll_requested", "Enrollment requested") : "Enrollment requested";
        button.classList.add("is-saved");
      });
    }, 0);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initCourseCurriculum();
  initCoursePreview();
  initCourseFAQ();
  initCourseReviewModal();
  initCourseActions();
  initCourseTabs();
});
