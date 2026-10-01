/* Demo checkout UI. Card data stays in the form only and is never stored. */
const MF_CHECKOUT_TEACHERS = {
  "english-beginner": "Sarah Johnson",
  "english-intermediate": "Elena Marquez",
  ielts: "Daniel Okonkwo",
  "business-english": "James Whitfield",
  german: "Markus Weber",
  spanish: "Sophie Laurent",
  french: "Sophie Laurent",
  conversation: "Aiko Tanaka"
};

function payText(key, fallback) {
  if (typeof window.mfT === "function") return window.mfT(key, fallback || key);
  return fallback || key;
}

function checkoutPlan() {
  const params = new URLSearchParams(window.location.search);
  let plan = params.get("plan") || "";
  if (!plan && window.location.hash.indexOf("plan=") !== -1) {
    plan = new URLSearchParams(window.location.hash.slice(window.location.hash.indexOf("?") + 1)).get("plan") || "";
    if (!plan) {
      const match = window.location.hash.match(/plan=([a-z0-9-]+)/i);
      if (match) plan = match[1];
    }
  }
  if (plan === "premium" || plan === "teacher-standard" || plan === "teacher-premium") return plan;
  return "";
}

function checkoutSelection() {
  const plan = checkoutPlan();
  if (plan === "premium") {
    return { key: "premium", plan: true, course: { title: payText("plan_premium", "Premium"), level: payText("plan_monthly", "Monthly"), duration: payText("plan_membership", "Membership"), price: 49, image: "images/course-ielts.jpg" } };
  }
  if (plan === "teacher-standard") {
    return { key: "teacher-standard", plan: true, teacherPlan: "standard", course: { title: payText("tp_standard", "Standard Teacher"), level: payText("plan_monthly", "Monthly"), duration: payText("tp_title", "Teacher Subscription"), price: 19, image: "images/course-business.jpg" } };
  }
  if (plan === "teacher-premium") {
    return { key: "teacher-premium", plan: true, teacherPlan: "premium", course: { title: payText("tp_premium", "Premium Teacher"), level: payText("plan_monthly", "Monthly"), duration: payText("tp_title", "Teacher Subscription"), price: 39, image: "images/course-ielts.jpg" } };
  }
  return checkoutCourse();
}

function checkoutCourse() {
  const params = new URLSearchParams(window.location.search);
  let slug = params.get("course") || "";
  if (!slug && window.location.hash.indexOf("course=") !== -1) {
    slug = new URLSearchParams(window.location.hash.slice(window.location.hash.indexOf("?") + 1)).get("course") || "";
  }
  const catalog = window.courses || {};
  const key = catalog[slug] ? slug : "english-beginner";
  return { key: key, course: catalog[key] };
}

function courseIsPaid(course) {
  return course && course.type !== "demo" && Number(course.price) > 0;
}

function checkoutCoupon(course) {
  if (!courseIsPaid(course) || typeof window.mfResolveCoupon !== "function") return null;
  const params = new URLSearchParams(window.location.search);
  let code = params.get("coupon") || "";
  if (!code && window.location.hash.indexOf("coupon=") !== -1) {
    code = new URLSearchParams(window.location.hash.slice(window.location.hash.indexOf("?") + 1)).get("coupon") || "";
  }
  const found = window.mfResolveCoupon(code);
  if (!found) return null;
  const quote = window.mfCouponMath(course.price, found.percent);
  return { code: found.code, percent: found.percent, original: quote.original, discount: quote.discount, final: quote.final };
}

function payMoney(amount) {
  if (typeof window.formatPrice === "function") return window.formatPrice(amount);
  return "₼" + Number(amount || 0);
}

function payLabel(text) {
  return typeof window.mfText === "function" ? window.mfText(text) : text;
}

function setPayError(input, message) {
  const field = input.closest(".field");
  const error = field ? field.querySelector(".field-error") : null;
  if (field) field.classList.toggle("has-error", Boolean(message));
  if (error) error.textContent = message || "";
  return !message;
}

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return digits.slice(0, 2) + "/" + digits.slice(2);
}

