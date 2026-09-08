/* =====================================================
   JAVASCRIPT — Portfolio Interactions & Animations
===================================================== */

// ——— Navbar Scroll Effect ———
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const hamburger = document.getElementById('hamburger');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  // Sticky navbar
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Scroll to top button
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }

  // Active nav link highlight
  highlightActiveNav();

  // Trigger AOS
  triggerAOS();
});

// ——— Hamburger Menu ———
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close nav on link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Close nav when clicking outside
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

// ——— Active Nav Highlight ———
function highlightActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

    if (navLink) {
      if (scrollPos >= top && scrollPos < bottom) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        navLink.classList.add('active');
      }
    }
  });
}

// ——— Scroll To Top ———
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ——— Hero Typewriter Effect ———
const taglines = [
  'Mechanical Engineer',
  'EV Enthusiast',
  'Python Explorer',
  'AI Tools User',
  'Problem Solver',
];

const heroTagline = document.getElementById('heroTagline');
let taglineIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeDelay = 100;

function typeEffect() {
  const current = taglines[taglineIndex];

  if (isDeleting) {
    heroTagline.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    typeDelay = 50;
  } else {
    heroTagline.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    typeDelay = 100;
  }

  if (!isDeleting && charIndex === current.length) {
    typeDelay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    taglineIndex = (taglineIndex + 1) % taglines.length;
    typeDelay = 400;
  }

  setTimeout(typeEffect, typeDelay);
}

setTimeout(typeEffect, 800);

// ——— Particle Background ———
function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  const count = 30;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('span');
    particle.classList.add('particle');
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 1}px;
      height: ${Math.random() * 4 + 1}px;
      background: rgba(0, 201, 167, ${Math.random() * 0.5 + 0.1});
      border-radius: 50%;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      animation: particleFloat ${Math.random() * 10 + 8}s ease-in-out infinite;
      animation-delay: ${Math.random() * -10}s;
    `;
    container.appendChild(particle);
  }

  // Inject keyframe
  if (!document.getElementById('particleStyle')) {
    const style = document.createElement('style');
    style.id = 'particleStyle';
    style.textContent = `
      @keyframes particleFloat {
        0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
        25%       { transform: translateY(-20px) translateX(10px); opacity: 0.7; }
        50%       { transform: translateY(-10px) translateX(-10px); opacity: 0.5; }
        75%       { transform: translateY(-30px) translateX(5px); opacity: 0.8; }
      }
    `;
    document.head.appendChild(style);
  }
}

createParticles();

// ——— AOS (Animate On Scroll) — Lightweight Custom ———
function triggerAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  const windowHeight = window.innerHeight;

  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const delay = parseInt(el.getAttribute('data-aos-delay') || '0');

    if (rect.top < windowHeight - 60) {
      setTimeout(() => {
        el.classList.add('aos-animate');
      }, delay);
    }
  });
}

// Initial trigger on page load
window.addEventListener('load', () => {
  triggerAOS();
  document.getElementById('year').textContent = new Date().getFullYear();
});

// ——— Contact Form ———
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    // Shake fields with errors
    [name, email, message].forEach((val, idx) => {
      const fields = ['name', 'email', 'message'];
      if (!val) {
        const el = document.getElementById(fields[idx]);
        el.style.borderColor = '#ff4d6d';
        el.addEventListener('input', () => {
          el.style.borderColor = '';
        }, { once: true });
      }
    });
    return;
  }

  // Simulate sending
  submitBtn.disabled = true;
  submitBtn.querySelector('span').textContent = 'Sending...';
  submitBtn.querySelector('i').className = 'fas fa-spinner fa-spin';

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.querySelector('span').textContent = 'Send Message';
    submitBtn.querySelector('i').className = 'fas fa-paper-plane';
    formSuccess.classList.add('visible');
    contactForm.reset();

    setTimeout(() => {
      formSuccess.classList.remove('visible');
    }, 5000);
  }, 1600);
});

// ——— Smooth hover tilt on project cards ———
document.querySelectorAll('.project-card, .skill-category-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `
      translateY(-8px)
      perspective(800px)
      rotateX(${-y * 6}deg)
      rotateY(${x * 6}deg)
    `;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ——— Score bar animation trigger on scroll ———
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.score-fill, .proficiency-fill').forEach(fill => {
        fill.style.animationPlayState = 'running';
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.timeline-card, .skill-category-card').forEach(el => {
  el.querySelectorAll('.score-fill, .proficiency-fill').forEach(fill => {
    fill.style.animationPlayState = 'paused';
  });
  observer.observe(el);
});

// ——— Footer year ———
// (Already set in window load above)

console.log('%c👋 Hello from Divya Satya Teja Yerra\'s Portfolio!', 
  'color: #00C9A7; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS & JavaScript', 
  'color: #8FA3BF; font-size: 12px;');
