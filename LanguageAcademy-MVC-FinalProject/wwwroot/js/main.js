function formatPrice(amount) {
  const azn = Number(amount);
  if (!Number.isFinite(azn)) return "";
  return "₼" + azn.toFixed(0);
}

window.formatPrice = formatPrice;

const courses = {
    "english-beginner": {
      type: "demo",
      title: "English A1 — Complete Beginner Course",
      level: "Beginner",
      duration: "8 weeks",
      price: 0,
      lessons: "32 lessons",
      image: "images/course-beginner.jpg",
      summary: "Start English from zero with guided speaking, everyday vocabulary, and clear grammar you can use the same day.",
      overview: "This beginner pathway takes you from first greetings to short everyday conversations. Each module mixes video, reading, and a short quiz. Classes stay practical, with pronunciation and daily situations at the center.",
      learn: ["Introduce yourself in English", "Understand basic conversations", "Build everyday vocabulary", "Use basic grammar", "Improve pronunciation", "Speak in common daily situations"],
      curriculum: [
        ["Week 1–2 · Sounds and first conversations", "Pronunciation basics, greetings, and questions you will actually use."],
        ["Week 3–4 · Daily life", "Home, work, food, and telling the time with natural phrases."],
        ["Week 5–6 · Out in the city", "Directions, shopping, and polite requests."],
        ["Week 7–8 · Your story", "Past events, short presentations, and a final speaking check."]
      ]
    },
    "english-intermediate": {
      type: "premium",
      title: "English Intermediate",
      level: "Intermediate",
      duration: "10 weeks",
      price: 119,
      lessons: "20 live lessons",
      image: "images/course-intermediate.jpg",
      summary: "Move from careful sentences to fluent discussion. You will practice opinion, story, and workplace English.",
      overview: "Learners at this level already know the basics. The course pushes accuracy and flow with debates, short writing, and real listening.",
      learn: ["Hold a five-minute opinion conversation", "Use linking language in stories and emails", "Understand common fast speech", "Give and receive clear feedback"],
      curriculum: [
        ["Week 1–3 · Fluency habits", "Speaking frames, hesitation language, and listening for gist."],
        ["Week 4–6 · Stories and opinions", "Narrative tenses, agreeing, and disagreeing politely."],
        ["Week 7–8 · Work and study", "Meetings, summaries, and clearer emails."],
        ["Week 9–10 · Showcase", "A short talk plus a personal progress plan."]
      ]
    },
    ielts: {
      type: "premium",
      title: "IELTS Preparation",
      level: "Upper intermediate",
      duration: "8 weeks",
      price: 119,
      lessons: "16 live lessons",
      image: "images/course-ielts.jpg",
      summary: "Train for the Academic IELTS with timed tasks, score-focused feedback, and strategies for each paper.",
      overview: "You will practice Listening, Reading, Writing, and Speaking every week. Teachers mark work with the public band descriptors so progress is visible.",
      learn: ["Plan Task 1 and Task 2 under time pressure", "Build speaking answers for all three parts", "Avoid the errors that cost bands", "Sit two full mock tests"],
      curriculum: [
        ["Week 1–2 · Exam map", "Format, timing, and a diagnostic mock."],
        ["Week 3–4 · Reading and listening", "Question types, traps, and speed."],
        ["Week 5–6 · Writing", "Task structure, cohesion, and model feedback."],
        ["Week 7–8 · Speaking and final mock", "Fluency drills and a full timed test."]
      ]
    },
    "business-english": {
      type: "standard",
      title: "Business English",
      level: "Intermediate",
      duration: "8 weeks",
      price: 59,
      lessons: "16 live lessons",
      image: "images/course-business.jpg",
      summary: "Sound clear and credible in meetings, presentations, and professional email.",
      overview: "The course uses realistic workplace scenarios: project updates, negotiations, and client calls. You leave with phrases you can reuse on Monday.",
      learn: ["Lead a short meeting", "Write concise professional email", "Present results without reading slides", "Handle disagreement calmly"],
      curriculum: [
        ["Week 1–2 · Professional presence", "Introductions, small talk, and tone."],
        ["Week 3–4 · Meetings", "Agendas, interrupting politely, and action points."],
        ["Week 5–6 · Writing", "Email, chat, and short proposals."],
        ["Week 7–8 · Presentations", "Structure, visuals, and questions from the room."]
      ]
    },
    german: {
      type: "standard",
      title: "German Language",
      level: "Beginner",
      duration: "10 weeks",
      price: 59,
      lessons: "20 live lessons",
      image: "images/course-german.jpg",
      summary: "Start German with practical dialogues, clear grammar, and pronunciation you can trust.",
      overview: "A1-focused classes cover sounds, cases in context, and the situations new arrivals need first: transport, housing, and introductions.",
      learn: ["Introduce yourself in German", "Order, ask, and understand simple replies", "Use articles and present tense with confidence", "Read short everyday notices"],
      curriculum: [
        ["Week 1–3 · First contact", "Alphabet, sounds, and personal information."],
        ["Week 4–6 · Around town", "Food, transport, and numbers."],
        ["Week 7–8 · Grammar in use", "Present tense, questions, and modal verbs."],
        ["Week 9–10 · Mini project", "A short dialogue presentation."]
      ]
    },
    spanish: {
      type: "standard",
      title: "Spanish Language",
      level: "Beginner",
      duration: "10 weeks",
      price: 59,
      lessons: "20 live lessons",
      image: "images/course-spanish.jpg",
      summary: "Learn Spanish you can speak from the first class, with culture notes woven into every topic.",
      overview: "Lessons balance conversation and grammar. You practice Latin American and Peninsular varieties so you can follow real speakers.",
      learn: ["Talk about yourself, family, and plans", "Use present tense and gustar naturally", "Navigate travel conversations", "Understand slow, clear speech"],
      curriculum: [
        ["Week 1–3 · People and places", "Greetings, ser/estar, and descriptions."],
        ["Week 4–6 · Routines", "Present tense, time, and daily verbs."],
        ["Week 7–8 · Going out", "Food, directions, and polite requests."],
        ["Week 9–10 · Stories", "Near future and a speaking showcase."]
      ]
    },
    french: {
      type: "standard",
      title: "French Beginner",
      level: "Beginner",
      duration: "10 weeks",
      price: 59,
      lessons: "20 live lessons",
      image: "images/course-french.jpg",
      summary: "A friendly start in French, with pronunciation coaching and conversations for travel and study.",
      overview: "You will get comfortable with sounds that feel new, then use them in café, travel, and classroom situations.",
      learn: ["Pronounce French rhythms with more confidence", "Introduce yourself and ask simple questions", "Handle menus and tickets", "Write a short personal message"],
      curriculum: [
        ["Week 1–3 · Sounds and greetings", "Nasal vowels, rhythm, and introductions."],
        ["Week 4–6 · Daily French", "Food, time, and preferences."],
        ["Week 7–8 · On the move", "Transport and asking for help."],
        ["Week 9–10 · Your portrait", "A short spoken and written profile."]
      ]
    },
    conversation: {
      type: "demo",
      title: "Conversation Workshop",
      level: "All levels",
      duration: "6 weeks",
      price: 0,
      lessons: "12 live lessons",
      image: "images/course-conversation.jpg",
      summary: "A speaking-first workshop for learners who understand more than they say.",
      overview: "Each session is built around a topic, useful chunks, and feedback on clarity. Homework is short audio, not long grammar sheets.",
      learn: ["Speak for longer turns", "Ask follow-up questions", "Notice and reuse natural chunks", "Track your own progress"],
      curriculum: [
        ["Week 1–2 · Confidence", "Turn-taking and repair phrases."],
        ["Week 3–4 · Opinions", "Stories from your week and current topics."],
        ["Week 5 · Stories", "Past experiences and detail."],
        ["Week 6 · Open studio", "Student-chosen topics and final feedback."]
      ]
    }
};

