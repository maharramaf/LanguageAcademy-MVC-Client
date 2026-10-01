/* Student lesson, quiz, homework, mock video, notes, bookmarks, progress. Frontend demo only. */
let mfLearnState = { done: {}, current: "l1", score: null };
const MF_LEARN_LESSONS = [
  { id: "l1", moduleKey: "learn_m1", titleKey: "learn_l1", kind: "text" },
  { id: "l5", moduleKey: "learn_m1", titleKey: "learn_l5", kind: "text" },
  { id: "l2", moduleKey: "learn_m1", titleKey: "learn_l2", kind: "video", duration: 4800 },
  { id: "l6", moduleKey: "learn_m2", titleKey: "learn_l6", kind: "homework" },
  { id: "l3", moduleKey: "learn_m2", titleKey: "learn_l3", kind: "quiz" },
  { id: "l4", moduleKey: "learn_m2", titleKey: "learn_l4", kind: "text" }
];
const MF_VIDEO_KEY = "mf-video-progress";
const MF_NOTES_KEY = "mf-video-notes";
const MF_BOOKMARKS_KEY = "mf-video-bookmarks";
let mfVideoTimer = null;
let mfVideoPlaying = false;

function learnText(key, fallback) {
  if (typeof window.mfT === "function") return window.mfT(key, fallback || key);
  return fallback || key;
}

function learnState() {
  return mfLearnState;
}

function openedForGrades() {
  const hash = window.location.hash || "";
  return hash === "#grades" || hash.slice(-7) === "#grades";
}

function saveLearnState(state) {
  mfLearnState = state;
}

function learnProgress(state) {
  const done = MF_LEARN_LESSONS.filter(function (lesson) { return state.done[lesson.id]; }).length;
  return Math.round((done / MF_LEARN_LESSONS.length) * 100);
}

function readStore(key, fallback) {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || "");
    return saved || fallback;
  } catch (error) { return fallback; }
}

function writeStore(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (error) { /* ignore */ }
}

function formatTime(total) {
  const sec = Math.max(0, Math.floor(Number(total) || 0));
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
  return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
}

function videoProgress(lessonId) {
  const all = readStore(MF_VIDEO_KEY, {});
  return Number(all[lessonId] || 0);
}

function saveVideoProgress(lessonId, seconds) {
  const all = readStore(MF_VIDEO_KEY, {});
  all[lessonId] = Math.max(0, Math.floor(seconds));
  writeStore(MF_VIDEO_KEY, all);
}

function lessonNotes(lessonId) {
  const all = readStore(MF_NOTES_KEY, {});
  return Array.isArray(all[lessonId]) ? all[lessonId] : [];
}

function saveLessonNotes(lessonId, notes) {
  const all = readStore(MF_NOTES_KEY, {});
  all[lessonId] = notes;
  writeStore(MF_NOTES_KEY, all);
}

function lessonBookmarks(lessonId) {
  const all = readStore(MF_BOOKMARKS_KEY, {});
  return Array.isArray(all[lessonId]) ? all[lessonId] : [];
}

function saveLessonBookmarks(lessonId, marks) {
  const all = readStore(MF_BOOKMARKS_KEY, {});
  all[lessonId] = marks;
  writeStore(MF_BOOKMARKS_KEY, all);
}

function stopVideoTimer() {
  if (mfVideoTimer) window.clearInterval(mfVideoTimer);
  mfVideoTimer = null;
  mfVideoPlaying = false;
}

function currentVideoSeconds() {
  const bar = document.querySelector("[data-video-seek]");
  return bar ? Number(bar.value || 0) : 0;
}

function setVideoSeconds(seconds, duration) {
  const value = Math.max(0, Math.min(duration, Math.floor(seconds)));
  const seek = document.querySelector("[data-video-seek]");
  const current = document.querySelector("[data-video-current]");
  const fill = document.querySelector("[data-video-fill]");
  if (seek) seek.value = String(value);
  if (current) current.textContent = formatTime(value);
  if (fill) fill.style.width = Math.round(value * 100 / Math.max(1, duration)) + "%";
  const lesson = MF_LEARN_LESSONS.find(function (item) { return item.id === learnState().current; });
  if (lesson && lesson.kind === "video") saveVideoProgress(lesson.id, value);
}

