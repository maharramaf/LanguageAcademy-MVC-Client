// 03. Header / Navigation
function initNavigation() {
  if (!initNavigation.ready) {
    initNavigation.ready = true;
    window.addEventListener("scroll", function () {
      const header = document.querySelector(".site-header");
      if (header) header.classList.toggle("is-stuck", window.scrollY > 8);
    }, { passive: true });
  }
  const header = document.querySelector(".site-header");
  if (header) header.classList.toggle("is-stuck", window.scrollY > 8);
}

// 04. Mobile Menu
function initMobileMenu() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-header .nav");
  const overlay = document.querySelector(".nav-overlay");
  if (!toggle || !nav || toggle.dataset.menuBound === "1") return;
  toggle.dataset.menuBound = "1";

  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    overlay?.classList.toggle("is-open", open);
    header?.classList.toggle("menu-open", open);
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open
      ? (window.mfT ? window.mfT("close_menu", "Close menu") : "Close menu")
      : (window.mfT ? window.mfT("open_menu", "Open menu") : "Open menu"));
    document.body.classList.toggle("nav-lock", open);
  }

  toggle.addEventListener("click", function () {
    setMenu(!nav.classList.contains("is-open"));
  });

  overlay?.addEventListener("click", function () {
    setMenu(false);
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setMenu(false);
    });
  });

  if (!initMobileMenu.ready) {
    initMobileMenu.ready = true;
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        const current = document.querySelector(".nav-toggle");
        const currentNav = document.querySelector(".site-header .nav");
        if (!current || !currentNav || !currentNav.classList.contains("is-open")) return;
        currentNav.classList.remove("is-open");
        document.querySelector(".nav-overlay")?.classList.remove("is-open");
        document.querySelector(".site-header")?.classList.remove("menu-open");
        current.classList.remove("is-open");
        current.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-lock");
      }
    });
  }
}