// 05. Search and course filtering
function searchQueryFromUrl() {
  let search = window.location.search;
  if (!search && window.location.hash.indexOf("?") !== -1) {
    search = window.location.hash.slice(window.location.hash.indexOf("?"));
  }
  const params = new URLSearchParams(search);
  return (params.get("search") || params.get("q") || "").trim();
}

function courseHaystack(card) {
  return [
    card.dataset.search,
    card.dataset.category,
    card.dataset.level,
    card.dataset.language,
    card.textContent
  ].join(" ").toLowerCase();
}

function courseResultLabel(count, hasQuery) {
  const lang = document.documentElement.lang || "az";
  const t = window.mfT || function (_key, fallback) { return fallback; };
  if (hasQuery) {
    if (lang === "ru") {
      const mod10 = count % 10;
      const mod100 = count % 100;
      const word = mod10 === 1 && mod100 !== 11 ? "курс найден" : (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14) ? "курса найдено" : "курсов найдено");
      return count + " " + word;
    }
    if (lang === "az") return count + " kurs tapıldı";
    return count + " " + (count === 1 ? "Course Found" : t("search_courses_found", "Courses Found"));
  }
  const all = t("search_showing_all", "Showing all courses");
  if (lang === "ru") {
    const mod10 = count % 10;
    const mod100 = count % 100;
    const word = mod10 === 1 && mod100 !== 11 ? "курс" : (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14) ? "курса" : "курсов");
    return all + " · " + count + " " + word;
  }
  if (lang === "az") return all + " · " + count + " kurs";
  return all + " · " + count + " " + (count === 1 ? t("search_course_one", "Course") : t("search_course_many", "Courses"));
}

