// ExitVPN multi-page static site behavior:
// - mobile menu toggle
// - theme toggle (light/dark), saved to localStorage
// - active nav highlight
// - update footer year

(function () {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  function setNav(open) {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navMenu.classList.toggle("is-open", open);
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.contains("is-open");
      setNav(!isOpen);
    });

    navMenu.addEventListener("click", (e) => {
      const t = e.target;
      if (t && t.tagName === "A") setNav(false);
    });

    document.addEventListener("click", (e) => {
      const target = e.target;
      if (!navMenu.classList.contains("is-open")) return;
      if (target === navToggle || (navToggle && navToggle.contains(target))) return;
      if (navMenu.contains(target)) return;
      setNav(false);
    });
  }

  // Theme toggle
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  function applyTheme(theme) {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      if (themeIcon) themeIcon.textContent = "☾";
    } else {
      document.documentElement.removeAttribute("data-theme");
      if (themeIcon) themeIcon.textContent = "☀";
    }
  }

  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") applyTheme(saved);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      const next = isDark ? "light" : "dark";
      localStorage.setItem("theme", next);
      applyTheme(next);
    });
  }

  // Active nav
  const page = document.body.getAttribute("data-page");
  if (page) {
    const link = document.querySelector('[data-nav="' + page + '"]');
    if (link) link.classList.add("is-active");
  }
})();
