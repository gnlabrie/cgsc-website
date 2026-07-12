document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

function getMenuLabel(isOpen) {
  const key = isOpen ? 'nav.closeMenu' : 'nav.openMenu';
  return window.SiteI18n?.t(key) ?? (isOpen ? 'Close menu' : 'Open menu');
}

function updateMenuAria(isOpen) {
  navToggle.setAttribute('aria-expanded', isOpen);
  navToggle.setAttribute('aria-label', getMenuLabel(isOpen));
}

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.classList.toggle('is-active', isOpen);
  updateMenuAria(isOpen);
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.classList.remove('is-active');
    updateMenuAria(false);
  });
});

document.addEventListener('click', (e) => {
  if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove('is-open');
    navToggle.classList.remove('is-active');
    updateMenuAria(false);
  }
});

document.addEventListener('languagechange', () => {
  const isOpen = navLinks.classList.contains('is-open');
  updateMenuAria(isOpen);
});

document.querySelectorAll('a[href="#top"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.replaceState(null, '', '#top');
  });
});