function startVideoTimer(duration) {
  stopVideoTimer();
  mfVideoPlaying = true;
  const playBtn = document.querySelector("[data-video-play]");
  if (playBtn) playBtn.innerHTML = '<i class="bi bi-pause-fill" aria-hidden="true"></i>';
  mfVideoTimer = window.setInterval(function () {
    let next = currentVideoSeconds() + 1;
    if (next >= duration) {
      next = duration;
      stopVideoTimer();
      if (playBtn) playBtn.innerHTML = '<i class="bi bi-play-fill" aria-hidden="true"></i>';
    }
    setVideoSeconds(next, duration);
  }, 1000);
}

function renderVideoPlayer(lesson) {
  const duration = lesson.duration || 4800;
  const resume = videoProgress(lesson.id);
  const notes = lessonNotes(lesson.id);
  const marks = lessonBookmarks(lesson.id);
  const noteList = notes.length
    ? notes.map(function (note) {
      return '<li class="video-note-item' + (note.important ? " is-important" : "") + '">' +
        '<button type="button" class="video-note-jump" data-video-jump="' + note.timestamp + '">' + formatTime(note.timestamp) + '</button>' +
        '<div><p data-note-text="' + note.id + '">' + note.text.replace(/</g, "&lt;") + '</p>' +
        '<div class="video-note-actions">' +
          '<button type="button" data-note-important="' + note.id + '">' + (note.important ? "★" : "☆") + '</button>' +
          '<button type="button" data-note-edit="' + note.id + '">' + learnText("video_edit_note", "Edit") + '</button>' +
          '<button type="button" data-note-delete="' + note.id + '">' + learnText("video_delete_note", "Delete") + '</button>' +
        '</div></div></li>';
    }).join("")
    : '<li class="form-note">' + learnText("video_notes_empty", "No notes yet. Pause and add a timestamp note.") + '</li>';
  const markList = marks.length
    ? marks.map(function (mark) {
      return '<button type="button" class="video-bookmark" data-video-jump="' + mark.timestamp + '">📌 ' + formatTime(mark.timestamp) + '</button>' +
        '<button type="button" class="btn btn-outline btn-sm" data-bookmark-remove="' + mark.id + '" aria-label="' + learnText("video_remove_bookmark", "Remove bookmark") + '">&times;</button>';
    }).join(" ")
    : '<p class="form-note">' + learnText("video_bookmarks_empty", "No bookmarks yet.") + '</p>';
  return '<div class="video-learn" data-video-lesson="' + lesson.id + '" data-video-duration="' + duration + '">' +
    '<div class="video-stage">' +
      '<div class="video-screen" aria-hidden="true"><i class="bi bi-play-circle"></i><p>' + learnText("learn_video_note", "Video preview. A real player will use a lesson URL from the server.") + '</p><p>' + learnText("video_duration_label", "Duration") + ': 1h 20m</p></div>' +
      '<div class="video-controls">' +
        '<button type="button" class="icon-btn video-btn" data-video-play aria-label="' + learnText("video_play", "Play") + '"><i class="bi bi-play-fill" aria-hidden="true"></i></button>' +
        '<div class="video-track"><span data-video-fill style="width:' + Math.round(resume * 100 / duration) + '%"></span>' +
          '<input data-video-seek type="range" min="0" max="' + duration + '" value="' + resume + '" aria-label="' + learnText("video_seek", "Seek") + '">' +
        '</div>' +
        '<span class="video-time"><span data-video-current>' + formatTime(resume) + '</span> / ' + formatTime(duration) + '</span>' +
        '<button type="button" class="icon-btn video-btn" data-video-mute aria-label="' + learnText("video_volume", "Volume") + '"><i class="bi bi-volume-up" aria-hidden="true"></i></button>' +
        '<button type="button" class="icon-btn video-btn" data-video-full aria-label="' + learnText("video_fullscreen", "Fullscreen") + '"><i class="bi bi-arrows-fullscreen" aria-hidden="true"></i></button>' +
      '</div>' +
      (resume > 0 ? '<p class="form-note">' + learnText("video_resume_at", "Continue from") + " " + formatTime(resume) + '</p>' : '') +
    '</div>' +
    '<div class="video-side">' +
      '<section class="panel"><h2>' + learnText("video_my_notes", "My Notes") + '</h2>' +
        '<form class="video-note-form" data-note-form>' +
          '<label class="field"><span>' + learnText("video_add_note", "Add Note") + ' (<span data-note-stamp>' + formatTime(resume) + '</span>)</span>' +
          '<textarea name="note" rows="2" required placeholder="' + learnText("video_note_placeholder", "Write a note for this moment…") + '"></textarea></label>' +
          '<button class="btn btn-primary btn-sm" type="submit">' + learnText("video_add_note", "Add Note") + '</button>' +
        '</form>' +
        '<ul class="video-note-list">' + noteList + '</ul></section>' +
      '<section class="panel"><h2>' + learnText("video_bookmarks", "Bookmarks") + '</h2>' +
        '<button class="btn btn-outline btn-sm" type="button" data-bookmark-add>' + learnText("video_add_bookmark", "Add Bookmark") + '</button>' +
        '<div class="video-bookmark-list">' + markList + '</div></section>' +
      '<p>' + learnText("dash_progress", "Progress") + ': <strong data-lesson-progress>' + Math.round(resume * 100 / duration) + '%</strong></p>' +
    '</div></div>';
}