function initSearch() {
  const query = searchQueryFromUrl();

  document.querySelectorAll(".header-search input").forEach(function (input) {
    if (query) input.value = query;
  });

  document.querySelectorAll(".catalog-search, .lms-search").forEach(function (input) {
    if (query) input.value = query;
  });

  document.querySelectorAll(".header-search").forEach(function (form) {
    const icon = form.querySelector("i");
    if (!icon || icon.dataset.searchBound === "1") return;
    icon.dataset.searchBound = "1";
    icon.addEventListener("click", function (event) {
      event.preventDefault();
      if (typeof form.requestSubmit === "function") form.requestSubmit();
      else form.submit();
    });
  });
}

// 06. Course filtering
function initCourseFilter() {
  const catalogInput = document.querySelector(".catalog-search");
  const catalogEmpty = document.querySelector(".catalog-empty");
  const filterButtons = document.querySelectorAll("[data-filter]");
  if (!catalogInput && !filterButtons.length) return;

  function paintCourseEmpty(typed, raw) {
    if (!catalogEmpty) return;
    const title = catalogEmpty.querySelector("[data-search-title]");
    const miss = catalogEmpty.querySelector("[data-search-miss]");
    const clear = catalogEmpty.querySelector("[data-clear-search]");
    const t = window.mfT || function (_key, fallback) { return fallback; };
    if (title) title.textContent = typed ? t("search_none_title", "No courses found") : t("search_none_filters", "No courses match those filters.");
    if (miss) miss.textContent = typed ? t("search_none_lead", "We couldn't find any courses matching") + ' "' + raw + '". ' + t("search_none_try", "Try another search term.") : "";
    if (clear) clear.hidden = !typed;
  }

  function applyCourseFilter() {
    const inputNow = document.querySelector(".catalog-search");
    const emptyNow = document.querySelector(".catalog-empty");
    const active = document.querySelector("[data-filter].is-active")?.dataset.filter || "all";
    const raw = (inputNow?.value || "").trim();
    const typed = raw.toLowerCase();
    const cards = document.querySelectorAll(".course-catalog .course-card[data-category]");
    let visible = 0;
    cards.forEach(function (card) {
      const categoryMatch = active === "all" || card.dataset.category === active;
      const textMatch = !typed || courseHaystack(card).includes(typed);
      const show = categoryMatch && textMatch;
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (emptyNow) emptyNow.hidden = visible !== 0;
    if (emptyNow) {
      const title = emptyNow.querySelector("[data-search-title]");
      const miss = emptyNow.querySelector("[data-search-miss]");
      const clear = emptyNow.querySelector("[data-clear-search]");
      const t = window.mfT || function (_key, fallback) { return fallback; };
      if (title) title.textContent = typed ? t("search_none_title", "No courses found") : t("search_none_filters", "No courses match those filters.");
      if (miss) miss.textContent = typed ? t("search_none_lead", "We couldn't find any courses matching") + ' "' + raw + '". ' + t("search_none_try", "Try another search term.") : "";
      if (clear) clear.hidden = !typed;
    }
    const count = document.querySelector("[data-course-count]");
    if (count) count.textContent = courseResultLabel(visible, Boolean(typed));
    if (typeof syncSearchUrl === "function") syncSearchUrl(raw);
  }

function syncSearchUrl(value) {
  if (window.location.hash.indexOf("#/") === 0) {
    const file = window.location.hash.slice(2).split("?")[0].split("#")[0] || "index.html";
    const route = "#/" + file + (value ? "?q=" + encodeURIComponent(value) : "");
    if (window.location.hash === route) return;
    try { history.replaceState({ mf: 1 }, "", window.location.pathname + window.location.search + route); } catch (error) { /* keep the current address */ }
    return;
  }
  const url = new URL(window.location.href);
  if (value) url.searchParams.set("q", value);
  else url.searchParams.delete("q");
  url.searchParams.delete("search");
  const next = url.pathname + url.search;
  if (next === window.location.pathname + window.location.search) return;
  history.replaceState({ mf: 1 }, "", next);
}

window.syncSearchUrl = syncSearchUrl;

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      filterButtons.forEach(function (item) { item.classList.remove("is-active"); });
      button.classList.add("is-active");
      applyCourseFilter();
    });
  });

  catalogInput?.addEventListener("input", applyCourseFilter);
  catalogInput?.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      applyCourseFilter();
    }
  });
  catalogInput?.closest(".search-field")?.querySelector("i")?.addEventListener("click", applyCourseFilter);
  document.querySelector("[data-clear-search]")?.addEventListener("click", function () {
    if (catalogInput) catalogInput.value = "";
    const url = new URL(window.location.href);
    url.searchParams.delete("q");
    url.searchParams.delete("search");
    history.replaceState({}, "", url.pathname + url.search);
    applyCourseFilter();
    catalogInput?.focus();
  });
  if (!initCourseFilter.langBound) {
    initCourseFilter.langBound = true;
    document.addEventListener("mf-language", function () {
      document.querySelector(".catalog-search")?.dispatchEvent(new Event("input", { bubbles: true }));
    });
  }
  applyCourseFilter();
}

