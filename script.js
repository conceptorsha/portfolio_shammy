(function () {
  // Responsive Navbar Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('main-nav');
  const navLinks = nav.querySelectorAll('a');
  const ANCHOR_BREAKPOINT = 768;

  if (navToggle && nav) {
    function openMenu() {
      nav.classList.add('open');
      navToggle.setAttribute('aria-expanded', 'true');
      nav.setAttribute('aria-hidden', 'false');
      navToggle.setAttribute('aria-label', 'Close menu');
      const firstLink = nav.querySelector('a');
      if (firstLink) firstLink.focus({ preventScroll: true });
    }
    function closeMenu() {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      nav.setAttribute('aria-hidden', 'true');
      navToggle.setAttribute('aria-label', 'Open menu');
    }
    function toggleMenu() {
      const isOpen = nav.classList.contains('open');
      if (isOpen) closeMenu();
      else openMenu();
    }
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !navToggle.contains(e.target)) {
        closeMenu();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) closeMenu();
    });
    nav.addEventListener('click', (e) => {
      const target = e.target;
      if (target.tagName === 'A' && window.innerWidth < ANCHOR_BREAKPOINT) closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth >= ANCHOR_BREAKPOINT) {
        nav.classList.remove('open');
        nav.setAttribute('aria-hidden', 'false');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
      } else {
        nav.setAttribute('aria-hidden', nav.classList.contains('open') ? 'false' : 'true');
      }
    }, { passive: true });
  }

  // Set current year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // SPA section logic (shows one section at a time)
  const sections = document.querySelectorAll('.section');

  function showSection(hash) {
    let activeHash = hash || "#hero";
    // If this hash doesn't match any section id, fallback to hero
    if (!document.querySelector(activeHash)) activeHash = "#hero";
    sections.forEach(section => {
      if ("#" + section.id === activeHash) {
        section.classList.add('active-section');
        section.style.display = "";
      } else {
        section.classList.remove('active-section');
        section.style.display = "none";
      }
    });
    navLinks.forEach(link => {
      if (link.getAttribute('href') === activeHash) link.classList.add('active');
      else link.classList.remove('active');
    });
  }

  function initSection() {
    showSection(location.hash || "#hero");
  }

  window.addEventListener('hashchange', () => showSection(location.hash));
  document.addEventListener('DOMContentLoaded', initSection);
})();