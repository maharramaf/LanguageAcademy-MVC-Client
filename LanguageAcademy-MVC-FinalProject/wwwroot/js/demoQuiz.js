/* Demo English placement. On-screen only. No passwords, no network calls. */
let mfQuizHistory = { visitorId: "v-session", seenIds: [], dismissedEmails: [], attempts: [] };
let mfActiveQuiz = null;
let mfQuizInvite = "";
let mfQuizEmail = "";
let mfQuizStart = false;
const MF_QUIZ_SIZE = 10;

function quizText(key, fallback) {
  if (typeof window.mfT === "function") return window.mfT(key, fallback || key);
  return fallback || key;
}

function quizLang() {
  const lang = document.documentElement.lang || "az";
  return lang === "ru" || lang === "en" ? lang : "az";
}

function quizPhrase(entry) {
  if (!entry) return "";
  if (typeof entry === "string") return entry;
  return entry[quizLang()] || entry.en || "";
}

function getOrCreateVisitorId() {
  return mfQuizHistory.visitorId;
}

function getQuizHistory() {
  return mfQuizHistory;
}

function saveQuizHistory(history) {
  mfQuizHistory = history;
}

function shuffleList(list) {
  const copy = list.slice();
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    const item = copy[index];
    copy[index] = copy[swap];
    copy[swap] = item;
  }
  return copy;
}

function questionById(id) {
  return (window.MF_DEMO_QUESTIONS || []).find(function (item) { return item.id === id; }) || null;
}

function getRandomQuestions(count) {
  const bank = window.MF_DEMO_QUESTIONS || [];
  const history = getQuizHistory();
  const seen = {};
  history.seenIds.forEach(function (id) { seen[id] = true; });
  let pool = bank.filter(function (item) { return !seen[item.id]; });
  if (pool.length < count) {
    history.seenIds = [];
    saveQuizHistory(history);
    pool = bank.slice();
  }
  const picked = [];
  ["A1", "A2", "B1", "B2", "C1"].forEach(function (level) {
    shuffleList(pool.filter(function (item) {
      return item.level === level && picked.indexOf(item) === -1;
    })).slice(0, 2).forEach(function (item) { picked.push(item); });
  });
  shuffleList(pool.filter(function (item) { return picked.indexOf(item) === -1; })).forEach(function (item) {
    if (picked.length < count) picked.push(item);
  });
  return shuffleList(picked).slice(0, count).map(function (item) {
    return { id: item.id, order: shuffleList([0, 1, 2, 3]) };
  });
}

function readActiveQuiz() {
  return mfActiveQuiz;
}

function writeActiveQuiz(quiz) {
  mfActiveQuiz = quiz || null;
}

function startAssessment(email) {
  const selection = getRandomQuestions(MF_QUIZ_SIZE);
  const history = getQuizHistory();
  selection.forEach(function (item) {
    if (history.seenIds.indexOf(item.id) === -1) history.seenIds.push(item.id);
  });
  saveQuizHistory(history);
  const quiz = {
    attemptId: "a-" + Date.now().toString(36),
    visitorId: getOrCreateVisitorId(),
    email: email || "",
    questions: selection,
    answers: {},
    index: 0,
    result: null
  };
  writeActiveQuiz(quiz);
  renderQuestion();
}

function currentQuiz() {
  return readActiveQuiz();
}

function selectedOriginal(quiz, item) {
  const choice = quiz.answers[String(item.id)];
  if (choice == null) return null;
  return item.order[choice];
}

