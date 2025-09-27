// Theme selector
const themeSelector = document.getElementById("theme-selector");

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  if (themeSelector) {
    themeSelector.value = theme;
  }
}

if (themeSelector) {
  themeSelector.addEventListener("change", (e) => {
    applyTheme(e.target.value);
  });
}

// Load saved theme on page load
const saved = localStorage.getItem("theme") || "dark";
applyTheme(saved);
