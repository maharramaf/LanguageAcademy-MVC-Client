/* Instructor course and quiz builder. UI template only. No roles or network calls. */
function studioText(key, fallback) {
  if (typeof window.mfT === "function") return window.mfT(key, fallback || key);
  return fallback || key;
}

function blankStudio() {
  return {
    title: "",
    description: "",
    level: "A1",
    language: "English",
    type: "standard",
    price: "59",
    status: "draft",
    preview: true,
    modules: [
      { id: "m1", title: "Module 1", lessons: [
        { id: "s1", title: "Welcome", kind: "text", body: "", video: "", file: "", quiz: [] }
      ] }
    ]
  };
}

let studioCourse = blankStudio();
let studioQuizLesson = null;

function renderStudio() {
  const root = document.querySelector("[data-studio]");
  if (!root) return;
  const modules = studioCourse.modules.map(function (module, moduleIndex) {
    const lessons = module.lessons.map(function (lesson, lessonIndex) {
      return '<li class="studio-lesson" draggable="true" data-studio-drag="' + module.id + ':' + lesson.id + '">' +
        '<input data-studio-lesson="' + module.id + ':' + lesson.id + '" value="' + lesson.title.replace(/"/g, "&quot;") + '">' +
        '<select data-studio-kind="' + module.id + ':' + lesson.id + '">' +
          ["text", "video", "file", "quiz"].map(function (kind) {
            return '<option value="' + kind + '"' + (lesson.kind === kind ? " selected" : "") + '>' + studioText("learn_kind_" + kind, kind) + '</option>';
          }).join("") +
        '</select>' +
        '<button type="button" data-studio-up="' + moduleIndex + ':' + lessonIndex + '" aria-label="Up">↑</button>' +
        '<button type="button" data-studio-down="' + moduleIndex + ':' + lessonIndex + '" aria-label="Down">↓</button>' +
        '<button type="button" data-studio-quiz="' + module.id + ':' + lesson.id + '">' + studioText("studio_quiz", "Quiz") + '</button>' +
        '<button type="button" data-studio-remove="' + module.id + ':' + lesson.id + '">' + studioText("studio_remove", "Remove") + '</button>' +
      '</li>';
    }).join("");
    return '<section class="pay-block"><h2>' + studioText("studio_module", "Module") + ' ' + (moduleIndex + 1) + '</h2>' +
      '<div class="field"><label>' + studioText("studio_module_title", "Module title") + '</label><input data-studio-module="' + module.id + '" value="' + module.title.replace(/"/g, "&quot;") + '"></div>' +
      '<ul class="studio-lessons">' + lessons + '</ul>' +
      '<button class="btn btn-outline btn-sm" type="button" data-studio-add-lesson="' + module.id + '">' + studioText("studio_add_lesson", "Add lesson") + '</button>' +
      '<button class="btn btn-outline btn-sm" type="button" data-studio-remove-module="' + module.id + '">' + studioText("studio_remove", "Remove") + '</button>' +
    '</section>';
  }).join("");
  root.innerHTML =
    '<header class="checkout-head"><h1>' + studioText("studio_title", "Course studio") + '</h1><p>' + studioText("studio_lead", "Build a course outline in the browser. Nothing is saved on a server.") + '</p><p class="form-note" data-studio-plan></p><div data-studio-limit hidden></div></header>' +
    '<div class="checkout-grid"><form class="checkout-form" data-studio-form>' +
      '<section class="pay-block"><h2>' + studioText("studio_details", "Course details") + '</h2>' +
        '<div class="field"><label>' + studioText("studio_course_title", "Course title") + '</label><input name="title" value="' + studioCourse.title.replace(/"/g, "&quot;") + '"></div>' +
        '<div class="field"><label>' + studioText("studio_description", "Description") + '</label><textarea name="description">' + studioCourse.description + '</textarea></div>' +
        '<div class="form-row">' +
          '<div class="field"><label>' + studioText("label_level", "Level") + '</label><input name="level" value="' + studioCourse.level + '"></div>' +
          '<div class="field"><label>' + studioText("label_language", "Language") + '</label><input name="language" value="' + studioCourse.language + '"></div>' +
          '<div class="field"><label>' + studioText("course_type", "Course type") + '</label><select name="type"><option value="demo">' + studioText("course_type_demo", "Demo") + '</option><option value="standard">' + studioText("course_type_standard", "Standard") + '</option><option value="premium">' + studioText("course_type_premium", "Premium") + '</option></select></div>' +
          '<div class="field"><label>' + studioText("label_price", "Price") + ' (₼)</label><input name="price" inputmode="decimal" value="' + studioCourse.price + '"><p class="field-error" data-studio-price-note hidden></p></div>' +
        '</div>' +
        '<div class="form-row"><div class="field"><label>' + studioText("course_status", "Status") + '</label><select name="status"><option value="draft">' + studioText("course_draft", "Draft") + '</option><option value="published">' + studioText("course_published", "Published") + '</option></select></div>' +
        '<div class="field"><label>' + studioText("course_preview", "Preview") + '</label><select name="preview"><option value="on">' + studioText("course_preview_on", "Enabled") + '</option><option value="off">' + studioText("course_preview_off", "Disabled") + '</option></select></div></div>' +
        '<div class="field"><label>' + studioText("studio_thumb", "Thumbnail") + '</label><input name="thumb" type="file" accept="image/*"></div>' +
      '</section>' +
      modules +
      '<button class="btn btn-outline" type="button" data-studio-add-module>' + studioText("studio_add_module", "Add module") + '</button>' +
      '<p class="form-note">' + studioText("studio_saved", "Outline updated in this preview only.") + '</p>' +
    '</form><aside class="panel" data-studio-preview></aside></div>';
  const typeField = root.querySelector('[name="type"]');
  const statusField = root.querySelector('[name="status"]');
  const previewField = root.querySelector('[name="preview"]');
  if (typeField) typeField.value = studioCourse.type || "standard";
  if (statusField) statusField.value = studioCourse.status || "draft";
  if (previewField) previewField.value = studioCourse.preview === false ? "off" : "on";
  renderStudioPreview();
  if (typeof window.initTeacherPlan === "function") window.initTeacherPlan();
}

function renderStudioPreview() {
  const box = document.querySelector("[data-studio-preview]");
  if (!box) return;
  if (!studioQuizLesson) {
    box.innerHTML = '<h2>' + studioText("studio_preview", "Preview") + '</h2><p>' + (studioCourse.title || studioText("studio_course_title", "Course title")) + '</p><p>' + studioText("course_type_" + (studioCourse.type || "standard"), studioCourse.type || "standard") + '</p><p>' + (studioCourse.type === "demo" ? studioText("plan_free_price", "Free") : "₼" + (studioCourse.price || "0")) + '</p>';
    return;
  }
  const questions = studioQuizLesson.quiz.map(function (item, index) {
    return '<div class="learn-q"><strong>' + (index + 1) + '. ' + item.text + '</strong><p>' + item.options.join(" · ") + '</p><button type="button" data-studio-delete-q="' + index + '">' + studioText("studio_remove", "Remove") + '</button></div>';
  }).join("");
  box.innerHTML =
    '<h2>' + studioText("studio_quiz", "Quiz") + '</h2>' +
    '<p>' + studioQuizLesson.title + '</p>' +
    questions +
    '<form data-studio-question><div class="field"><label>' + studioText("studio_question", "Question") + '</label><input name="text"></div>' +
    '<div class="field"><label>' + studioText("studio_answers", "Answers, separated by |") + '</label><input name="options" placeholder="am | is | are | be"></div>' +
    '<div class="field"><label>' + studioText("studio_correct", "Correct answer number") + '</label><input name="correct" value="1"></div>' +
    '<button class="btn btn-primary btn-sm" type="submit">' + studioText("studio_add_question", "Add question") + '</button></form>';
}

function findLesson(key) {
  const parts = key.split(":");
  const module = studioCourse.modules.find(function (item) { return item.id === parts[0]; });
  if (!module) return null;
  return module.lessons.find(function (item) { return item.id === parts[1]; }) || null;
}

function readStudioFields() {
  const form = document.querySelector("[data-studio-form]");
  if (!form) return;
  studioCourse.title = form.querySelector('[name="title"]').value;
  studioCourse.description = form.querySelector('[name="description"]').value;
  studioCourse.level = form.querySelector('[name="level"]').value;
  studioCourse.language = form.querySelector('[name="language"]').value;
  studioCourse.type = form.querySelector('[name="type"]').value || "standard";
  studioCourse.status = form.querySelector('[name="status"]').value || "draft";
  studioCourse.preview = form.querySelector('[name="preview"]').value !== "off";
  const rawPrice = String(form.querySelector('[name="price"]').value || "").trim().replace(",", ".");
  const amount = Number(rawPrice);
  const priceNote = form.querySelector("[data-studio-price-note]");
  if (studioCourse.type === "demo") {
    studioCourse.price = "0";
    if (priceNote) priceNote.hidden = true;
  } else if (!rawPrice || !Number.isFinite(amount) || amount <= 0) {
    studioCourse.price = "";
    if (priceNote) {
      priceNote.hidden = false;
      priceNote.textContent = studioText("course_price_required", "Standard and Premium prices must be a number.");
    }
  } else {
    studioCourse.price = String(amount);
    if (priceNote) priceNote.hidden = true;
  }
  form.querySelectorAll("[data-studio-module]").forEach(function (input) {
    const module = studioCourse.modules.find(function (item) { return item.id === input.getAttribute("data-studio-module"); });
    if (module) module.title = input.value;
  });
  form.querySelectorAll("[data-studio-lesson]").forEach(function (input) {
    const lesson = findLesson(input.getAttribute("data-studio-lesson"));
    if (lesson) lesson.title = input.value;
  });
}

function initStudio() {
  const root = document.querySelector("[data-studio]");
  if (!root) return;
  if (root.dataset.studioBound !== "1") {
    root.dataset.studioBound = "1";
    root.addEventListener("click", function (event) {
      readStudioFields();
      const addModule = event.target.closest("[data-studio-add-module]");
      const addLesson = event.target.closest("[data-studio-add-lesson]");
      const removeModule = event.target.closest("[data-studio-remove-module]");
      const removeLesson = event.target.closest("[data-studio-remove]");
      const up = event.target.closest("[data-studio-up]");
      const down = event.target.closest("[data-studio-down]");
      const quiz = event.target.closest("[data-studio-quiz]");
      const deleteQ = event.target.closest("[data-studio-delete-q]");
      if (addModule) studioCourse.modules.push({ id: "m" + Date.now(), title: studioText("studio_module", "Module"), lessons: [] });
      if (addLesson) {
        const module = studioCourse.modules.find(function (item) { return item.id === addLesson.getAttribute("data-studio-add-lesson"); });
        const lessonCount = studioCourse.modules.reduce(function (sum, item) { return sum + item.lessons.length; }, 0);
        if (typeof window.mfTeacherCanAddLesson === "function" && !window.mfTeacherCanAddLesson(lessonCount)) {
          const limit = document.querySelector("[data-studio-limit]");
          if (limit) {
            limit.hidden = false;
            limit.innerHTML = '<p class="plan-lock"><i class="bi bi-lock" aria-hidden="true"></i> ' + studioText("tp_limit_reached", "You've reached your Free Teacher limit.") + '</p>' +
              '<p><a class="btn btn-outline btn-sm" href="checkout.html?plan=teacher-standard">' + studioText("tp_upgrade_standard", "Upgrade to Standard") + '</a> ' +
              '<a class="btn btn-outline btn-sm" href="checkout.html?plan=teacher-premium">' + studioText("tp_upgrade_premium", "Upgrade to Premium") + '</a></p>';
          }
          return;
        }
        if (module) module.lessons.push({ id: "s" + Date.now(), title: studioText("studio_lesson", "Lesson"), kind: "text", quiz: [] });
      }
      if (removeModule) studioCourse.modules = studioCourse.modules.filter(function (item) { return item.id !== removeModule.getAttribute("data-studio-remove-module"); });
      if (removeLesson) {
        const key = removeLesson.getAttribute("data-studio-remove").split(":");
        const module = studioCourse.modules.find(function (item) { return item.id === key[0]; });
        if (module) module.lessons = module.lessons.filter(function (item) { return item.id !== key[1]; });
      }
      if (up || down) {
        const raw = (up || down).getAttribute(up ? "data-studio-up" : "data-studio-down").split(":");
        const module = studioCourse.modules[Number(raw[0])];
        const index = Number(raw[1]);
        const next = up ? index - 1 : index + 1;
        if (module && module.lessons[next]) {
          const item = module.lessons[index];
          module.lessons[index] = module.lessons[next];
          module.lessons[next] = item;
        }
      }
      if (quiz) {
        studioQuizLesson = findLesson(quiz.getAttribute("data-studio-quiz"));
        if (studioQuizLesson) studioQuizLesson.kind = "quiz";
      }
      if (deleteQ && studioQuizLesson) studioQuizLesson.quiz.splice(Number(deleteQ.getAttribute("data-studio-delete-q")), 1);
      if (addModule || addLesson || removeModule || removeLesson || up || down || quiz || deleteQ) renderStudio();
    });
    root.addEventListener("change", function (event) {
      const kind = event.target.closest("[data-studio-kind]");
      if (!kind) return;
      const lesson = findLesson(kind.getAttribute("data-studio-kind"));
      if (lesson) lesson.kind = kind.value;
    });
    root.addEventListener("submit", function (event) {
      const form = event.target.closest("[data-studio-question]");
      if (!form || !studioQuizLesson) return;
      event.preventDefault();
      const text = form.querySelector('[name="text"]').value.trim();
      const options = form.querySelector('[name="options"]').value.split("|").map(function (item) { return item.trim(); }).filter(Boolean);
      const correct = Number(form.querySelector('[name="correct"]').value) || 1;
      if (!text || options.length < 2) return;
      studioQuizLesson.quiz.push({ text: text, options: options, correct: correct });
      renderStudio();
    });
    root.addEventListener("dragstart", function (event) {
      const row = event.target.closest("[data-studio-drag]");
      if (!row) return;
      event.dataTransfer.setData("text/plain", row.getAttribute("data-studio-drag"));
    });
    root.addEventListener("dragover", function (event) {
      if (event.target.closest("[data-studio-drag]")) event.preventDefault();
    });
    root.addEventListener("drop", function (event) {
      const target = event.target.closest("[data-studio-drag]");
      if (!target) return;
      event.preventDefault();
      const from = event.dataTransfer.getData("text/plain").split(":");
      const to = target.getAttribute("data-studio-drag").split(":");
      const sourceModule = studioCourse.modules.find(function (item) { return item.id === from[0]; });
      const targetModule = studioCourse.modules.find(function (item) { return item.id === to[0]; });
      if (!sourceModule || !targetModule) return;
      const index = sourceModule.lessons.findIndex(function (item) { return item.id === from[1]; });
      if (index < 0) return;
      const [lesson] = sourceModule.lessons.splice(index, 1);
      const targetIndex = targetModule.lessons.findIndex(function (item) { return item.id === to[1]; });
      targetModule.lessons.splice(targetIndex < 0 ? targetModule.lessons.length : targetIndex, 0, lesson);
      renderStudio();
    });
  }
  renderStudio();
}

window.initStudio = initStudio;
document.addEventListener("DOMContentLoaded", initStudio);
document.addEventListener("mf-language", function () {
  if (document.querySelector("[data-studio]")) renderStudio();
});