function validExpiry(value) {
  const match = /^(\d{2})\/(\d{2})$/.exec(value);
  if (!match) return false;
  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  if (month < 1 || month > 12) return false;
  const now = new Date();
  const expiry = new Date(year, month, 0);
  return expiry >= new Date(now.getFullYear(), now.getMonth(), 1);
}

function renderCheckout() {
  const root = document.querySelector("[data-checkout]");
  if (!root || root.dataset.payReady === "1") return;
  const selected = checkoutSelection();
  if (!selected.course) return;
  root.dataset.payReady = "1";
  const course = selected.course;
  const coupon = selected.plan ? null : checkoutCoupon(course);
  const teacher = MF_CHECKOUT_TEACHERS[selected.key] || "MF Language Academy";
  const summaryTitle = selected.teacherPlan
    ? course.title
    : selected.plan
      ? payText("plan_premium", "Premium")
      : payLabel(course.title);
  root.innerHTML =
    '<header class="checkout-head"><h1>' + payText("pay_title", "Checkout") + '</h1><p>' + payText("pay_secure", "This is a demo payment.") + '</p></header>' +
    '<div class="checkout-grid">' +
      '<form class="checkout-form" data-pay-form novalidate>' +
        '<section class="pay-block">' +
          '<h2><span>1</span>' + payText("pay_customer", "Customer information") + '</h2>' +
          '<div class="form-row">' +
            '<div class="field"><label>' + payText("label_first", "First name") + '</label><input name="firstName" autocomplete="given-name"><p class="field-error"></p></div>' +
            '<div class="field"><label>' + payText("label_last", "Last name") + '</label><input name="lastName" autocomplete="family-name"><p class="field-error"></p></div>' +
          '</div>' +
          '<div class="field"><label>' + payText("label_email", "Email") + '</label><input name="email" type="email" autocomplete="email"><p class="field-error"></p></div>' +
        '</section>' +
        '<section class="pay-block">' +
          '<h2><span>2</span>' + payText("pay_method", "Payment method") + '</h2>' +
          '<div class="pay-method"><i class="bi bi-credit-card-2-front" aria-hidden="true"></i><div><strong>' + payText("pay_card", "Bank card") + '</strong><small>Visa · Mastercard</small></div></div>' +
          '<div class="field"><label>' + payText("pay_card_name", "Cardholder name") + '</label><input name="cardName" autocomplete="cc-name"><p class="field-error"></p></div>' +
          '<div class="field"><label>' + payText("pay_card_number", "Card number") + '</label><input name="cardNumber" inputmode="numeric" autocomplete="cc-number" placeholder="0000 0000 0000 0000" maxlength="19"><p class="field-error"></p></div>' +
          '<div class="form-row">' +
            '<div class="field"><label>' + payText("pay_expiry", "Expiry date") + '</label><input name="expiry" inputmode="numeric" autocomplete="cc-exp" placeholder="MM/YY" maxlength="5"><p class="field-error"></p></div>' +
            '<div class="field"><label>' + payText("pay_cvv", "CVV") + '</label><input name="cvv" inputmode="numeric" autocomplete="cc-csc" placeholder="123" maxlength="4"><p class="field-error"></p></div>' +
          '</div>' +
          '<p class="pay-note"><i class="bi bi-shield-lock" aria-hidden="true"></i> ' + payText("pay_demo_hint", "Demo: a card ending in 0000 shows a failed payment.") + '</p>' +
        '</section>' +
        '<button class="btn btn-primary btn-block" type="submit" data-pay-submit>' + payText("pay_submit", "Complete payment") + '</button>' +
        '<div class="pay-result" data-pay-result hidden></div>' +
      '</form>' +
      '<aside class="pay-summary">' +
        '<img src="' + course.image + '" alt="">' +
        '<div class="pay-summary-body">' +
          '<p class="eyebrow">' + payText(selected.plan ? "plan_summary" : "pay_summary", selected.plan ? "Membership" : "Course summary") + '</p>' +
          '<h2>' + summaryTitle + '</h2>' +
          '<ul class="pay-lines">' +
            '<li><span>' + payText("pay_instructor", "Instructor") + '</span><strong>' + teacher + '</strong></li>' +
            '<li><span>' + payLabel(course.level) + '</span><strong>' + payLabel(course.duration) + '</strong></li>' +
            (coupon
              ? '<li><span>' + payText("coupon_original", "Original Price") + '</span><strong>' + payMoney(coupon.original) + '</strong></li>' +
                '<li><span>' + payText("coupon_code", "Coupon") + '</span><strong>' + coupon.code + '</strong></li>' +
                '<li><span>' + payText("coupon_discount", "Discount") + ' (' + coupon.percent + '%)</span><strong>-' + payMoney(coupon.discount) + '</strong></li>'
              : "") +
          '</ul>' +
          '<div class="pay-total"><span>' + payText(coupon ? "coupon_total" : "pay_amount", coupon ? "Total" : "Amount") + '</span><strong>' + (coupon ? payMoney(coupon.final) : (selected.plan || courseIsPaid(course) ? payMoney(course.price) : payText("plan_free_price", "Free"))) + '</strong></div>' +
        '</div>' +
      '</aside>' +
    '</div>';

  const form = root.querySelector("[data-pay-form]");
  const number = form.querySelector('[name="cardNumber"]');
  const expiry = form.querySelector('[name="expiry"]');
  const cvv = form.querySelector('[name="cvv"]');
  number.addEventListener("input", function () { number.value = formatCardNumber(number.value); });
  expiry.addEventListener("input", function () { expiry.value = formatExpiry(expiry.value); });
  cvv.addEventListener("input", function () { cvv.value = cvv.value.replace(/\D/g, "").slice(0, 4); });
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    submitCheckout(form, selected);
  });
}

