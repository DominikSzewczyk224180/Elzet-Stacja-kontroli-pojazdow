// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});
function closeMobile() {
  mobileMenu.classList.remove('open');
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = '';
  spans[1].style.opacity = '';
  spans[2].style.transform = '';
}

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => revealObserver.observe(el));

// Highlight today's hours in both location cards
const today = new Date().getDay(); // 0 = Sunday, 1-5 = Mon-Fri, 6 = Saturday
document.querySelectorAll('.location-hours-row').forEach(row => {
  const day = row.dataset.day;
  if (day === '1-5' && today >= 1 && today <= 5) {
    row.classList.add('today');
  } else if (day === String(today)) {
    row.classList.add('today');
  }
});

// Smooth scroll for anchor links with offset for sticky header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target && this.getAttribute('href').length > 1) {
      e.preventDefault();
      const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  });
});