function renderHomework(state) {
  if (state.done.l6) {
    return '<p class="reward-done">🎉 ' + learnText("reward_great", "Great Job!") + '</p><p>' + learnText("learn_homework_done", "Homework completed for this preview.") + '</p>';
  }
  return '<p>' + learnText("learn_homework_text", "Write five Present Perfect sentences about your week, then submit the homework.") + '</p>' +
    '<div class="field"><label>' + learnText("learn_homework_answer", "Your answer") + '</label><textarea data-homework-text rows="5"></textarea></div>' +
    '<button class="btn btn-primary" type="button" data-homework-submit>' + learnText("learn_homework_submit", "Submit homework") + '</button>';
}

function renderLearn() {
  const root = document.querySelector("[data-learn]");
  if (!root) return;
  stopVideoTimer();
  const state = learnState();
  const current = MF_LEARN_LESSONS.find(function (lesson) { return lesson.id === state.current; }) || MF_LEARN_LESSONS[0];
  const percent = learnProgress(state);
  const paid = typeof window.mfHasPaidEnrollment === "function" && window.mfHasPaidEnrollment();
  const list = MF_LEARN_LESSONS.map(function (lesson) {
    const locked = lesson.id === "l4" && !paid;
    const mark = state.done[lesson.id] ? "is-done" : (lesson.id === current.id ? "is-current" : "");
    return '<button type="button" class="learn-item ' + mark + '" data-learn-open="' + lesson.id + '"><span>' + learnText(lesson.titleKey, lesson.id) + '</span><small>' + (locked ? learnText("course_locked", "Locked lesson") : learnText("learn_kind_" + lesson.kind, lesson.kind)) + '</small></button>';
  }).join("");
  const lockedNow = current.id === "l4" && !paid;
  let body = "";
  if (lockedNow) {
    body = '<p class="plan-lock"><i class="bi bi-lock" aria-hidden="true"></i> ' + learnText("course_locked_text", "Purchase the full course to unlock this lesson.") + '</p><p><a class="btn btn-outline btn-sm" href="course-details.html?course=business-english">' + learnText("course_upgrade_standard", "Upgrade to Standard") + '</a> <a class="btn btn-outline btn-sm" href="course-details.html?course=ielts">' + learnText("course_upgrade_premium", "Upgrade to Premium") + '</a></p>';
  } else if (current.kind === "video") {
    body = renderVideoPlayer(current);
  } else if (current.kind === "quiz") {
    body = '<div data-learn-quiz></div>';
  } else if (current.kind === "homework") {
    body = renderHomework(state);
  } else {
    body = '<p>' + learnText("learn_text", "Read the lesson, then mark it complete. Progress is stored only in this browser preview.") + '</p>';
  }
  const cert = percent === 100
    ? '<a class="btn btn-primary" href="certificate.html?course=english-a2">' + learnText("cert_view", "View Certificate") + '</a>'
    : '<p class="form-note">' + learnText("learn_cert_locked", "The certificate appears when every lesson is complete.") + '</p>';
  const scoreBlock = state.score == null
    ? '<p class="grade-empty">' + learnText("grade_empty", "No quiz score yet. Open the quiz lesson and submit it.") + '</p><button class="btn btn-primary" type="button" data-learn-open="l3">' + learnText("grade_take", "Open the quiz") + '</button>'
    : '<div class="grade-stats"><div class="grade-stat"><strong>' + state.score + '/4</strong><span>' + learnText("grade_quiz", "Quiz") + '</span></div><div class="grade-stat"><strong>' + percent + '%</strong><span>' + learnText("dash_progress", "Progress") + '</span></div></div>';
  root.innerHTML =
    '<section class="panel grade-book" id="grades">' +
      '<p class="eyebrow">' + learnText("faq_quiz", "Quiz and grades") + '</p>' +
      '<h2>' + learnText("grade_title", "Grade book") + '</h2>' +
      '<p>' + learnText("grade_lead", "Quiz scores and course progress for this preview.") + '</p>' +
      '<div class="progress" aria-hidden="true"><span style="width:' + percent + '%"></span></div>' +
      scoreBlock + cert +
    '</section>' +
    '<div class="learn-layout' + (current.kind === "video" ? " is-video" : "") + '">' +
      '<aside class="panel"><h2>' + learnText("learn_outline", "Lessons") + '</h2><div class="progress" aria-hidden="true"><span style="width:' + percent + '%"></span></div><p>' + percent + '% · ' + learnText("video_course_progress", "Course progress") + '</p>' + list + '</aside>' +
      '<section class="panel" id="learn-lesson">' +
        '<p class="eyebrow">' + learnText(current.moduleKey, "") + '</p>' +
        '<h1>' + learnText(current.titleKey, "") + '</h1>' +
        body +
        '<div class="quiz-nav">' +
          '<button class="btn btn-outline" type="button" data-learn-prev>' + learnText("quiz_previous", "Previous") + '</button>' +
          '<button class="btn btn-primary" type="button" data-learn-done>' + learnText("learn_complete", "Mark complete") + '</button>' +
          '<button class="btn btn-outline" type="button" data-learn-next>' + learnText("quiz_next", "Next") + '</button>' +
        '</div>' +
      '</section>' +
    '</div>';
  if (current.kind === "quiz") renderLearnQuiz(state);
}

