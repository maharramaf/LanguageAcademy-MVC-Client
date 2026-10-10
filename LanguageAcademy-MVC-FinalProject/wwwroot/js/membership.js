/* Student Free / Premium demo. Plan key: mf-membership. No payment provider. */
const MF_MEMBER_KEY = "mf-membership";
const MF_PREMIUM_PRICE = 49;

function planText(key, fallback) {
  if (typeof window.mfT === "function") return window.mfT(key, fallback || key);
  return fallback || key;
}

function readMembership() {
  try {
    const saved = JSON.parse(localStorage.getItem(MF_MEMBER_KEY) || "");
    if (saved && (saved.plan === "free" || saved.plan === "premium")) return saved;
  } catch (error) { /* use the free plan */ }
  return { plan: "free", status: "active", startedAt: null, expiresAt: null };
}

function writeMembership(record) {
  try { localStorage.setItem(MF_MEMBER_KEY, JSON.stringify(record)); } catch (error) { /* ignore */ }
}

function mfIsPremium() {
  return readMembership().plan === "premium";
}

function mfCourseSlug() {
  const params = new URLSearchParams(window.location.search);
  let slug = params.get("course") || "";
  if (!slug && window.location.hash.indexOf("?") !== -1) {
    slug = new URLSearchParams(window.location.hash.slice(window.location.hash.indexOf("?") + 1)).get("course") || "";
  }
  return slug;
}

function courseAccess(slug) {
  const course = window.courses && window.courses[slug];
  if (!course) return "demo";
  if (course.type === "premium" || course.type === "standard" || course.type === "demo") return course.type;
  if (course.access === "premium") return "premium";
  return "standard";
}

function courseTypeLabel(type) {
  if (type === "premium") return planText("course_type_premium", "Premium");
  if (type === "standard") return planText("course_type_standard", "Standard");
  return planText("course_type_demo", "Demo");
}

const MF_ENROLL_KEY = "mf-enrollments";

