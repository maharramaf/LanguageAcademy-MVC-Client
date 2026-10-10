(function () {
  var live = document.getElementById("message-live");
  if (!live || typeof signalR === "undefined") return;

  var meId = live.getAttribute("data-me-id") || "";
  var otherId = live.getAttribute("data-other-id") || "";
  var otherName = live.getAttribute("data-other-name") || "User";
  var tokenUrl = live.getAttribute("data-token-url");
  var form = document.getElementById("message-send-form");
  var bodyField = form && form.querySelector("textarea[name='Body']");
  var thread = document.getElementById("message-thread");
  var seen = {};
  var connection = null;

  document.querySelectorAll("#message-thread [data-id]").forEach(function (node) {
    seen[node.getAttribute("data-id")] = true;
  });

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function appendMessage(item) {
    if (!item || seen[item.id]) return;
    seen[item.id] = true;
    var mine = item.senderId === meId;
    var peer = mine ? item.receiverId : item.senderId;
    updateInbox(item, mine, peer);

    if (!thread || (otherId && peer !== otherId)) return;

    var empty = thread.querySelector(".message-empty");
    if (empty) empty.remove();
    var when = item.createdAt ? new Date(item.createdAt).toLocaleString() : "";
    var p = document.createElement("p");
    p.setAttribute("data-id", item.id);
    p.innerHTML = "<strong>" + (mine ? "You" : escapeHtml(item.senderName || otherName)) +
      "</strong> <span>" + escapeHtml(when) + "</span><br />" + escapeHtml(item.body || "");
    thread.appendChild(p);
    p.scrollIntoView({ block: "end" });
  }

  function updateInbox(item, mine, peer) {
    var inbox = document.getElementById("message-inbox");
    if (!inbox || !peer) return;
    var empty = inbox.querySelector(".message-empty");
    if (empty) empty.remove();
    var name = mine ? otherName : (item.senderName || otherName);
    var link = inbox.querySelector('[data-user-id="' + peer + '"]');
    if (!link) {
      link = document.createElement("a");
      link.className = "message-item";
      link.setAttribute("data-user-id", peer);
      link.href = "/Dashboard/Messages?userId=" + encodeURIComponent(peer);
      link.innerHTML = "<span><strong></strong><br /><span class=\"message-last\"></span></span>";
      inbox.prepend(link);
    }
    var strong = link.querySelector("strong");
    var last = link.querySelector(".message-last");
    if (strong) strong.textContent = name;
    if (last) last.textContent = item.body || "";
  }

  fetch(tokenUrl, { credentials: "same-origin" })
    .then(function (response) {
      if (!response.ok) throw new Error("token");
      return response.json();
    })
    .then(function (data) {
      connection = new signalR.HubConnectionBuilder()
        .withUrl(data.hubUrl, { accessTokenFactory: function () { return data.token; } })
        .withAutomaticReconnect()
        .build();
      connection.on("ReceiveMessage", appendMessage);
      return connection.start();
    })
    .then(function () {
      live.hidden = false;
    })
    .catch(function () {
      connection = null;
    });

  if (!form) return;

  form.addEventListener("submit", function (event) {
    if (!connection || connection.state !== signalR.HubConnectionState.Connected) return;
    event.preventDefault();
    var body = (bodyField && bodyField.value || "").trim();
    if (!body || !otherId) return;
    connection.invoke("Send", otherId, body)
      .then(function () {
        if (bodyField) bodyField.value = "";
      })
      .catch(function () {
        form.submit();
      });
  });
})();