// 10. Animations
function initAnimations() {
  const revealItems = document.querySelectorAll(".reveal");
  if (revealItems.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });
    revealItems.forEach(function (item) { observer.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add("is-visible"); });
  }

  const counters = document.querySelectorAll("[data-count]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function runCount(el) {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    if (reduceMotion) {
      el.textContent = target.toLocaleString() + suffix;
      return;
    }
    const start = performance.now();
    const duration = 1200;
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.round(target * (1 - Math.pow(1 - progress, 3)));
      el.textContent = value.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if (counters.length && "IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        runCount(entry.target);
        counterObserver.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (counter) { counterObserver.observe(counter); });
  } else {
    counters.forEach(runCount);
  }

  if (!initAnimations.scrollBound) {
    initAnimations.scrollBound = true;
    window.addEventListener("scroll", function () {
      const backToTop = document.querySelector(".back-to-top");
      if (backToTop) backToTop.classList.toggle("is-visible", window.scrollY > 500);
    }, { passive: true });
  }
  const backToTop = document.querySelector(".back-to-top");
  if (backToTop && backToTop.dataset.topBound !== "1") {
    backToTop.dataset.topBound = "1";
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }
}

function renderCourseDetail() {
  const detailRoot = document.querySelector("[data-course-detail]") || document.getElementById("courseDetail");
  if (detailRoot) {
    const bind = function (name) {
      return document.querySelector('[data-bind="' + name + '"]');
    };
    const selected = (typeof window.mfCourseSlug === "function" && window.mfCourseSlug()) || new URLSearchParams(window.location.search).get("course") || "english-beginner";
    const course = courses[selected] || courses["english-beginner"];
    const text = function (value) {
      return window.mfText ? window.mfText(value) : value;
    };
    const setText = function (name, value) {
      const el = bind(name);
      if (el) el.textContent = value;
    };
    const title = text(course.title);
    setText("title", title);
    setText("crumb", title);
    setText("summary", text(course.summary));
    setText("overview", text(course.overview));
    setText("price", formatPrice(course.price));
    setText("level", text(course.level));
    setText("duration", text(course.duration));
    setText("lessons", text(course.lessons));
    const image = bind("image");
    if (image) {
      image.src = course.image;
      image.alt = title + " course";
    }
    document.title = title + " | MF Language Academy";
    document.querySelectorAll("a[data-enroll]").forEach(function (link) {
      link.setAttribute("href", "checkout.html?course=" + encodeURIComponent(selected));
    });
    if (typeof window.mfApplyCourseAccess === "function") window.mfApplyCourseAccess(selected);

    const learn = bind("learn");
    if (learn) {
      learn.innerHTML = "";
      course.learn.forEach(function (item) {
        const li = document.createElement("li");
        li.innerHTML = '<i class="bi bi-check-circle-fill"></i><span></span>';
        li.querySelector("span").textContent = text(item);
        learn.appendChild(li);
      });
    }

    const curriculum = bind("curriculum");
    if (!curriculum) return;
    curriculum.innerHTML = "";
    course.curriculum.forEach(function (block, index) {
      const blockEl = document.createElement("div");
      blockEl.className = "accordion-item" + (index === 0 ? " is-open" : "");
      const button = document.createElement("button");
      button.type = "button";
      button.className = "accordion-trigger";
      button.innerHTML = "<span></span><i class='bi bi-plus-lg'></i>";
      button.querySelector("span").textContent = text(block[0]);
      const panel = document.createElement("div");
      panel.className = "accordion-panel";
      const paragraph = document.createElement("p");
      paragraph.textContent = text(block[1]);
      panel.appendChild(paragraph);
      blockEl.appendChild(button);
      blockEl.appendChild(panel);
      button.addEventListener("click", function () {
        const open = blockEl.classList.contains("is-open");
        curriculum.querySelectorAll(".accordion-item").forEach(function (item) {
          item.classList.remove("is-open");
        });
        if (!open) blockEl.classList.add("is-open");
      });
      curriculum.appendChild(blockEl);
    });
  }
}