function submitCheckout(form, selected) {
  const first = form.querySelector('[name="firstName"]');
  const last = form.querySelector('[name="lastName"]');
  const email = form.querySelector('[name="email"]');
  const cardName = form.querySelector('[name="cardName"]');
  const number = form.querySelector('[name="cardNumber"]');
  const expiry = form.querySelector('[name="expiry"]');
  const cvv = form.querySelector('[name="cvv"]');
  const required = payText("pay_err_required", "This field is required.");
  const checks = [
    setPayError(first, first.value.trim() ? "" : required),
    setPayError(last, last.value.trim() ? "" : required),
    setPayError(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()) ? "" : payText("pay_err_email", "Enter a valid email.")),
    setPayError(cardName, cardName.value.trim() ? "" : required),
    setPayError(number, number.value.replace(/\D/g, "").length === 16 ? "" : payText("pay_err_card", "Card number must be 16 digits.")),
    setPayError(expiry, validExpiry(expiry.value) ? "" : payText("pay_err_expiry", "Enter the date as MM/YY.")),
    setPayError(cvv, /^\d{3,4}$/.test(cvv.value) ? "" : payText("pay_err_cvv", "CVV must be 3 or 4 digits."))
  ];
  if (!checks.every(Boolean)) return;
  const declined = number.value.replace(/\D/g, "").slice(-4) === "0000";
  const button = form.querySelector("[data-pay-submit]");
  button.disabled = true;
  button.textContent = payText("pay_processing", "Checking...");
  window.setTimeout(function () {
    number.value = "";
    cvv.value = "";
    button.disabled = false;
    button.textContent = payText("pay_submit", "Complete payment");
    selected.coupon = checkoutCoupon(selected.course);
    showPayResult(form, selected, declined);
  }, 700);
}

