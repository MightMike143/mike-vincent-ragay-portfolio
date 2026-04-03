/**
 * Main JavaScript File
 * Handles typing animation, theme toggle, and general site functionality
 */

// ============================================
// Typing Animation
// ============================================
const TYPING_TEXTS = ['Data Engineer', 'Splunk Consultant', 'Analytics Specialist', 'Problem Solver'];
let typingCount = 0;
let typingIndex = 0;
let currentText = '';
let typingDirection = 1;

function initTypingAnimation() {
  const typingElement = document.getElementById('typing');
  if (!typingElement) return;

  function type() {
    currentText = TYPING_TEXTS[typingCount];
    const displayText = currentText.slice(0, typingIndex) + (typingIndex < currentText.length ? '|' : '');
    typingElement.textContent = displayText;

    if (typingDirection === 1) {
      typingIndex++;
      if (typingIndex > currentText.length) {
        typingDirection = -1;
        setTimeout(type, 1500);
        return;
      }
    } else {
      typingIndex--;
      if (typingIndex === 0) {
        typingDirection = 1;
        typingCount = (typingCount + 1) % TYPING_TEXTS.length;
      }
    }
    setTimeout(type, 80);
  }
  
  type();
}

// ============================================
// Theme Toggle
// ============================================
function initThemeToggle() {
  const themeButton = document.querySelector('[data-theme-toggle]');
  if (!themeButton) return;

  // Load saved theme preference
  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);

  themeButton.addEventListener('click', () => {
    const html = document.documentElement;
    const currentTheme = html.classList.contains('light') ? 'light' : 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

function applyTheme(theme) {
  const html = document.documentElement;
  const themeIcon = document.querySelector('[data-theme-toggle] i');
  
  if (theme === 'light') {
    html.classList.add('light');
    if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
  } else {
    html.classList.remove('light');
    if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
  }
}

// ============================================
// Smooth Scroll Behavior
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ============================================
// Mobile Menu Toggle (if added later)
// ============================================
function initMobileMenu() {
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const navLinks = document.querySelector('.nav-links');
  
  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close menu when link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// ============================================
// Initialize all functions on DOM ready
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initTypingAnimation();
  initThemeToggle();
  initSmoothScroll();
  initMobileMenu();
  
  console.log('🚀 Portfolio initialized');
});
