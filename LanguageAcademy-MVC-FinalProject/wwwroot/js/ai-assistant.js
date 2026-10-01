/* Frontend AI assistant demo. No network calls. Replace getMockAIResponse later. */
function aiText(key, fallback) {
  if (typeof window.mfT === "function") return window.mfT(key, fallback || key);
  return fallback || key;
}

function getMockAIResponse(message) {
  const text = (message || "").trim().toLowerCase();
  if (!text) return aiText("ai_demo", "I'm currently in demo mode.");
  if (/\b(hello|hi|hey|salam|привет|здравствуй)\b/.test(text)) {
    return aiText("ai_hello", "Hello! Welcome to MF Language Academy. How can I help you today?");
  }
  if (text.indexOf("present perfect") !== -1 || text.indexOf("indiki bitmiş") !== -1 || text.indexOf("перфект") !== -1) {
    return aiText("ai_present", "Present perfect connects a past action with the present. For example: I have finished my homework.");
  }
  if (text.indexOf("learn english") !== -1 || text.indexOf("ingilis") !== -1 || text.indexOf("англий") !== -1 || text.indexOf("help me") !== -1 || text.indexOf("kömək") !== -1 || text.indexOf("помог") !== -1 || text.indexOf("plan") !== -1 || text.indexOf("premium") !== -1) {
    if (typeof window.mfIsPremium === "function" && window.mfIsPremium()) {
      return aiText("ai_premium", "Premium suggestion: study 20 minutes today, review yesterday's quiz, then continue English A1 lesson 21.");
    }
    return aiText("ai_help", "I can help you practice grammar, vocabulary, speaking and writing.");
  }
  return aiText("ai_demo", "I'm currently in demo mode. The real AI assistant will be connected through the backend later.");
}

function handleAIMessage(message) {
  return getMockAIResponse(message);
}

function openAIAssistant() {
  const root = document.querySelector(".ai-assistant");
  const panel = document.querySelector("[data-ai-panel]");
  const button = document.querySelector(".ai-launcher");
  if (!root || !panel || !button) return;
  root.classList.add("is-open");
  panel.setAttribute("aria-hidden", "false");
  button.setAttribute("aria-expanded", "true");
  const input = panel.querySelector("[data-ai-input]");
  if (input) input.focus();
}

function closeAIAssistant() {
  const root = document.querySelector(".ai-assistant");
  const panel = document.querySelector("[data-ai-panel]");
  const button = document.querySelector(".ai-launcher");
  if (!root || !panel || !button) return;
  root.classList.remove("is-open");
  panel.setAttribute("aria-hidden", "true");
  button.setAttribute("aria-expanded", "false");
  button.focus();
}

function appendAIMessage(kind, text) {
  const log = document.querySelector("[data-ai-log]");
  if (!log) return;
  const item = document.createElement("p");
  item.className = "ai-msg ai-msg-" + kind;
  item.textContent = text;
  log.appendChild(item);
  log.scrollTop = log.scrollHeight;
}

function sendAIMessage() {
  const input = document.querySelector("[data-ai-input]");
  const log = document.querySelector("[data-ai-log]");
  if (!input || !log || input.disabled) return;
  const message = input.value.trim();
  if (!message) return;
  input.value = "";
  appendAIMessage("user", message);
  const typing = document.createElement("p");
  typing.className = "ai-msg ai-msg-bot ai-typing";
  typing.textContent = aiText("ai_typing", "AI is typing...");
  log.appendChild(typing);
  log.scrollTop = log.scrollHeight;
  input.disabled = true;
  window.setTimeout(function () {
    typing.remove();
    appendAIMessage("bot", handleAIMessage(message));
    input.disabled = false;
    input.focus();
  }, 450);
}

function initAIAssistant() {
  if (document.querySelector(".ai-assistant")) return;
  const root = document.createElement("div");
  root.className = "ai-assistant";
  root.innerHTML =
    '<div class="ai-panel" data-ai-panel role="dialog" aria-hidden="true" aria-labelledby="aiAssistantTitle">' +
      '<div class="ai-panel-head">' +
        '<strong id="aiAssistantTitle" data-i18n="ai_title">MF AI Assistant</strong><span data-ai-plan hidden></span>' +
        '<button class="modal-close" type="button" data-ai-close data-i18n-aria-label="btn_close" aria-label="Close">&times;</button>' +
      '</div>' +
      '<div class="ai-log" data-ai-log">' +
        '<div class="ai-welcome">' +
          '<i class="bi bi-robot" aria-hidden="true"></i>' +
          '<p data-i18n="ai_welcome">Salam! MF Language Academy-yə xoş gəlmisiniz 👋</p>' +
          '<span data-i18n="ai_subtitle">Size necə kömək edə bilərəm?</span>' +
        '</div>' +
      '</div>' +
      '<form class="ai-form" data-ai-form>' +
        '<input type="text" data-ai-input data-i18n-placeholder="ai_placeholder" placeholder="Mesajınızı yazın..." aria-label="Mesajınızı yazın..." data-i18n-aria-label="ai_placeholder">' +
        '<button class="ai-send" type="submit" data-i18n-aria-label="ai_send" aria-label="Send"><i class="bi bi-send" aria-hidden="true"></i></button>' +
      '</form>' +
    '</div>' +
    '<button class="ai-launcher" type="button" aria-expanded="false" aria-haspopup="dialog" data-i18n-aria-label="ai_open" aria-label="Open AI Assistant">' +
      '<i class="bi bi-robot" aria-hidden="true"></i>' +
    '</button>';
  document.body.appendChild(root);
  const button = root.querySelector(".ai-launcher");
  const panel = root.querySelector("[data-ai-panel]");
  const form = root.querySelector("[data-ai-form]");
  button.addEventListener("click", function (event) {
    event.stopPropagation();
    if (root.classList.contains("is-open")) closeAIAssistant();
    else openAIAssistant();
  });
  root.querySelector("[data-ai-close]").addEventListener("click", closeAIAssistant);
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    sendAIMessage();
  });
  if (!initAIAssistant.bound) {
    initAIAssistant.bound = true;
    document.addEventListener("click", function (event) {
      const widget = document.querySelector(".ai-assistant");
      const openPanel = document.querySelector("[data-ai-panel]");
      if (!widget || !openPanel || !widget.classList.contains("is-open")) return;
      if (!widget.contains(event.target)) closeAIAssistant();
    });
    document.addEventListener("keydown", function (event) {
      const openPanel = document.querySelector("[data-ai-panel]");
      if (event.key === "Escape" && openPanel && openPanel.closest(".ai-assistant").classList.contains("is-open")) closeAIAssistant();
    });
  }
  if (typeof window.applyTranslations === "function") window.applyTranslations();
}

window.initAIAssistant = initAIAssistant;
window.openAIAssistant = openAIAssistant;
window.closeAIAssistant = closeAIAssistant;
window.sendAIMessage = sendAIMessage;
window.handleAIMessage = handleAIMessage;
window.getMockAIResponse = getMockAIResponse;

document.addEventListener("DOMContentLoaded", function () {
  initAIAssistant();
});