function initCoursePage() {
  document.querySelectorAll(".accordion-trigger").forEach(function (trigger) {
    if (trigger.dataset.accBound === "1" || trigger.closest(".faq-panel")) return;
    trigger.dataset.accBound = "1";
    trigger.addEventListener("click", function () {
        const item = trigger.closest(".accordion-item");
        const open = item.classList.contains("is-open");
        item.parentElement.querySelectorAll(".accordion-item").forEach(function (sibling) {
          sibling.classList.remove("is-open");
        });
        if (!open) item.classList.add("is-open");
    });
  });
  renderCourseDetail();
}

window.renderCourseDetail = renderCourseDetail;

// 08. Modals
function initModals() {
  function openModal(modal) {
    if (!modal) return;
    modal.hidden = false;
    modal.classList.add("is-open");
    document.body.classList.add("nav-lock");
    modal.querySelector(".modal-close")?.focus();
  }

  function closeModal(modal) {
    modal.classList.remove("is-open");
    modal.hidden = true;
    document.body.classList.remove("nav-lock");
  }

  document.querySelectorAll("[data-open-modal]").forEach(function (button) {
    if (button.dataset.modalBound === "1") return;
    button.dataset.modalBound = "1";
    button.addEventListener("click", function (event) {
      event.preventDefault();
      const name = button.dataset.openModal;
      openModal(document.querySelector('[data-modal="' + name + '"]') || document.getElementById(name));
    });
  });

  document.querySelectorAll(".modal").forEach(function (modal) {
    if (modal.dataset.modalBound === "1") return;
    modal.dataset.modalBound = "1";
    modal.addEventListener("click", function (event) {
      if (event.target === modal) closeModal(modal);
    });
    modal.querySelectorAll("[data-modal-close]").forEach(function (button) {
      button.addEventListener("click", function () { closeModal(modal); });
    });
  });

  if (!initModals.ready) {
    initModals.ready = true;
    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      document.querySelectorAll(".modal.is-open").forEach(closeModal);
    });
  }
}

// 07. Teachers
function initTeachers() {
  const teacherModal = document.querySelector('[data-modal="teacher"]') || document.getElementById("teacherModal");
  if (!teacherModal) return;

  document.querySelectorAll("[data-teacher-open]").forEach(function (button) {
    button.addEventListener("click", function () {
      teacherModal.querySelector("[data-teacher='photo']").src = button.dataset.photo;
      teacherModal.querySelector("[data-teacher='photo']").alt = button.dataset.name;
      teacherModal.querySelector("[data-teacher='name']").textContent = button.dataset.name;
      teacherModal.querySelector("[data-teacher='role']").textContent = button.dataset.role;
      teacherModal.querySelector("[data-teacher='bio']").textContent = button.dataset.bio;
      teacherModal.hidden = false;
      teacherModal.classList.add("is-open");
      document.body.classList.add("nav-lock");
      teacherModal.querySelector(".modal-close")?.focus();
    });
  });
}

