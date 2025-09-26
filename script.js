// Theme toggle
const toggleBtn = document.getElementById("theme-toggle");

function setTheme(theme) {
  document.body.dataset.theme = theme;
  localStorage.setItem("theme", theme);
}

toggleBtn.addEventListener("click", () => {
  const current = document.body.dataset.theme;
  setTheme(current === "dark" ? "light" : "dark");
});

// Load saved theme on page load
const saved = localStorage.getItem("theme") || "light";
setTheme(saved);
