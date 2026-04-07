/* =========================================================
   script.js – Ramchandra Limba Portfolio
   ========================================================= */

/* ---- Navbar: scroll-shrink + active link highlighting ---- */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
  // Shrink navbar after 60px
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  // Active nav link based on visible section
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---- Mobile nav toggle ---- */
const navToggle  = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});

// Close menu when a link is clicked
navLinksEl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinksEl.classList.remove('open');
  });
});

/* ---- Dark / Light theme toggle ---- */
const themeToggle = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  themeToggle.innerHTML = dark
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
}

// Initialise from localStorage or OS preference
const saved = localStorage.getItem('theme');
applyTheme(saved ? saved === 'dark' : true); // default dark

themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  applyTheme(!isDark);
  localStorage.setItem('theme', !isDark ? 'dark' : 'light');
});

/* ---- Typed-text animation ---- */
const roles = [
  '🐍 Python Developer',
  '🧪 Software Tester',
  '🌐 Backend Engineer',
  '🤖 ML Enthusiast',
  '🎓 B.Tech CSE Student',
];
const typedEl   = document.getElementById('typedText');
let roleIndex   = 0;
let charIndex   = 0;
let isDeleting  = false;
const typeSpeed = 80;
const deleteSpeed = 45;
const pauseTime = 2000;

function typeLoop() {
  const current = roles[roleIndex];
  if (isDeleting) {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex  = (roleIndex + 1) % roles.length;
      setTimeout(typeLoop, 400);
      return;
    }
    setTimeout(typeLoop, deleteSpeed);
  } else {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeLoop, pauseTime);
      return;
    }
    setTimeout(typeLoop, typeSpeed);
  }
}
typeLoop();

/* ---- Scroll-reveal animation ---- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(
  '.skill-card, .project-card, .cert-card, .contact-card, .about-grid, .cs-concepts'
).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});