function showPayResult(form, selected, declined) {
  const box = form.querySelector("[data-pay-result]");
  const course = selected.course;
  const when = new Date().toLocaleDateString(document.documentElement.lang || "az");
  const order = "MF-" + Date.now().toString(36).toUpperCase();
  if (!declined && selected.teacherPlan && typeof window.mfActivateTeacherPlan === "function") {
    window.mfActivateTeacherPlan(selected.teacherPlan);
  } else if (!declined && selected.plan && typeof window.mfActivatePremium === "function") {
    window.mfActivatePremium();
  }
  if (!declined && !selected.plan && typeof window.mfEnrollCourse === "function") window.mfEnrollCourse(selected.key);
  if (declined) {
    box.innerHTML =
      '<h2>' + payText("pay_fail_title", "Payment failed") + '</h2>' +
      '<p>' + payText("pay_fail_lead", "In this demo the card was declined.") + '</p>' +
      '<button class="btn btn-outline" type="button" data-pay-retry>' + payText("pay_retry", "Try again") + '</button>';
    box.hidden = false;
    box.querySelector("[data-pay-retry]").addEventListener("click", function () { box.hidden = true; });
    return;
  }
  const successTitle = selected.teacherPlan ? "tp_note_upgraded" : selected.plan ? "plan_success" : "pay_success_title";
  const successLead = selected.teacherPlan ? "tp_note_upgraded_text" : selected.plan ? "plan_success_lead" : "pay_success_lead";
  const manageHref = selected.teacherPlan ? "dashboard.html#teacher-plan-section" : selected.plan ? "dashboard.html#plans-section" : ("course-details.html?course=" + selected.key);
  const manageLabel = selected.plan ? payText("plan_manage", "Manage Plan") : payText("pay_start", "Start learning");
  box.innerHTML =
    '<h2>' + payText(successTitle, "Payment completed successfully!") + '</h2>' +
    '<p>' + payText(successLead, selected.plan ? "Your plan is now active." : "Course enrollment completed successfully.") + '</p>' +
    '<p><strong>' + (selected.plan ? course.title : payLabel(course.title)) + '</strong></p>' +
    '<p>' + payText("pay_amount", "Amount") + ': ' + (selected.coupon ? payMoney(selected.coupon.final) : (selected.plan || courseIsPaid(course) ? payMoney(course.price) : payText("plan_free_price", "Free"))) + '</p>' +
    '<p>' + payText("pay_order", "Order number") + ': ' + order + '</p>' +
    '<p>' + payText("pay_date", "Date") + ': ' + when + '</p>' +
    '<div class="cert-card-actions">' +
      '<a class="btn btn-primary" href="' + manageHref + '">' + manageLabel + '</a>' +
      '<a class="btn btn-outline" href="dashboard.html#my-courses-section">' + payText("pay_courses", "Go to my courses") + '</a>' +
    '</div>';
  box.hidden = false;
}

function refreshCheckoutLanguage() {
  const root = document.querySelector("[data-checkout]");
  if (!root || root.dataset.payReady !== "1") return;
  const form = root.querySelector("[data-pay-form]");
  const saved = {};
  if (form) {
    form.querySelectorAll("input").forEach(function (input) {
      if (input.name) saved[input.name] = input.value;
    });
  }
  root.dataset.payReady = "";
  renderCheckout();
  const next = root.querySelector("[data-pay-form]");
  if (!next) return;
  Object.keys(saved).forEach(function (name) {
    const input = next.querySelector('[name="' + name + '"]');
    if (input) input.value = saved[name];
  });
}

function initCheckout() {
  const root = document.querySelector("[data-checkout]");
  if (!root) return;
  const selected = checkoutSelection();
  if (root.dataset.payCourse === selected.key && root.dataset.payReady === "1") return;
  root.dataset.payReady = "";
  root.dataset.payCourse = selected.key;
  root.innerHTML = "";
  renderCheckout();
}

window.initCheckout = initCheckout;
window.refreshCheckoutLanguage = refreshCheckoutLanguage;

document.addEventListener("DOMContentLoaded", function () {
  initCheckout();
});
document.addEventListener("mf-language", refreshCheckoutLanguage);
