// ======================================================
// COMMON.JS
// Shared logic for all pages
// Includes:
// Theme Toggle
// Navbar Scroll Hide/Show
// Mobile Menu
// Fade-up Reveal Animation
// Loader Support
// Active Nav Highlight
// ======================================================


// ===================== THEME TOGGLE =====================
const themeToggleBtn = document.getElementById("theme-toggle");

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-theme");
    if (themeToggleBtn) themeToggleBtn.textContent = "☀️";
  } else {
    document.body.classList.remove("dark-theme");
    if (themeToggleBtn) themeToggleBtn.textContent = "🌙";
  }
}

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "dark";
applyTheme(savedTheme);

// Toggle click
themeToggleBtn?.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("dark-theme")
    ? "light"
    : "dark";

  localStorage.setItem("theme", nextTheme);
  applyTheme(nextTheme);
});


// ===================== MOBILE MENU =====================
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn && mobileMenu) {
  const bars = menuBtn.querySelectorAll(".bar");

  menuBtn.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("flex");

    if (!isOpen) {
      mobileMenu.classList.remove("hidden");

      setTimeout(() => {
        mobileMenu.classList.remove("scale-y-0", "opacity-0");
        mobileMenu.classList.add("scale-y-100", "opacity-100", "flex");
      }, 10);

      bars[0]?.classList.add("rotate-45", "translate-y-[6px]");
      bars[1]?.classList.add("opacity-0");
      bars[2]?.classList.add("-rotate-45", "-translate-y-[6px]");

    } else {
      mobileMenu.classList.remove("scale-y-100", "opacity-100");
      mobileMenu.classList.add("scale-y-0", "opacity-0");

      setTimeout(() => {
        mobileMenu.classList.remove("flex");
        mobileMenu.classList.add("hidden");
      }, 350);

      bars.forEach(bar => {
        bar.classList.remove(
          "rotate-45",
          "-rotate-45",
          "translate-y-[6px]",
          "-translate-y-[6px]",
          "opacity-0"
        );
      });
    }
  });

  // Auto close menu when link clicked
  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("flex");
      mobileMenu.classList.add("hidden", "scale-y-0", "opacity-0");

      bars.forEach(bar => {
        bar.classList.remove(
          "rotate-45",
          "-rotate-45",
          "translate-y-[6px]",
          "-translate-y-[6px]",
          "opacity-0"
        );
      });
    });
  });
}


// ===================== NAVBAR SCROLL EFFECT =====================
const navbar = document.getElementById("navbar");

let lastScrollY = window.scrollY;
let navHidden = false;

window.addEventListener("scroll", () => {
  if (!navbar) return;

  const currentScroll = window.scrollY;

  // Premium shadow on scroll
  if (currentScroll > 30) {
    navbar.classList.add("scale-95");
    navbar.style.boxShadow = "0 0 28px rgba(79,209,197,0.18)";
    navbar.style.backdropFilter = "blur(14px)";
  } else {
    navbar.classList.remove("scale-95");
    navbar.style.boxShadow = "0 0 12px rgba(79,209,197,0.08)";
    navbar.style.backdropFilter = "blur(20px)";
  }

  // Hide when scrolling down
  if (currentScroll > lastScrollY && currentScroll > 120 && !navHidden) {
    navbar.style.transform = "translate(-50%, -130%)";
    navHidden = true;
  }

  // Show when scrolling up
  else if (currentScroll < lastScrollY && navHidden) {
    navbar.style.transform = "translate(-50%, 0)";
    navHidden = false;
  }

  lastScrollY = currentScroll;
});


// ===================== FADE-UP REVEAL =====================
const fadeEls = document.querySelectorAll(".fade-up");

if (fadeEls.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  fadeEls.forEach(el => observer.observe(el));
}


// ===================== LOADER =====================

function hideLoader() {
  const loader = document.getElementById("loader");

  if (!loader) return;

  loader.style.opacity = "0";
  loader.style.visibility = "hidden";
  loader.style.pointerEvents = "none";

  setTimeout(() => {
    loader.style.display = "none";
  }, 500);
}

// Run as soon as DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(hideLoader, 1000);
});

// Fallback no matter what
window.addEventListener("load", hideLoader);

// Emergency backup
setTimeout(hideLoader, 3500);


// ===================== ACTIVE NAV LINK =====================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function setActiveNav() {
  let current = "";

  sections.forEach(section => {
    const top = section.offsetTop - 160;
    const height = section.offsetHeight;

    if (window.scrollY >= top && window.scrollY < top + height) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    const href = link.getAttribute("href");

    if (href === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveNav);
window.addEventListener("load", setActiveNav);


// ===================== SAFETY RESET ON RESIZE =====================
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768 && mobileMenu) {
    mobileMenu.classList.remove("flex");
    mobileMenu.classList.add("hidden");
  }
});


// ===================== CONSOLE BRANDING =====================
console.log("%cKode Developers ⚡", "color:#5eead4; font-size:16px; font-weight:bold;");
console.log("%cPowered by clean code.", "color:#9ca3af;");
