function faqItem(questionKey, answerKey) {
  return (
    '<div class="accordion-item">' +
      '<button class="accordion-trigger" type="button" aria-expanded="false">' +
        '<span data-i18n="' + questionKey + '">' + questionKey + '</span>' +
        '<i class="bi bi-plus-lg" aria-hidden="true"></i>' +
      '</button>' +
      '<div class="accordion-panel"><p data-i18n="' + answerKey + '">' + answerKey + '</p></div>' +
    '</div>'
  );
}

function faqGroup(titleKey, items) {
  return (
    '<div class="faq-group"><h3 data-i18n="' + titleKey + '"></h3><div class="accordion">' +
      items.map(function (pair) { return faqItem(pair[0], pair[1]); }).join("") +
    '</div></div>'
  );
}

function initFAQAccordion(root) {
  if (!root || root.dataset.faqAccordion === "1") return;
  root.dataset.faqAccordion = "1";
  root.querySelectorAll(".accordion-trigger").forEach(function (button) {
    button.dataset.accBound = "1";
    button.addEventListener("click", function (event) {
      event.stopImmediatePropagation();
      const item = button.closest(".accordion-item");
      if (!item) return;
      const open = item.classList.contains("is-open");
      const list = item.parentElement;
      if (list) {
        list.querySelectorAll(".accordion-item").forEach(function (sibling) {
          sibling.classList.remove("is-open");
          const toggle = sibling.querySelector(".accordion-trigger");
          if (toggle) toggle.setAttribute("aria-expanded", "false");
        });
      }
      if (!open) {
        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
}

function initFAQModal(button, panel) {
  if (!button || !panel || button.dataset.faqBound === "1") return;
  button.dataset.faqBound = "1";
  const card = panel.querySelector(".faq-panel-card");

  function setOpen(open) {
    panel.hidden = !open;
    button.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("faq-open", open);
    if (open) {
      const close = panel.querySelector("[data-faq-close]");
      if (close) close.focus();
    } else {
      button.focus();
    }
  }

  button.addEventListener("click", function () {
    setOpen(panel.hidden);
  });
  panel.querySelectorAll("[data-faq-close]").forEach(function (close) {
    close.addEventListener("click", function () { setOpen(false); });
  });
  panel.addEventListener("click", function (event) {
    if (event.target === panel) setOpen(false);
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !panel.hidden) setOpen(false);
  });
  if (card) {
    card.addEventListener("click", function (event) { event.stopPropagation(); });
  }
}

function initGlobalFAQ() {
  if (document.querySelector(".global-faq-button")) return;

  const root = document.createElement("div");
  root.className = "global-faq";
  root.innerHTML =
    '<button class="global-faq-button" type="button" aria-haspopup="dialog" aria-expanded="false" data-i18n-aria-label="faq_open">' +
      '<i class="bi bi-question-lg" aria-hidden="true"></i>' +
      '<span data-i18n="faq_label">FAQ</span>' +
    '</button>' +
    '<div class="faq-panel" data-global-faq hidden>' +
      '<div class="faq-panel-card" role="dialog" aria-modal="true" aria-labelledby="globalFaqTitle">' +
        '<button class="modal-close" type="button" data-faq-close data-i18n-aria-label="btn_close" aria-label="Close">&times;</button>' +
        '<span class="eyebrow" data-i18n="support_label">Support</span>' +
        '<h2 id="globalFaqTitle" data-i18n="contact_help">Help before you write</h2>' +
        '<div class="faq-links">' +
          '<a href="faq.html"><i class="bi bi-question-circle" aria-hidden="true"></i><span data-i18n="faq_courses_certs">Course and certificate FAQ</span></a>' +
          '<a href="catalog.html"><i class="bi bi-journal-bookmark" aria-hidden="true"></i><span data-i18n="faq_browse">Browse courses</span></a>' +
          '<a href="dashboard.html"><i class="bi bi-grid" aria-hidden="true"></i><span data-i18n="dash_home">Dashboard</span></a>' +
          '<a href="learning-paths.html"><i class="bi bi-signpost" aria-hidden="true"></i><span data-i18n="faq_learning">Learning</span></a>' +
          '<a href="learn.html#grades"><i class="bi bi-patch-question" aria-hidden="true"></i><span data-i18n="faq_quiz">Quiz and grades</span></a>' +
          '<a href="certificate.html?course=english-a2"><i class="bi bi-award" aria-hidden="true"></i><span data-i18n="dash_certificates">Certificates</span></a>' +
          '<a href="contact.html#contact-section"><i class="bi bi-headset" aria-hidden="true"></i><span data-i18n="faq_contact_support">Contact support</span></a>' +
        '</div>' +
        faqGroup("faq_cat_courses", [["faq_q_enroll", "faq_a_enroll"], ["faq_q_view", "faq_a_view"], ["faq_q_access", "faq_a_access"]]) +
        faqGroup("faq_cat_lessons", [["faq_q_continue", "faq_a_continue"], ["faq_q_complete", "faq_a_complete"]]) +
        faqGroup("faq_cat_quizzes", [["faq_q_quiz", "faq_a_quiz"], ["faq_q_score", "faq_a_score"]]) +
        faqGroup("faq_cat_certs", [["faq_q_cert_when", "faq_a_cert_when"], ["faq_q_cert_where", "faq_a_cert_where"]]) +
        faqGroup("faq_cat_account", [["faq_q_profile", "faq_a_profile"], ["faq_q_password", "faq_a_password"]]) +
        faqGroup("faq_cat_tech", [["faq_q_lesson_fail", "faq_a_lesson_fail"], ["faq_q_contact", "faq_a_contact"]]) +
      '</div>' +
    '</div>';
  document.body.appendChild(root);

  const button = root.querySelector(".global-faq-button");
  const panel = root.querySelector(".faq-panel");
  initFAQModal(button, panel);
  initFAQAccordion(panel);
  if (typeof window.applyTranslations === "function") window.applyTranslations();
}

document.addEventListener("DOMContentLoaded", function () {
  initGlobalFAQ();
});
