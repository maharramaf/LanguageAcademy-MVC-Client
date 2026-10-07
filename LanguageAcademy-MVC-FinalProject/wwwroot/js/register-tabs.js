(function () {
  var tabs = document.querySelectorAll("[data-reg-role]");
  if (!tabs.length) return;

  function show(role) {
    var instructor = role === "instructor";
    tabs.forEach(function (item) {
      item.classList.toggle("is-active", item.getAttribute("data-reg-role") === role);
    });
    document.querySelectorAll("[data-instructor-field]").forEach(function (field) {
      field.hidden = !instructor;
    });
    document.querySelectorAll("[data-student-field]").forEach(function (field) {
      field.hidden = instructor;
    });
  }

  tabs.forEach(function (button) {
    button.addEventListener("click", function () {
      show(button.getAttribute("data-reg-role"));
    });
  });

  var start = document.querySelector(".reg-role")?.getAttribute("data-active-tab") || "student";
  show(start);
})();
