/* Apply saved theme and language before the page paints. */
(function () {
  try {
    var theme = localStorage.getItem("mf-theme");
    if (theme === "dark") document.documentElement.setAttribute("data-theme", "dark");
    var language = localStorage.getItem("mf-language") || "az";
    if (language === "az" || language === "ru" || language === "en") document.documentElement.lang = language;
  } catch (e) {}
})();
