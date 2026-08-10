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

// Counter Animation
const counters = document.querySelectorAll(".counter");

counters.forEach((counter) => {
  const target = +counter.dataset.target;
  const duration = 1200;
  const start = performance.now();

  function update(time) {
    const progress = Math.min((time - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);

    counter.textContent = Math.floor(target * ease).toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
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

// Revenue Chart
Chart.defaults.font.family = "DMSans-Medium";
Chart.defaults.font.size = 13;
Chart.defaults.color = "#64748B";

const canvas = document.getElementById("revenueChart");
const ctx = canvas.getContext("2d");

const gradient = ctx.createLinearGradient(0, 0, 0, 400);

gradient.addColorStop(0, "rgba(37,99,235,.35)");
gradient.addColorStop(0.5, "rgba(37,99,235,.10)");
gradient.addColorStop(1, "rgba(37,99,235,0)");

const shadowLine = {
  id: "shadowLine",

  beforeDatasetDraw(chart) {
    const { ctx } = chart;

    ctx.save();
    ctx.shadowColor = "rgba(37,99,235,.25)";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 8;
  },

  afterDatasetDraw(chart) {
    chart.ctx.restore();
  },
};

new Chart(ctx, {
  type: "line",

  data: {
    labels: ["May 1", "May 6", "May 11", "May 16", "May 21", "May 26"],

    datasets: [
      {
        data: [11000, 19000, 12500, 22000, 18500, 30000],

        borderColor: "#2563EB",
        borderWidth: 4,
        backgroundColor: gradient,
        fill: true,

        tension: 0.45,

        pointRadius: 5,
        pointHoverRadius: 8,
        pointBorderWidth: 3,
        pointBackgroundColor: "#2563EB",
        pointBorderColor: "#fff",

        hitRadius: 20,
      },
    ],
  },

  options: {
    maintainAspectRatio: false,
    responsive: true,

    interaction: {
      intersect: false,
      mode: "index",
    },

    animation: {
      duration: 1800,
      easing: "easeOutQuart",
    },

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        backgroundColor: "#0F172A",
        titleColor: "#fff",
        bodyColor: "#fff",
        displayColors: false,

        padding: 14,
        cornerRadius: 12,
        caretSize: 8,

        callbacks: {
          label(context) {
            return "$" + context.parsed.y.toLocaleString();
          },
        },
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        border: {
          display: false,
        },

        ticks: {
          color: "#64748B",
        },
      },

      y: {
        beginAtZero: true,

        border: {
          display: false,
        },

        ticks: {
          stepSize: 10000,

          callback(value) {
            return "$" + value / 1000 + "K";
          },
        },

        grid: {
          color: "rgba(148,163,184,.15)",
          drawTicks: false,
        },
      },
    },
  },
  plugins: [shadowLine],
});