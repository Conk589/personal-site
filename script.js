// Theme toggle
const toggleBtn = document.getElementById("theme-toggle");

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  if (toggleBtn) {
    toggleBtn.setAttribute("aria-label", theme === "light" ? "Switch to dark theme" : "Switch to light theme");
    toggleBtn.textContent = theme === "light" ? "Dark Mode" : "Light Mode";
  }
}

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const current = document.body.dataset.theme || "light";
    applyTheme(current === "dark" ? "light" : "dark");
  });
}

// Load saved theme on page load
const saved = localStorage.getItem("theme") || "light";
applyTheme(saved);
