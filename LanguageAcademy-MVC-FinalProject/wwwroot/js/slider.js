// 06. Course Slider / 07. Testimonials
function createSlider(root, options) {
  if (root.dataset.sliderBound === "1") return;
  const track = root.querySelector(".slider-track");
  const slides = track ? Array.from(track.children) : [];
  const prev = root.querySelector("[data-prev]");
  const next = root.querySelector("[data-next]");
  const dotsWrap = root.querySelector(".slider-dots");
  if (!track || !slides.length || !prev || !next || !dotsWrap) return;
  root.dataset.sliderBound = "1";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const label = options.label || "slide";
  let index = 0;
  let perView = 0;
  let timer;

  function pages() {
    return Math.max(1, slides.length - perView + 1);
  }

  function measure() {
    const width = root.clientWidth;
    const nextPerView = width < 768 ? 1 : width < 992 ? 2 : 3;
    const changed = nextPerView !== perView;
    perView = nextPerView;
    const gap = 24;
    slides.forEach(function (slide) {
      slide.style.flex = "0 0 calc((100% - " + (perView - 1) * gap + "px) / " + perView + ")";
    });
    const max = pages() - 1;
    if (index > max) index = max;
    root.classList.add("is-ready");
    if (changed) buildDots();
    paint();
  }

  function paint() {
    const gap = 24;
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = "translateX(-" + index * (slideWidth + gap) + "px)";
    prev.disabled = index === 0;
    next.disabled = index >= pages() - 1;
    dotsWrap.querySelectorAll(".slider-dot").forEach(function (dot, dotIndex) {
      dot.classList.toggle("is-active", dotIndex === index);
    });
  }

  function buildDots() {
    dotsWrap.innerHTML = "";
    for (let i = 0; i < pages(); i += 1) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "slider-dot" + (i === index ? " is-active" : "");
      const dotKey = label === "testimonial" ? "slider_dot_story" : "slider_dot_course";
      const dotBase = window.mfT ? window.mfT(dotKey, "Show " + label + " group") : "Show " + label + " group";
      dot.setAttribute("aria-label", dotBase + " " + (i + 1));
      dot.addEventListener("click", function () {
        index = i;
        paint();
        restart();
      });
      dotsWrap.appendChild(dot);
    }
  }

  function move(step) {
    index = Math.min(Math.max(index + step, 0), pages() - 1);
    paint();
    restart();
  }

  function restart() {
    window.clearInterval(timer);
    if (reduceMotion || !options.autoplay) return;
    timer = window.setInterval(function () {
      if (!root.isConnected) {
        window.clearInterval(timer);
        return;
      }
      index = index >= pages() - 1 ? 0 : index + 1;
      paint();
    }, 5200);
  }

  prev.addEventListener("click", function () { move(-1); });
  next.addEventListener("click", function () { move(1); });
  root.addEventListener("mouseenter", function () { window.clearInterval(timer); });
  root.addEventListener("mouseleave", restart);
  document.addEventListener("mf-language", function () { buildDots(); });
  if (window.ResizeObserver) new ResizeObserver(measure).observe(root);
  else window.addEventListener("resize", measure);
  measure();
  restart();
}

function initCourseSlider() {
  document.querySelectorAll('[data-slider="courses"]').forEach(function (root) {
    createSlider(root, { label: "course", autoplay: false });
  });
}

function initTestimonials() {
  document.querySelectorAll('[data-slider="testimonials"]').forEach(function (root) {
    createSlider(root, { label: "testimonial", autoplay: true });
  });
}
