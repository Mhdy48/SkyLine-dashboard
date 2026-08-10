// Page Navigation
const links = document.querySelectorAll(".sidebar a");
const pages = document.querySelectorAll(".page");

let currentIndex = 0;
let isAnimating = false;

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    if (isAnimating) return;

    const nextIndex = +link.dataset.index;
    if (nextIndex === currentIndex) return;

    isAnimating = true;

    const current = pages[currentIndex];
    const next = pages[nextIndex];
    const forward = nextIndex > currentIndex;

    links.forEach((l) => l.classList.remove("active-link"));
    link.classList.add("active-link");

    next.classList.remove("left", "right", "current");

    if (forward) {
      next.style.transform = "translateX(100%)";
    } else {
      next.style.transform = "translateX(-100%)";
    }

    next.style.zIndex = 4;
    current.style.zIndex = 3;

    requestAnimationFrame(() => {
      next.style.transition =
        "transform .45s ease, background-color .5s ease, color .5s ease";

      current.style.transition =
        "transform .45s ease, background-color .5s ease, color .5s ease";

      next.style.transform = "translateX(0)";

      if (forward) {
        current.style.transform = "translateX(-100%)";
      } else {
        current.style.transform = "translateX(100%)";
      }
    });

    next.addEventListener("transitionend", function handler(e) {
      if (e.propertyName !== "transform") return;

      next.removeEventListener("transitionend", handler);

      current.style.transition = "none";
      current.style.transform = "translateX(100%)";

      currentIndex = nextIndex;
      isAnimating = false;
    });
  });
});

// Theme Toggle
const btn = document.getElementById("themeToggle");
const icon = document.getElementById("themeIcon");

btn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");

  if (document.documentElement.classList.contains("dark")) {
    icon.classList.replace("fa-moon", "fa-sun");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
  }
});
