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

// SpaceX-Style Scroll Animation System
function initScrollAnimations() {
  // Only run on pages with project sections
  const projectSections = document.querySelectorAll('.project-section');
  if (projectSections.length === 0) return;

  // Create intersection observer for full-screen scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, {
    threshold: 0.5, // Trigger when 50% of section is visible (full-screen)
    rootMargin: '0px'
  });

  // Observe all project sections
  projectSections.forEach(section => {
    observer.observe(section);
  });

  // Add scroll progress indicator
  addScrollProgressIndicator();
}

// Add scroll progress indicator
function addScrollProgressIndicator() {
  const scrollContainer = document.querySelector('.scroll-container');
  if (!scrollContainer) return;

  // Create progress indicator
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress-bar';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: var(--accent);
    z-index: 1000;
    transition: width 0.1s ease;
    box-shadow: 0 0 10px var(--accent);
  `;
  document.body.appendChild(progressBar);

  // Update progress on scroll
  scrollContainer.addEventListener('scroll', () => {
    const scrollTop = scrollContainer.scrollTop;
    const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initScrollAnimations);