function renderQuestion() {
  const root = document.querySelector("[data-assessment]");
  if (!root) return;
  const quiz = currentQuiz();
  if (!quiz) {
    startAssessment(mfQuizEmail);
    return;
  }
  if (quiz.result) {
    renderAssessmentResult();
    return;
  }
  const item = quiz.questions[quiz.index];
  const source = questionById(item.id);
  if (!source) return;
  const total = quiz.questions.length;
  const current = quiz.index + 1;
  const progress = quizText("quiz_progress", "Question {current} of {total}")
    .replace("{current}", String(current))
    .replace("{total}", String(total));
  const selected = quiz.answers[String(item.id)];
  const options = item.order.map(function (originalIndex, optionIndex) {
    const checked = selected === optionIndex ? " checked" : "";
    return (
      '<label class="quiz-option">' +
        '<input type="radio" name="quiz-answer" value="' + optionIndex + '"' + checked + '>' +
        '<span>' + quizPhrase(source.options[originalIndex]) + '</span>' +
      '</label>'
    );
  }).join("");
  const last = quiz.index === total - 1;
  root.innerHTML =
    '<div class="quiz-card">' +
      '<p class="eyebrow">' + quizText("quiz_title", "English level assessment") + '</p>' +
      '<div class="quiz-progress"><span>' + progress + '</span><div class="progress" aria-hidden="true"><span style="width:' + Math.round((current / total) * 100) + '%"></span></div></div>' +
      '<h1 class="quiz-question">' + quizPhrase(source.question) + '</h1>' +
      '<div class="quiz-options">' + options + '</div>' +
      '<p class="field-error" data-quiz-error></p>' +
      '<div class="quiz-nav">' +
        '<button class="btn btn-outline" type="button" data-quiz-prev' + (quiz.index === 0 ? " disabled" : "") + '>' + quizText("quiz_previous", "Previous") + '</button>' +
        (last
          ? '<button class="btn btn-primary" type="button" data-quiz-submit>' + quizText("quiz_submit", "Submit") + '</button>'
          : '<button class="btn btn-primary" type="button" data-quiz-next>' + quizText("quiz_next", "Next") + '</button>') +
      '</div>' +
    '</div>';
}

function selectAnswer(index) {
  const quiz = currentQuiz();
  if (!quiz || quiz.result) return;
  const item = quiz.questions[quiz.index];
  quiz.answers[String(item.id)] = index;
  writeActiveQuiz(quiz);
}

function rememberChoiceFromDom() {
  const chosen = document.querySelector('input[name="quiz-answer"]:checked');
  if (!chosen) return false;
  selectAnswer(Number(chosen.value));
  return true;
}

function nextQuestion() {
  if (!rememberChoiceFromDom()) {
    const error = document.querySelector("[data-quiz-error]");
    if (error) error.textContent = quizText("quiz_choose", "Choose an answer to continue.");
    return;
  }
  const quiz = currentQuiz();
  if (!quiz) return;
  if (quiz.index < quiz.questions.length - 1) quiz.index += 1;
  writeActiveQuiz(quiz);
  renderQuestion();
}

function previousQuestion() {
  const quiz = currentQuiz();
  if (!quiz || quiz.index === 0) return;
  rememberChoiceFromDom();
  quiz.index -= 1;
  writeActiveQuiz(quiz);
  renderQuestion();
}

function calculateAssessmentLevel(score) {
  if (score <= 2) return "A1";
  if (score <= 4) return "A2";
  if (score <= 6) return "B1";
  if (score <= 8) return "B2";
  return "C1";
}

function submitAssessment() {
  if (!rememberChoiceFromDom()) {
    const error = document.querySelector("[data-quiz-error]");
    if (error) error.textContent = quizText("quiz_choose", "Choose an answer to continue.");
    return;
  }
  const quiz = currentQuiz();
  if (!quiz || quiz.result) return;
  let score = 0;
  quiz.questions.forEach(function (item) {
    const source = questionById(item.id);
    if (source && selectedOriginal(quiz, item) === source.correctAnswer) score += 1;
  });
  const level = calculateAssessmentLevel(score);
  quiz.result = {
    score: score,
    totalQuestions: quiz.questions.length,
    estimatedLevel: level,
    completedAt: new Date().toISOString()
  };
  writeActiveQuiz(quiz);
  const history = getQuizHistory();
  history.attempts.push({
    attemptId: quiz.attemptId,
    visitorId: quiz.visitorId,
    email: quiz.email || "",
    questionIds: quiz.questions.map(function (item) { return item.id; }),
    score: score,
    totalQuestions: quiz.questions.length,
    estimatedLevel: level,
    completedAt: quiz.result.completedAt
  });
  saveQuizHistory(history);
  renderAssessmentResult();
}