function initDashboard() {
  const sidebar = document.querySelector(".dash-sidebar");
  const sideToggle = document.querySelector(".side-toggle") || document.getElementById("sideToggle");
  const sideOverlay = document.querySelector(".side-overlay");
  if (!document.querySelector(".dash")) return;

  document.querySelectorAll("a.logout").forEach(function (link) {
    if (link.dataset.logoutBound === "1") return;
    link.dataset.logoutBound = "1";
    link.addEventListener("click", function () {
      if (typeof window.mfClearAuth === "function") window.mfClearAuth();
    });
  });

  function setSidebar(open) {
    sidebar?.classList.toggle("is-open", open);
    sideOverlay?.classList.toggle("is-open", open);
  }

  function showDashView(id, titleText) {
    if (!id) return;
    document.querySelectorAll(".dash-view").forEach(function (view) {
      view.classList.toggle("is-active", view.id === id);
    });
    document.querySelectorAll("[data-view-target]").forEach(function (item) {
      item.classList.toggle("is-active", item.getAttribute("data-view-target") === id);
    });
    const title = document.querySelector(".dash-title") || document.getElementById("dashTitle");
    if (title && titleText) title.textContent = titleText;
    if (typeof window.initTeacherPlan === "function") window.initTeacherPlan();
    if (typeof window.initRewards === "function") window.initRewards();
    if (typeof window.initMembership === "function") window.initMembership();
    setSidebar(false);
  }

  if (sideToggle && sideToggle.dataset.sideBound !== "1") {
    sideToggle.dataset.sideBound = "1";
    sideToggle.addEventListener("click", function () {
      setSidebar(!sidebar.classList.contains("is-open"));
    });
  }
  if (sideOverlay && sideOverlay.dataset.sideBound !== "1") {
    sideOverlay.dataset.sideBound = "1";
    sideOverlay.addEventListener("click", function () { setSidebar(false); });
  }

  document.querySelectorAll("[data-view-target]").forEach(function (button) {
    if (button.dataset.viewBound === "1") return;
    button.dataset.viewBound = "1";
    button.addEventListener("click", function () {
      const id = button.dataset.viewTarget;
      const label = button.dataset.title || button.textContent.trim() || "Dashboard";
      showDashView(id, label);
    });
  });

  if (typeof window.initTeacherPlan === "function") window.initTeacherPlan();
  if (typeof window.initRewards === "function") window.initRewards();

  function applyDashHash() {
    const id = (window.location.hash || "").replace(/^#/, "");
    if (!id) return;
    const target = document.getElementById(id);
    if (!target || !target.classList.contains("dash-view")) return;
    const button = document.querySelector('[data-view-target="' + id + '"]');
    const label = button
      ? (button.dataset.title || button.textContent.trim())
      : id;
    showDashView(id, label);
  }
  applyDashHash();
  if (!initDashboard.hashBound) {
    initDashboard.hashBound = true;
    window.addEventListener("hashchange", applyDashHash);
  }

  const studentFilter = document.querySelector(".student-filter") || document.getElementById("studentFilter");
  studentFilter?.addEventListener("input", function () {
    const query = studentFilter.value.trim().toLowerCase();
    document.querySelectorAll("[data-student-row]").forEach(function (row) {
      row.hidden = query && !row.dataset.studentRow.includes(query);
    });
  });

  document.querySelectorAll("[data-message]").forEach(function (button) {
    button.addEventListener("click", function () {
      document.querySelectorAll("[data-message]").forEach(function (item) {
        item.classList.remove("is-active");
      });
      button.classList.add("is-active");
      const view = document.querySelector(".message-view") || document.getElementById("messageView");
      if (!view) return;
      view.querySelector("h3").textContent = button.dataset.from;
      view.querySelector("p").textContent = button.dataset.body;
    });
  });

  document.querySelectorAll("[data-switch]").forEach(function (toggle) {
    toggle.addEventListener("click", function () {
      toggle.classList.toggle("is-on");
    });
  });

  const settingsSave = document.querySelector(".settings-save") || document.getElementById("settingsSave");
  const toast = document.querySelector(".toast");
  settingsSave?.addEventListener("click", function () {
    if (!toast) return;
    toast.hidden = false;
    window.setTimeout(function () { toast.hidden = true; }, 2200);
  });

  document.querySelectorAll('a[href="#"]').forEach(function (link) {
    if (link.dataset.hashBound === "1") return;
    link.dataset.hashBound = "1";
    link.addEventListener("click", function (event) { event.preventDefault(); });
  });
}

// 11. Initialization
window.courses = courses;
document.addEventListener("DOMContentLoaded", function () {
  initNavigation();
  initMobileMenu();
  initSearch();
  initCourseSlider();
  initCourseFilter();
  initTeachers();
  initTestimonials();
  initForms();
  initAnimations();
  initCoursePage();
  initModals();
  initDashboard();
});