function readEnrolled() {
  try {
    const saved = JSON.parse(localStorage.getItem(MF_ENROLL_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch (error) { return []; }
}

function mfIsEnrolled(slug) {
  return readEnrolled().indexOf(slug) !== -1;
}

function mfHasPaidEnrollment() {
  return readEnrolled().some(function (slug) { return courseAccess(slug) !== "demo"; });
}

function mfEnrollCourse(slug) {
  if (!slug || slug === "premium") return;
  const list = readEnrolled();
  if (list.indexOf(slug) === -1) {
    list.push(slug);
    try { localStorage.setItem(MF_ENROLL_KEY, JSON.stringify(list)); } catch (error) { /* ignore */ }
  }
  const course = window.courses && window.courses[slug];
  const name = course ? (typeof window.mfText === "function" ? window.mfText(course.title) : course.title) : slug;
  pushPlanNotice("buy-" + slug, "course_bought", "course_bought_text");
  if (typeof mfNotifyItems !== "undefined" && !window.mfNotifyLive) {
    mfNotifyItems.unshift({
      id: "enroll-" + slug,
      type: "enrollment",
      titleKey: "course_enrolled",
      messageKey: "course_enrolled_text",
      courseKey: name,
      timeKey: "time_just_now",
      href: "dashboard.html#my-courses-section",
      read: false,
      extra: true
    });
    if (typeof renderNotifications === "function") renderNotifications();
  }
}

function pushPlanNotice(id, titleKey, messageKey) {
  if (typeof mfNotifyItems === "undefined" || window.mfNotifyLive) return;
  if (mfNotifyItems.some(function (item) { return String(item.id) === id; })) return;
  mfNotifyItems.unshift({
    id: id,
    type: "announcement",
    titleKey: titleKey,
    messageKey: messageKey,
    timeKey: "time_just_now",
    href: "dashboard.html#plans-section",
    read: false,
    extra: true
  });
  if (typeof saveNotificationState === "function") saveNotificationState();
  if (typeof renderNotifications === "function") renderNotifications();
}

function mfActivatePremium() {
  if (mfIsPremium()) return readMembership();
  const start = new Date();
  const end = new Date(start.getTime());
  end.setMonth(end.getMonth() + 1);
  const record = { plan: "premium", status: "active", startedAt: start.toISOString(), expiresAt: end.toISOString() };
  writeMembership(record);
  pushPlanNotice("plan-active", "plan_note_active", "plan_note_active_text");
  pushPlanNotice("plan-unlocked", "plan_note_unlocked", "plan_note_unlocked_text");
  document.dispatchEvent(new CustomEvent("mf-membership"));
  initMembership();
  return record;
}

function upgradeLink() {
  return '<a class="btn btn-primary" href="checkout.html?plan=premium">' + planText("plan_upgrade", "Upgrade to Premium") + '</a>';
}

function lockCard(titleKey, textKey) {
  return '<section class="panel plan-lock"><i class="bi bi-lock" aria-hidden="true"></i><h3>' + planText(titleKey, titleKey) + '</h3><p>' + planText(textKey, textKey) + '</p>' + upgradeLink() + '</section>';
}

function renderPlanCard() {
  const premium = mfIsPremium();
  if (!premium) {
    return '<section class="panel plan-card"><p class="eyebrow">' + planText("plan_free", "Free Plan") + '</p><h2>' + planText("plan_free", "Free Plan") + '</h2><p>' + planText("plan_free_lead", "You're currently using the Free plan.") + '</p>' + upgradeLink() + '</section>';
  }
  return '<section class="panel plan-card is-premium"><p class="eyebrow">⭐ ' + planText("plan_premium", "Premium") + '</p><h2>' + planText("plan_premium", "Premium") + '</h2><p>' + planText("plan_premium_lead", "All premium features are unlocked.") + '</p><a class="btn btn-outline" href="dashboard.html#plans-section" data-admin-panel data-open-plans>' + planText("plan_manage", "Manage Plan") + '</a></section>';
}

function renderContinue() {
  return '<section class="panel plan-continue"><img src="images/course-beginner.jpg" alt=""><div><p class="eyebrow">' + planText("plan_continue", "Continue learning") + '</p><h3>' + planText("course_en_beginner", "English Beginner") + '</h3><p>' + planText("plan_current_lesson", "Current lesson") + ': ' + planText("learn_l2", "Listening video") + '</p><div class="progress" aria-hidden="true"><span style="width:40%"></span></div><p>40%</p><a class="btn btn-primary btn-sm" href="learn.html">' + planText("learn_continue", "Continue learning") + '</a></div></section>';
}

function renderStreak() {
  if (!mfIsPremium()) return lockCard("plan_streak", "plan_streak_lock");
  const days = [1, 1, 1, 1, 0, 1, 1];
  const bars = days.map(function (on) { return '<span class="' + (on ? "is-on" : "") + '"></span>'; }).join("");
  return '<section class="panel"><h3>' + planText("plan_streak", "Learning Streak") + '</h3><p class="plan-metric">7 <small>' + planText("plan_days", "Days") + '</small></p><p>' + planText("plan_longest", "Longest streak") + ': 12</p><div class="plan-week" aria-hidden="true">' + bars + '</div></section>';
}

function renderAnalytics() {
  const basic = '<section class="panel"><h3>' + planText("plan_progress", "Learning Progress") + '</h3><ul class="plan-metrics"><li><span>' + planText("plan_completion", "Overall completion") + '</span><strong>65%</strong></li><li><span>' + planText("plan_quiz_avg", "Quiz average") + '</span><strong>8/10</strong></li><li><span>' + planText("plan_lessons_done", "Completed lessons") + '</span><strong>21</strong></li><li><span>' + planText("plan_hours", "Learning hours") + '</span><strong>14</strong></li></ul><div class="progress" aria-hidden="true"><span style="width:65%"></span></div></section>';
  if (!mfIsPremium()) return basic + lockCard("plan_analytics", "plan_analytics_lock");
  return basic + '<section class="panel"><h3>' + planText("plan_analytics", "Advanced Analytics") + '</h3><p>' + planText("plan_active_courses", "Active courses") + ': 3</p><div class="progress" aria-hidden="true"><span style="width:62%"></span></div><p>IELTS · 62%</p><div class="progress" aria-hidden="true"><span style="width:40%"></span></div><p>' + planText("course_en_beginner", "English Beginner") + ' · 40%</p></section>';
}

function renderBadges() {
  const items = [
    ["plan_badge_first", true],
    ["plan_badge_quiz", true],
    ["plan_badge_done", true],
    ["plan_badge_master", mfIsPremium()],
    ["plan_badge_streak", mfIsPremium()]
  ];
  return '<section class="panel"><h3>' + planText("plan_achievements", "Achievements") + '</h3><div class="plan-badges">' + items.map(function (item) {
    return '<span class="plan-badge-item' + (item[1] ? " is-on" : "") + '">' + (item[1] ? "🏆" : "🔒") + " " + planText(item[0], item[0]) + '</span>';
  }).join("") + '</div></section>';
}

function renderCalendar() {
  if (!mfIsPremium()) return lockCard("plan_calendar", "plan_calendar_lock");
  const events = ["plan_event_lesson", "plan_event_quiz", "plan_event_study", "plan_event_live"];
  return '<section class="panel"><h3>' + planText("plan_calendar", "Learning Calendar") + '</h3><ul class="plan-calendar">' + events.map(function (key) {
    return '<li>' + planText(key, key) + '</li>';
  }).join("") + '</ul></section>';
}

function renderHome() {
  const root = document.querySelector("[data-student-membership]");
  if (!root) return;
  root.innerHTML = '<div class="plan-grid">' + renderPlanCard() + renderContinue() + renderStreak() + renderAnalytics() + renderBadges() + renderCalendar() + '</div>';
}

function renderMyPlan() {
  const root = document.querySelector("[data-my-plan]");
  if (!root) return;
  root.innerHTML = '<p class="plan-inline">' + (mfIsPremium() ? "⭐ " + planText("plan_premium", "Premium") : planText("plan_free", "Free Plan")) + '</p>';
  document.querySelectorAll(".mini-course[data-access]").forEach(function (card) {
    const access = card.getAttribute("data-access");
    if (!access || card.querySelector(".plan-badge")) return;
    const badge = document.createElement("span");
    badge.className = "plan-badge is-" + access;
    badge.textContent = courseTypeLabel(access);
    card.appendChild(badge);
  });
}

function comparisonRow(label, free, premium) {
  const mark = function (on) { return on ? "✓" : "—"; };
  return '<tr><th scope="row">' + planText(label, label) + '</th><td>' + mark(free) + '</td><td>' + mark(premium) + '</td></tr>';
}

function renderPlans() {
  const root = document.querySelector("[data-plans]");
  if (!root) return;
  const record = readMembership();
  const price = typeof window.formatPrice === "function" ? window.formatPrice(MF_PREMIUM_PRICE) : "₼49";
  const manage = mfIsPremium()
    ? '<section class="panel plan-card is-premium"><h2>⭐ ' + planText("plan_premium", "Premium") + '</h2><p>' + planText("plan_status", "Status") + ': ' + planText("plan_active", "Active") + '</p><p>' + planText("plan_price", "Price") + ': ' + price + ' / ' + planText("plan_month", "month") + '</p><p>' + planText("plan_next", "Next billing date") + ': ' + (record.expiresAt ? new Date(record.expiresAt).toLocaleDateString() : "—") + '</p></section>'
    : "";
  root.innerHTML = manage +
    '<div class="plan-offers"><section class="panel"><h2>' + planText("plan_free", "Free Plan") + '</h2><p class="plan-metric">' + freePriceLabel() + '</p></section><section class="panel plan-card is-premium"><h2>⭐ ' + planText("plan_premium", "Premium") + '</h2><p class="plan-metric">' + price + '</p><p>' + planText("plan_per_month", "per month") + '</p>' + (mfIsPremium() ? '<p>' + planText("plan_active", "Active") + '</p>' : upgradeLink()) + '</section></div>' +
    '<div class="table-wrap"><table class="data-table plan-table"><thead><tr><th>' + planText("plan_feature", "Feature") + '</th><th>' + planText("plan_free", "Free") + '</th><th>' + planText("plan_premium", "Premium") + '</th></tr></thead><tbody>' +
      comparisonRow("plan_row_free_courses", true, true) +
      comparisonRow("plan_row_premium_courses", false, true) +
      comparisonRow("plan_row_basic", true, true) +
      comparisonRow("plan_analytics", false, true) +
      comparisonRow("plan_streak", false, true) +
      comparisonRow("plan_achievements", false, true) +
      comparisonRow("plan_calendar", false, true) +
      comparisonRow("plan_resources", false, true) +
      comparisonRow("plan_support", false, true) +
    '</tbody></table></div>';
}

function freePriceLabel() {
  return planText("plan_free_price", "Free");
}

function showFreePrice(priceEl) {
  if (!priceEl) return;
  priceEl.classList.add("is-free");
  let label = priceEl.querySelector(".plan-free-price");
  if (!label) {
    priceEl.textContent = "";
    label = document.createElement("span");
    label.className = "plan-free-price";
    priceEl.appendChild(label);
  }
  label.textContent = freePriceLabel();
}

function paintCardPrice(card, slug) {
  const access = courseAccess(slug);
  const course = window.courses && window.courses[slug];
  card.dataset.access = access;
  if (course) card.dataset.cost = String(course.price);
  const priceEl = card.querySelector(".price");
  if (priceEl) {
    const small = priceEl.querySelector("small");
    const extra = small ? small.outerHTML : "";
    if (access === "demo") {
      priceEl.classList.add("is-free");
      priceEl.innerHTML = '<span class="plan-free-price">' + freePriceLabel() + "</span>" + extra;
    } else {
      priceEl.classList.remove("is-free");
      const amount = course ? course.price : Number(card.dataset.cost || 0);
      priceEl.innerHTML = money(amount) + extra;
    }
  }
  let hint = card.querySelector("[data-course-hint]");
  if (!hint) {
    hint = document.createElement("p");
    hint.className = "course-hint";
    hint.setAttribute("data-course-hint", "");
    const foot = card.querySelector(".course-foot");
    if (foot) foot.parentElement.insertBefore(hint, foot);
  }
  const hintKey = access === "premium" ? "card_premium_features" : access === "standard" ? "card_full" : "card_limited";
  hint.textContent = planText(hintKey, hintKey);
  const button = card.querySelector(".course-foot a");
  if (button) {
    if (card.closest("#related-courses-section")) {
      button.setAttribute("href", "course-details.html?course=" + encodeURIComponent(slug));
      button.setAttribute("data-i18n", "btn_view_course");
      button.textContent = planText("btn_view_course", "View Course");
    } else {
      const enrolled = mfIsEnrolled(slug);
      const key = access === "demo" ? "course_start_demo" : enrolled ? "learn_continue" : "btn_enroll";
      const fallback = access === "demo" ? "Start Demo" : enrolled ? "Continue learning" : "Enroll Now";
      button.setAttribute("data-i18n", key);
      button.textContent = planText(key, fallback);
    }
  }
}

function paintCourseBadges() {
  document.querySelectorAll('a[href*="course="]').forEach(function (link) {
    const match = /course=([^&#]+)/.exec(link.getAttribute("href") || "");
    const card = link.closest(".course-card");
    if (!match || !card) return;
    const slug = decodeURIComponent(match[1]);
    const access = courseAccess(slug);
    const media = card.querySelector(".course-media") || card;
    let badge = card.querySelector(".plan-badge");
    if (!badge) {
      badge = document.createElement(media.tagName === "A" ? "span" : "a");
      badge.className = "plan-badge";
      media.appendChild(badge);
    }
    if (badge.tagName === "A") badge.setAttribute("href", link.getAttribute("href"));
    badge.classList.toggle("is-premium", access === "premium");
    badge.classList.toggle("is-standard", access === "standard");
    badge.classList.toggle("is-demo", access === "demo");
    badge.textContent = courseTypeLabel(access);
    paintCardPrice(card, slug);
  });
  const slugs = {
    course_en_beginner: "english-beginner",
    course_en_intermediate: "english-intermediate",
    course_ielts: "ielts",
    course_business: "business-english",
    course_german: "german",
    course_spanish: "spanish",
    course_french: "french",
    course_conversation: "conversation"
  };
  document.querySelectorAll("td[data-i18n]").forEach(function (cell) {
    const slug = slugs[cell.getAttribute("data-i18n")];
    if (!slug) return;
    const row = cell.closest("tr");
    if (!row) return;
    const access = courseAccess(slug);
    const course = window.courses && window.courses[slug];
    const priceCell = row.querySelector('td[data-i18n-label="label_price"]');
    if (priceCell) priceCell.textContent = access === "demo" ? freePriceLabel() : money(course ? course.price : 0);
    const typeCell = row.querySelector("[data-course-type]");
    if (typeCell) typeCell.textContent = courseTypeLabel(access);
  });
}

const MF_COUPONS = { WELCOME10: 10, MF20: 20, STUDENT15: 15 };
let mfCourseCoupon = null;

function mfResolveCoupon(code) {
  const key = String(code || "").trim().toUpperCase();
  if (!MF_COUPONS[key]) return null;
  return { code: key, percent: MF_COUPONS[key] };
}

function mfCouponMath(amount, percent) {
  const original = Math.round(Number(amount) || 0);
  const discount = Math.round(original * percent / 100);
  return { original: original, discount: discount, final: Math.max(0, original - discount) };
}

function money(amount) {
  if (typeof window.formatPrice === "function") return window.formatPrice(amount);
  return "₼" + amount;
}

function appliedFor(slug) {
  return mfCourseCoupon && mfCourseCoupon.slug === slug ? mfCourseCoupon : null;
}

function renderCourseOffer(slug, premiumCourse) {
  const anchor = document.getElementById("course-overview-section");
  if (!anchor) return;
  let section = document.querySelector("[data-course-offer]");
  if (!section) {
    section = document.createElement("section");
    section.className = "section course-offer";
    section.setAttribute("data-course-offer", "");
    anchor.parentElement.insertBefore(section, anchor);
  }
  const type = courseAccess(slug);
  const keys = type === "premium"
    ? ["offer_full", "offer_videos", "offer_files", "offer_analytics", "offer_streak", "offer_badges", "offer_calendar", "offer_certificate", "offer_ai", "offer_exclusive", "offer_support", "offer_coupon"]
    : type === "standard"
      ? ["offer_full", "offer_videos", "offer_written", "offer_basic_quiz", "offer_basic_progress", "offer_resume", "offer_files", "offer_complete", "offer_standard_cert", "offer_reviews"]
      : ["offer_demo_lessons", "offer_demo_video", "offer_demo_quiz", "offer_basic_progress", "offer_preview"];
  section.innerHTML =
    '<div class="container"><p class="eyebrow">' + courseTypeLabel(type) + '</p><h2>' + planText("offer_title", "What you'll get") + '</h2><ul class="offer-list">' +
    keys.map(function (key) { return '<li><i class="bi bi-check2" aria-hidden="true"></i><span>' + planText(key, key) + '</span></li>'; }).join("") +
    '</ul></div>';
}

function paintCouponBox(slug) {
  const host = document.querySelector("a[data-enroll]");
  const existing = document.querySelector("[data-coupon]");
  if (!host || courseAccess(slug) === "demo") {
    if (existing) existing.remove();
    return;
  }
  let box = existing;
  if (!box) {
    box = document.createElement("div");
    box.className = "coupon-box";
    box.setAttribute("data-coupon", "");
    host.parentElement.insertBefore(box, host);
  }
  const course = window.courses && window.courses[slug];
  const applied = appliedFor(slug);
  const quote = applied && course ? mfCouponMath(course.price, applied.percent) : null;
  box.innerHTML =
    '<p class="coupon-label"><i class="bi bi-ticket-perforated" aria-hidden="true"></i> ' + planText("coupon_have", "Have a coupon?") + '</p>' +
    (applied
      ? '<p class="coupon-ok"><i class="bi bi-check-circle" aria-hidden="true"></i> ' + planText("coupon_ok", "Coupon applied successfully") + '</p>' +
        '<ul class="coupon-lines">' +
          '<li><span>' + planText("coupon_original", "Original Price") + '</span><strong>' + money(quote.original) + '</strong></li>' +
          '<li><span>' + planText("coupon_discount", "Discount") + ' (' + applied.percent + '%)</span><strong>-' + money(quote.discount) + '</strong></li>' +
          '<li><span>' + planText("coupon_final", "Final Price") + '</span><strong>' + money(quote.final) + '</strong></li>' +
        '</ul>' +
        '<button class="btn btn-outline btn-sm" type="button" data-coupon-remove>' + planText("coupon_remove", "Remove Coupon") + '</button>'
      : '<form class="coupon-form" data-coupon-form>' +
          '<input name="coupon" type="text" autocomplete="off" placeholder="' + planText("coupon_placeholder", "Enter coupon code") + '" aria-label="' + planText("coupon_placeholder", "Enter coupon code") + '">' +
          '<button class="btn btn-primary" type="submit">' + planText("coupon_apply", "Apply") + '</button>' +
        '</form>' +
        '<p class="coupon-error" data-coupon-error hidden></p>');
}

function lockDemoCurriculum(type) {
  const modules = document.querySelectorAll(".course-module");
  if (!modules.length) return;
  const slug = mfCourseSlug();
  const unlocked = type !== "demo" && mfIsEnrolled(slug);
  modules.forEach(function (module, index) {
    const lockedModule = type === "demo" ? index > 0 : !unlocked && index > 0;
    module.classList.toggle("is-locked", lockedModule);
    module.querySelectorAll(".lesson-row").forEach(function (row) {
      const icon = row.querySelector(".bi-lock, .bi-unlock");
      if (!icon) return;
      const open = type === "demo" ? index === 0 : unlocked;
      icon.classList.toggle("bi-unlock", open);
      icon.classList.toggle("bi-lock", !open);
    });
    let note = module.querySelector(".lesson-lock");
    if (!lockedModule) {
      if (note) note.remove();
      return;
    }
    if (!note) {
      note = document.createElement("p");
      note.className = "lesson-lock";
      const panel = module.querySelector(".course-module-panel") || module;
      panel.appendChild(note);
    }
    note.textContent = "🔒 " + planText("course_locked", "Locked lesson") + ". " + planText("course_locked_text", "Purchase the full course to unlock this lesson.");
  });
}

function mfApplyCourseAccess(slug) {
  const selected = slug || mfCourseSlug();
  const premiumCourse = courseAccess(selected) === "premium";
  const applied = appliedFor(selected);
  document.querySelectorAll("a[data-enroll]").forEach(function (link) {
    if (!premiumCourse && courseAccess(selected) === "demo") {
      link.setAttribute("href", "learn.html");
      link.setAttribute("data-i18n", "course_start_demo");
      link.textContent = planText("course_start_demo", "Start Demo");
    } else if (mfIsEnrolled(selected)) {
      link.setAttribute("href", "learn.html");
      link.setAttribute("data-i18n", "learn_continue");
      link.textContent = planText("learn_continue", "Continue learning");
    } else {
      let href = "checkout.html?course=" + encodeURIComponent(selected || "english-beginner");
      if (applied) href += "&coupon=" + encodeURIComponent(applied.code);
      link.setAttribute("href", href);
      link.setAttribute("data-i18n", "btn_enroll");
      link.textContent = planText("btn_enroll", "Enroll Now");
    }
  });
  let upgrades = document.querySelector("[data-course-upgrades]");
  const enrollLink = document.querySelector("a[data-enroll]");
  if (courseAccess(selected) === "demo" && enrollLink) {
    if (!upgrades) {
      upgrades = document.createElement("div");
      upgrades.className = "course-upgrades";
      upgrades.setAttribute("data-course-upgrades", "");
      enrollLink.parentElement.insertBefore(upgrades, enrollLink.nextSibling);
    }
    upgrades.hidden = false;
    upgrades.innerHTML = '<a class="btn btn-outline btn-block" href="course-details.html?course=business-english">' + planText("course_upgrade_standard", "Upgrade to Standard") + '</a><a class="btn btn-outline btn-block" href="course-details.html?course=ielts">' + planText("course_upgrade_premium", "Upgrade to Premium") + '</a>';
  } else if (upgrades) upgrades.hidden = true;
  const priceEl = document.querySelector('[data-bind="price"]');
  let kind = document.querySelector("[data-course-kind]");
  if (priceEl && !kind) {
    kind = document.createElement("p");
    kind.className = "course-kind";
    kind.setAttribute("data-course-kind", "");
    priceEl.parentElement.insertBefore(kind, priceEl);
  }
  if (kind) {
    const type = courseAccess(selected);
    kind.classList.toggle("is-premium", type === "premium");
    kind.classList.toggle("is-standard", type === "standard");
    kind.classList.toggle("is-demo", type === "demo");
    kind.textContent = courseTypeLabel(type);
  }
  const included = document.querySelector(".course-purchase .purchase-list");
  if (included) {
    const type = courseAccess(selected);
    const keys = type === "premium"
      ? ["offer_full", "offer_files", "offer_analytics", "offer_certificate", "offer_coupon"]
      : type === "standard"
        ? ["offer_full", "offer_videos", "offer_basic_quiz", "offer_complete", "offer_standard_cert"]
        : ["offer_demo_lessons", "offer_demo_video", "offer_demo_quiz", "offer_preview", "offer_locked"];
    included.innerHTML = keys.map(function (key) {
      return '<li><i class="bi bi-check2" aria-hidden="true"></i><span>' + planText(key, key) + '</span></li>';
    }).join("");
  }
  renderCourseOffer(selected, premiumCourse);
  if (priceEl && courseAccess(selected) === "demo") {
    priceEl.classList.add("is-free");
    priceEl.textContent = freePriceLabel();
  }
  if (priceEl && courseAccess(selected) !== "demo") priceEl.classList.remove("is-free");
  if (priceEl && courseAccess(selected) !== "demo") {
    const course = window.courses && window.courses[selected];
    if (applied && course) {
      const quote = mfCouponMath(course.price, applied.percent);
      priceEl.innerHTML = '<span class="coupon-off">' + applied.percent + '% ' + planText("coupon_off", "OFF") + '</span> ' + money(quote.final);
    } else if (course && typeof window.formatPrice === "function") {
      priceEl.textContent = window.formatPrice(course.price);
    }
  }
  if (document.querySelector("a[data-enroll]")) paintCouponBox(selected);
  lockDemoCurriculum(courseAccess(selected));
  const oldLock = document.querySelector("[data-premium-course]");
  if (oldLock) oldLock.hidden = true;
}

function paintAssistant() {
  const mark = document.querySelector("[data-ai-plan]");
  if (!mark) return;
  if (!mfIsPremium()) {
    mark.hidden = true;
    mark.textContent = "";
    return;
  }
  mark.hidden = false;
  mark.textContent = "⭐ " + planText("plan_ai", "Premium AI Assistant");
}

function openPlansView() {
  const target = document.getElementById("plans-section");
  if (!target) return false;
  document.querySelectorAll(".dash-view").forEach(function (view) {
    view.classList.toggle("is-active", view === target);
  });
  document.querySelectorAll("[data-view-target]").forEach(function (button) {
    button.classList.toggle("is-active", button.getAttribute("data-view-target") === "plans-section");
  });
  const title = document.querySelector(".dash-title");
  if (title) title.textContent = planText("plan_nav", "Plans");
  target.scrollIntoView({ block: "start" });
  return true;
}

function initMembership() {
  renderHome();
  renderMyPlan();
  renderPlans();
  paintCourseBadges();
  if (document.querySelector("[data-course-detail], #courseDetail")) mfApplyCourseAccess();
  paintAssistant();
  if (initMembership.bound) return;
  initMembership.bound = true;
  document.addEventListener("click", function (event) {
    const open = event.target.closest("[data-open-plans]");
    if (open && document.getElementById("plans-section")) {
      event.preventDefault();
      openPlansView();
      return;
    }
    if (!event.target.closest("[data-coupon-remove]")) return;
    event.preventDefault();
    mfCourseCoupon = null;
    mfApplyCourseAccess(mfCourseSlug());
  });
  document.addEventListener("submit", function (event) {
    const form = event.target.closest("[data-coupon-form]");
    if (!form) return;
    event.preventDefault();
    const slug = mfCourseSlug();
    const found = mfResolveCoupon(form.querySelector("input").value);
    const error = form.parentElement.querySelector("[data-coupon-error]");
    if (!found) {
      if (error) {
        error.hidden = false;
        error.textContent = planText("coupon_invalid", "Invalid or expired coupon code.");
      }
      return;
    }
    mfCourseCoupon = { slug: slug, code: found.code, percent: found.percent };
    mfApplyCourseAccess(slug);
  });
  document.addEventListener("mf-membership", initMembership);
  document.addEventListener("mf-language", initMembership);
}

window.mfIsPremium = mfIsPremium;
window.mfActivatePremium = mfActivatePremium;
window.mfApplyCourseAccess = mfApplyCourseAccess;
window.mfEnrollCourse = mfEnrollCourse;
window.mfHasPaidEnrollment = mfHasPaidEnrollment;
window.mfCourseSlug = mfCourseSlug;
window.mfResolveCoupon = mfResolveCoupon;
window.mfCouponMath = mfCouponMath;
window.initMembership = initMembership;
document.addEventListener("DOMContentLoaded", initMembership);
