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

// About Page Horizontal Section Navigation
let currentSectionIndex = 0;
const sections = [
  { name: 'My Background', element: null },
  { name: 'Professional Journey', element: null },
  { name: 'Technical Focus', element: null },
  { name: 'Leadership & Values', element: null },
  { name: 'Current Work', element: null }
];

function navigateSection(direction) {
  const newIndex = currentSectionIndex + direction;
  
  // Handle bounds
  if (newIndex < 0 || newIndex >= sections.length) return;
  
  // Update sections
  sections[currentSectionIndex].element.classList.remove('active');
  sections[newIndex].element.classList.add('active');
  
  // Update current index
  currentSectionIndex = newIndex;
  
  // Update navigation UI
  updateNavigationUI();
}

function updateNavigationUI() {
  const currentSectionName = document.getElementById('current-section-name');
  const sectionProgress = document.getElementById('section-progress');
  const prevBtn = document.querySelector('.nav-btn.prev');
  const nextBtn = document.querySelector('.nav-btn.next');
  
  // Update section name and progress
  currentSectionName.textContent = sections[currentSectionIndex].name;
  sectionProgress.textContent = `${currentSectionIndex + 1} / ${sections.length}`;
  
  // Update button states
  prevBtn.disabled = currentSectionIndex === 0;
  nextBtn.disabled = currentSectionIndex === sections.length - 1;
}

// Initialize about page functionality
function initAboutPage() {
  // Get all section elements
  const sectionElements = document.querySelectorAll('.about-section');
  sectionElements.forEach((element, index) => {
    sections[index].element = element;
  });
  
  // Set first section as active
  if (sections[0].element) {
    sections[0].element.classList.add('active');
  }
  
  // Update initial UI state
  updateNavigationUI();
  
  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      navigateSection(-1);
    } else if (e.key === 'ArrowRight') {
      navigateSection(1);
    }
  });
  
  // Hide navigation controls initially, show when user scrolls to horizontal area
  const horizontalNav = document.querySelector('.horizontal-nav');
  const aboutFullscreen = document.querySelector('.about-fullscreen');
  
  if (horizontalNav) {
    horizontalNav.style.opacity = '0';
    horizontalNav.style.pointerEvents = 'none';
  }
  
  // Show navigation when horizontal area is visible using window scroll
  function checkScrollPosition() {
    if (aboutFullscreen && horizontalNav) {
      const rect = aboutFullscreen.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5;
      
      if (isVisible) {
        horizontalNav.style.opacity = '1';
        horizontalNav.style.pointerEvents = 'auto';
        horizontalNav.style.transition = 'opacity 0.5s ease';
      } else {
        horizontalNav.style.opacity = '0';
        horizontalNav.style.pointerEvents = 'none';
      }
    }
  }
  
  // Listen to window scroll instead of container scroll
  window.addEventListener('scroll', checkScrollPosition);
  checkScrollPosition(); // Initial check
}

// Initialize about page when DOM is loaded
document.addEventListener('DOMContentLoaded', initAboutPage);

// Projects Page Scroll Animations with Refresh on Scroll
function initProjectsPage() {
  // Only run on pages with project sections
  const projectSections = document.querySelectorAll('.project-section');
  if (projectSections.length === 0) return;

  // Create intersection observer for full-screen scroll animations that refresh
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Section is visible - add animation class
        entry.target.classList.add('animate-in');
      } else {
        // Section is not visible - remove animation class to reset
        entry.target.classList.remove('animate-in');
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
}

// Initialize projects page when DOM is loaded
document.addEventListener('DOMContentLoaded', initProjectsPage);
