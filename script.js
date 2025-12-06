(function () {
  // Responsive Navbar Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('main-nav');
  const navLinks = nav.querySelectorAll('a');
  const ANCHOR_BREAKPOINT = 850; // Match your CSS

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
      nav.classList.contains('open') ? closeMenu() : openMenu();
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

  // Update nav active on scroll
  const sections = document.querySelectorAll('section');
  function updateActiveNavOnScroll() {
    let currentSectionId = "hero";
    let scrollPosition = window.scrollY + 90;
    sections.forEach(section => {
      if (section.offsetTop <= scrollPosition) {
        currentSectionId = section.id;
      }
    });
    navLinks.forEach(link => {
      if (link.getAttribute('href') === "#" + currentSectionId) link.classList.add('active');
      else link.classList.remove('active');
    });
  }
  window.addEventListener('scroll', updateActiveNavOnScroll);

  // Nav link click highlight
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
})();