function recommendedCourseEntries(level) {
  const catalog = window.courses || {};
  const bands = {
    A1: ["Beginner"],
    A2: ["Beginner"],
    B1: ["Intermediate"],
    B2: ["Upper intermediate", "Intermediate"],
    C1: ["Upper intermediate"]
  };
  const accepted = bands[level] || [];
  return Object.keys(catalog).filter(function (key) {
    const course = catalog[key];
    const title = (course.title || "").toLowerCase();
    const english = title.indexOf("english") !== -1 || title.indexOf("ielts") !== -1;
    return english && accepted.indexOf(course.level) !== -1;
  }).map(function (key) { return { key: key, course: catalog[key] }; });
}

function renderRecommendedCourses(level) {
  const entries = recommendedCourseEntries(level);
  if (!entries.length) return '<p>' + quizText("quiz_no_courses", "No matching course is available for this level yet.") + '</p>';
  return '<div class="course-grid quiz-courses">' + entries.map(function (entry) {
    const title = typeof window.mfText === "function" ? window.mfText(entry.course.title) : entry.course.title;
    const summary = typeof window.mfText === "function" ? window.mfText(entry.course.summary) : entry.course.summary;
    const price = entry.course.access === "premium"
      ? (typeof window.formatPrice === "function" ? window.formatPrice(entry.course.price) : "")
      : (typeof window.mfT === "function" ? window.mfT("plan_free_price", "Free") : "Free");
    return (
      '<a class="course-card" href="course-details.html?course=' + entry.key + '">' +
        '<div class="course-media"><img src="' + entry.course.image + '" alt=""></div>' +
        '<div class="course-body"><h3>' + title + '</h3><p>' + summary + '</p><strong class="price">' + price + '</strong></div>' +
      '</a>'
    );
  }).join("") + '</div>';
}

function renderAssessmentResult() {
  const root = document.querySelector("[data-assessment]");
  const quiz = currentQuiz();
  if (!root || !quiz || !quiz.result) return;
  const level = quiz.result.estimatedLevel;
  root.innerHTML =
    '<div class="quiz-card quiz-result">' +
      '<p class="eyebrow">' + quizText("quiz_title", "English level assessment") + '</p>' +
      '<h1>' + quizText("quiz_result_title", "Your assessment result") + '</h1>' +
      '<p class="quiz-score"><span>' + quizText("quiz_score_label", "Score") + '</span><strong>' + quiz.result.score + ' / ' + quiz.result.totalQuestions + '</strong></p>' +
      '<p class="quiz-level"><span>' + quizText("quiz_level_label", "Estimated level") + '</span><strong>' + quizText("quiz_level_" + level.toLowerCase(), level) + '</strong></p>' +
      '<p class="quiz-note">' + quizText("quiz_demo_note", "This is an approximate demo placement result.") + '</p>' +
      '<h2>' + quizText("quiz_recommend", "Recommended courses") + '</h2>' +
      renderRecommendedCourses(level) +
    '</div>';
}

function removeAssessmentToast() {
  document.querySelector("[data-quiz-toast]")?.remove();
}

