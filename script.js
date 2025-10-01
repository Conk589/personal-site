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
              
              // Get scroll indicator
              const scrollIndicator = document.querySelector('.scroll-indicator');
              
              if (isVisible) {
                horizontalNav.style.opacity = '1';
                horizontalNav.style.pointerEvents = 'auto';
                horizontalNav.style.transition = 'opacity 0.5s ease';
                
                // Hide scroll indicator when horizontal nav is visible
                if (scrollIndicator) {
                  scrollIndicator.style.opacity = '0';
                  scrollIndicator.style.pointerEvents = 'none';
                  scrollIndicator.style.transition = 'opacity 0.5s ease';
                }
              } else {
                horizontalNav.style.opacity = '0';
                horizontalNav.style.pointerEvents = 'none';
                
                // Show scroll indicator when horizontal nav is hidden
                if (scrollIndicator) {
                  scrollIndicator.style.opacity = '1';
                  scrollIndicator.style.pointerEvents = 'auto';
                  scrollIndicator.style.transition = 'opacity 0.5s ease';
                }
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

  // Hide scroll indicator when near bottom of page
  function checkProjectsScrollPosition() {
    const scrollIndicator = document.querySelector('.projects-container .scroll-indicator');
    if (!scrollIndicator) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;
    
    // Hide scroll indicator when within 200px of bottom
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    
    if (distanceFromBottom < 200) {
      scrollIndicator.style.opacity = '0';
      scrollIndicator.style.pointerEvents = 'none';
      scrollIndicator.style.transition = 'opacity 0.5s ease';
    } else {
      scrollIndicator.style.opacity = '1';
      scrollIndicator.style.pointerEvents = 'auto';
      scrollIndicator.style.transition = 'opacity 0.5s ease';
    }
  }

  // Listen for scroll events
  window.addEventListener('scroll', checkProjectsScrollPosition);
  checkProjectsScrollPosition(); // Initial check
}

// Initialize projects page when DOM is loaded
document.addEventListener('DOMContentLoaded', initProjectsPage);

// Side Navigation Functionality for Projects Page
function initSideNavigation() {
  const sideNav = document.querySelector('.side-navigation');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelectorAll('.nav-list a');
  const projectSections = document.querySelectorAll('.project-section');
  
  if (!sideNav || !navToggle) return;

  // Start collapsed
  sideNav.classList.add('collapsed');
  
  // Toggle expand/collapse - make entire collapsed nav clickable
  sideNav.addEventListener('click', () => {
    if (sideNav.classList.contains('collapsed')) {
      sideNav.classList.toggle('collapsed');
      sideNav.classList.toggle('expanded');
    }
  });
  
  // Also keep the nav-toggle clickable when expanded
  navToggle.addEventListener('click', (e) => {
    if (sideNav.classList.contains('expanded')) {
      e.stopPropagation();
      sideNav.classList.toggle('collapsed');
      sideNav.classList.toggle('expanded');
    }
  });

  // Handle navigation clicks
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = link.getAttribute('data-project');
      const targetSection = document.querySelector(`[data-project="${projectId}"]`);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });

  // Update active link based on scroll position
  function updateActiveLink() {
    const scrollPos = window.pageYOffset + window.innerHeight / 2;
    
    projectSections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        navLinks.forEach(l => l.classList.remove('active'));
        if (navLinks[index]) {
          navLinks[index].classList.add('active');
        }
      }
    });
  }

  // Listen for scroll events
  window.addEventListener('scroll', updateActiveLink);
  
  // Initial setup
  updateActiveLink();
}

// Initialize side navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', initSideNavigation);