function renderLearnQuiz(state) {
  const box = document.querySelector("[data-learn-quiz]");
  if (!box) return;
  const questions = [
    { q: "learn_q1", options: ["am", "is", "are", "be"], answer: 1 },
    { q: "learn_q2", options: ["go", "goes", "went", "going"], answer: 2 },
    { q: "learn_q3", options: ["a", "an", "the", "—"], answer: 1 },
    { q: "learn_q4", options: ["in", "on", "at", "to"], answer: 1 }
  ];
  if (state.score != null) {
    box.innerHTML = '<p>' + learnText("quiz_result_title", "Result") + ': <strong>' + state.score + '/4</strong></p>';
    return;
  }
  box.innerHTML = questions.map(function (item, index) {
    return '<fieldset class="learn-q"><legend>' + learnText(item.q, "") + '</legend>' +
      item.options.map(function (option, optionIndex) {
        return '<label class="quiz-option"><input type="radio" name="lq' + index + '" value="' + optionIndex + '"><span>' + option + '</span></label>';
      }).join("") + '</fieldset>';
  }).join("") + '<button class="btn btn-primary" type="button" data-learn-score>' + learnText("quiz_submit", "Submit") + '</button><p class="field-error" data-learn-quiz-error></p>';
}

function showGradeBook() {
  const book = document.getElementById("grades");
  if (book) book.scrollIntoView({ block: "start" });
}

function grantIfNeeded(kind, label) {
  if (typeof window.mfGrantReward === "function") window.mfGrantReward(kind, { label: label });
}