function renderAssessmentToast() {
  if (document.querySelector("[data-quiz-toast]")) return;
  const email = mfQuizInvite;
  if (!email) return;
  const history = getQuizHistory();
  if (history.dismissedEmails.indexOf(email) !== -1) return;
  const toast = document.createElement("div");
  toast.className = "assess-toast";
  toast.setAttribute("data-quiz-toast", "");
  toast.setAttribute("role", "status");
  toast.innerHTML =
    '<div>' +
      '<strong>' + quizText("quiz_notify_title", "Registration successful!") + '</strong>' +
      '<p>' + quizText("quiz_notify_text", "Take a free English level assessment and discover your approximate level.") + '</p>' +
    '</div>' +
    '<div class="assess-toast-actions">' +
      '<a class="btn btn-primary btn-sm" href="assessment.html" data-quiz-start>' + quizText("quiz_notify_btn", "Take Assessment") + '</a>' +
      '<button class="btn btn-outline btn-sm" type="button" data-quiz-dismiss>' + quizText("quiz_close", "Close") + '</button>' +
    '</div>';
  document.body.appendChild(toast);
}

function showAssessmentNotification(email) {
  const key = (email || "").trim().toLowerCase();
  if (!key) return;
  const history = getQuizHistory();
  if (history.dismissedEmails.indexOf(key) !== -1) return;
  mfQuizInvite = key;
  mfQuizEmail = key;
  removeAssessmentToast();
  renderAssessmentToast();
}

function dismissAssessmentInvite() {
  const email = mfQuizInvite;
  if (email) {
    const history = getQuizHistory();
    if (history.dismissedEmails.indexOf(email) === -1) history.dismissedEmails.push(email);
    saveQuizHistory(history);
  }
  mfQuizInvite = "";
  removeAssessmentToast();
}

function initDemoAssessment() {
  const root = document.querySelector("[data-assessment]");
  const shouldStart = mfQuizStart;
  if (root && shouldStart) {
    mfQuizStart = false;
    startAssessment(mfQuizEmail);
  } else if (root) {
    renderQuestion();
  }
  renderAssessmentToast();
  if (initDemoAssessment.bound) return;
  initDemoAssessment.bound = true;
  document.addEventListener("click", function (event) {
    if (event.target.closest("[data-quiz-dismiss]")) {
      event.preventDefault();
      dismissAssessmentInvite();
      return;
    }
    if (event.target.closest("[data-quiz-start]")) {
      mfQuizStart = true;
      mfQuizInvite = "";
      removeAssessmentToast();
      return;
    }
    if (event.target.closest("[data-quiz-next]")) {
      event.preventDefault();
      nextQuestion();
      return;
    }
    if (event.target.closest("[data-quiz-prev]")) {
      event.preventDefault();
      previousQuestion();
      return;
    }
    if (event.target.closest("[data-quiz-submit]")) {
      event.preventDefault();
      submitAssessment();
    }
  });
  document.addEventListener("change", function (event) {
    const input = event.target.closest('input[name="quiz-answer"]');
    if (!input) return;
    selectAnswer(Number(input.value));
  });
  document.addEventListener("mf-language", function () {
    if (document.querySelector("[data-assessment]")) {
      const quiz = currentQuiz();
      if (quiz && quiz.result) renderAssessmentResult();
      else if (quiz) renderQuestion();
    }
    if (mfQuizInvite) {
      removeAssessmentToast();
      renderAssessmentToast();
    }
  });
}

window.getOrCreateVisitorId = getOrCreateVisitorId;
window.getQuizHistory = getQuizHistory;
window.saveQuizHistory = saveQuizHistory;
window.getRandomQuestions = getRandomQuestions;
window.startAssessment = startAssessment;
window.renderQuestion = renderQuestion;
window.selectAnswer = selectAnswer;
window.nextQuestion = nextQuestion;
window.previousQuestion = previousQuestion;
window.submitAssessment = submitAssessment;
window.calculateAssessmentLevel = calculateAssessmentLevel;
window.renderAssessmentResult = renderAssessmentResult;
window.renderRecommendedCourses = renderRecommendedCourses;
window.showAssessmentNotification = showAssessmentNotification;
window.initDemoAssessment = initDemoAssessment;

document.addEventListener("DOMContentLoaded", function () {
  initDemoAssessment();
});