function maybeCourseComplete(state) {
  if (learnProgress(state) === 100) {
    grantIfNeeded("course", learnText("reward_course_done", "Course completed!"));
    if (typeof mfNotifyItems !== "undefined") {
      mfNotifyItems.unshift({
        id: "course-complete-" + Date.now(),
        type: "certificate",
        titleKey: "course_complete_title",
        messageKey: "course_complete_text",
        courseKey: "English A2",
        timeKey: "time_just_now",
        href: "certificate.html?course=english-a2",
        read: false,
        extra: true
      });
      if (typeof renderNotifications === "function") renderNotifications();
    }
  }
}

function initLearn() {
  const root = document.querySelector("[data-learn]");
  if (!root) return;
  if (openedForGrades() && root.dataset.gradeOpened !== "1") {
    root.dataset.gradeOpened = "1";
    const state = learnState();
    state.current = "l3";
    saveLearnState(state);
  }
  renderLearn();
  if (openedForGrades()) showGradeBook();
  if (root.dataset.learnBound === "1") return;
  root.dataset.learnBound = "1";
  root.addEventListener("click", function (event) {
    const state = learnState();
    const open = event.target.closest("[data-learn-open]");
    if (open) {
      stopVideoTimer();
      state.current = open.getAttribute("data-learn-open");
      saveLearnState(state);
      renderLearn();
      const lesson = document.getElementById("learn-lesson");
      if (lesson) lesson.scrollIntoView({ block: "start" });
      return;
    }
    const index = MF_LEARN_LESSONS.findIndex(function (lesson) { return lesson.id === state.current; });
    if (event.target.closest("[data-learn-prev]") && index > 0) {
      stopVideoTimer();
      state.current = MF_LEARN_LESSONS[index - 1].id;
      saveLearnState(state);
      renderLearn();
      return;
    }
    if (event.target.closest("[data-learn-next]") && index < MF_LEARN_LESSONS.length - 1) {
      stopVideoTimer();
      state.current = MF_LEARN_LESSONS[index + 1].id;
      saveLearnState(state);
      renderLearn();
      return;
    }
    if (event.target.closest("[data-learn-done]")) {
      if (state.current === "l4" && !(typeof window.mfHasPaidEnrollment === "function" && window.mfHasPaidEnrollment())) return;
      const wasDone = state.done[state.current];
      state.done[state.current] = true;
      saveLearnState(state);
      if (!wasDone) {
        const lesson = MF_LEARN_LESSONS.find(function (item) { return item.id === state.current; });
        if (lesson && lesson.kind === "text") grantIfNeeded("lesson", learnText("reward_lesson_done", "Lesson completed!"));
        if (lesson && lesson.kind === "video") grantIfNeeded("lesson", learnText("reward_lesson_done", "Lesson completed!"));
        maybeCourseComplete(state);
      }
      renderLearn();
      return;
    }
    if (event.target.closest("[data-homework-submit]")) {
      const text = root.querySelector("[data-homework-text]");
      if (!text || !String(text.value || "").trim()) return;
      state.done.l6 = true;
      saveLearnState(state);
      grantIfNeeded("homework", learnText("reward_homework_done", "Homework completed!"));
      maybeCourseComplete(state);
      renderLearn();
      return;
    }
    if (event.target.closest("[data-learn-score]")) {
      const questions = [1, 2, 1, 1];
      let score = 0;
      let missing = false;
      questions.forEach(function (answer, itemIndex) {
        const chosen = root.querySelector('input[name="lq' + itemIndex + '"]:checked');
        if (!chosen) missing = true;
        else if (Number(chosen.value) === answer) score += 1;
      });
      const error = root.querySelector("[data-learn-quiz-error]");
      if (missing) {
        if (error) error.textContent = learnText("quiz_choose", "Choose an answer to continue.");
        return;
      }
      const first = state.score == null;
      state.score = score;
      state.done.l3 = true;
      saveLearnState(state);
      if (first) {
        grantIfNeeded("quiz", learnText("reward_quiz_done", "Quiz completed!"));
        maybeCourseComplete(state);
      }
      renderLearn();
      showGradeBook();
      return;
    }
    const play = event.target.closest("[data-video-play]");
    if (play) {
      const wrap = root.querySelector("[data-video-lesson]");
      const duration = Number(wrap && wrap.getAttribute("data-video-duration") || 4800);
      if (mfVideoPlaying) {
        stopVideoTimer();
        play.innerHTML = '<i class="bi bi-play-fill" aria-hidden="true"></i>';
      } else {
        startVideoTimer(duration);
      }
      return;
    }
    const jump = event.target.closest("[data-video-jump]");
    if (jump) {
      const wrap = root.querySelector("[data-video-lesson]");
      const duration = Number(wrap && wrap.getAttribute("data-video-duration") || 4800);
      setVideoSeconds(Number(jump.getAttribute("data-video-jump") || 0), duration);
      const stamp = root.querySelector("[data-note-stamp]");
      if (stamp) stamp.textContent = formatTime(currentVideoSeconds());
      return;
    }
    if (event.target.closest("[data-bookmark-add]")) {
      const lessonId = state.current;
      const marks = lessonBookmarks(lessonId);
      const ts = currentVideoSeconds();
      marks.push({ id: "b-" + Date.now(), timestamp: ts });
      saveLessonBookmarks(lessonId, marks);
      renderLearn();
      return;
    }
    const removeMark = event.target.closest("[data-bookmark-remove]");
    if (removeMark) {
      const lessonId = state.current;
      const marks = lessonBookmarks(lessonId).filter(function (item) { return item.id !== removeMark.getAttribute("data-bookmark-remove"); });
      saveLessonBookmarks(lessonId, marks);
      renderLearn();
      return;
    }
    const del = event.target.closest("[data-note-delete]");
    if (del) {
      const lessonId = state.current;
      const notes = lessonNotes(lessonId).filter(function (item) { return item.id !== del.getAttribute("data-note-delete"); });
      saveLessonNotes(lessonId, notes);
      renderLearn();
      return;
    }
    const important = event.target.closest("[data-note-important]");
    if (important) {
      const lessonId = state.current;
      const notes = lessonNotes(lessonId).map(function (item) {
        if (item.id === important.getAttribute("data-note-important")) item.important = !item.important;
        return item;
      });
      saveLessonNotes(lessonId, notes);
      renderLearn();
      return;
    }
    const edit = event.target.closest("[data-note-edit]");
    if (edit) {
      const id = edit.getAttribute("data-note-edit");
      const p = root.querySelector('[data-note-text="' + id + '"]');
      if (!p) return;
      const next = window.prompt(learnText("video_edit_note", "Edit"), p.textContent);
      if (next == null) return;
      const lessonId = state.current;
      const notes = lessonNotes(lessonId).map(function (item) {
        if (item.id === id) item.text = String(next).trim() || item.text;
        return item;
      });
      saveLessonNotes(lessonId, notes);
      renderLearn();
    }
  });
  root.addEventListener("input", function (event) {
    if (!event.target.matches("[data-video-seek]")) return;
    const wrap = root.querySelector("[data-video-lesson]");
    const duration = Number(wrap && wrap.getAttribute("data-video-duration") || 4800);
    setVideoSeconds(Number(event.target.value || 0), duration);
    const stamp = root.querySelector("[data-note-stamp]");
    if (stamp) stamp.textContent = formatTime(currentVideoSeconds());
    const progress = root.querySelector("[data-lesson-progress]");
    if (progress) progress.textContent = Math.round(currentVideoSeconds() * 100 / duration) + "%";
  });
  root.addEventListener("submit", function (event) {
    const form = event.target.closest("[data-note-form]");
    if (!form) return;
    event.preventDefault();
    const lessonId = learnState().current;
    const text = String((form.querySelector('[name="note"]') || {}).value || "").trim();
    if (!text) return;
    const notes = lessonNotes(lessonId);
    notes.push({
      id: "n-" + Date.now(),
      lessonId: lessonId,
      timestamp: currentVideoSeconds(),
      text: text,
      createdAt: new Date().toISOString(),
      important: false
    });
    saveLessonNotes(lessonId, notes);
    renderLearn();
  });
}

window.initLearn = initLearn;
document.addEventListener("DOMContentLoaded", initLearn);
document.addEventListener("mf-language", function () {
  const root = document.querySelector("[data-learn]");
  if (!root) return;
  root.dataset.learnBound = root.dataset.learnBound || "1";
  renderLearn();
});
