/* ============================================
   ABHINAV KADAM — PORTFOLIO SCRIPTS
   ============================================ */

'use strict';

/* ---- DOM Ready ---- */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollProgress();
  initRevealAnimations();
  initActiveNav();
  initBarChart();
  initSparklines();
  initCounters();
  initSmoothScroll();
  initHeroTyping();
  initProjectMocks();
});

/* ============================================
   NAVBAR – scroll + blur
   ============================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ============================================
   MOBILE MENU
   ============================================ */
function initMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  const toggle = () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    hamburger.setAttribute('aria-expanded', isOpen.toString());
  };

  hamburger.addEventListener('click', toggle);

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ============================================
   SCROLL PROGRESS BAR
   ============================================ */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const docH   = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const prog   = docH > 0 ? (window.scrollY / docH) * 100 : 0;
    bar.style.width = prog + '%';
  }, { passive: true });
}

/* ============================================
   REVEAL ON SCROLL (IntersectionObserver)
   ============================================ */
function initRevealAnimations() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => io.observe(el));
}

/* ============================================
   ACTIVE NAV HIGHLIGHT
   ============================================ */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => io.observe(s));
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ============================================
   HERO BAR CHART ANIMATION
   ============================================ */
function initBarChart() {
  const bars = document.querySelectorAll('.bar');
  if (!bars.length) return;

  const heights = [40, 65, 50, 80, 55, 90, 70];
  bars.forEach((bar, i) => {
    bar.style.height = '4px';
    setTimeout(() => {
      bar.style.height = heights[i] + '%';
      bar.style.transition = 'height 0.8s cubic-bezier(.4,0,.2,1)';
    }, 400 + i * 80);
  });
}

/* ============================================
   SPARKLINE SVGs
   ============================================ */
function initSparklines() {
  const cards = document.querySelectorAll('.sparkline-card');
  if (!cards.length) return;

  const datasets = [
    [10, 25, 18, 42, 30, 55, 48, 68],
    [30, 22, 38, 26, 44, 36, 52, 48]
  ];

  const colors = ['#FF6B00', '#00C853'];

  cards.forEach((card, i) => {
    const svg = card.querySelector('.sparkline-svg');
    if (!svg) return;
    const data = datasets[i % datasets.length];
    const color = colors[i % colors.length];
    const w = 100, h = 36;
    const min = Math.min(...data), max = Math.max(...data);
    const range = max - min || 1;
    const pts = data.map((v, j) => {
      const x = (j / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    }).join(' ');

    svg.innerHTML = `
      <polyline
        points="${pts}"
        fill="none"
        stroke="${color}"
        stroke-width="2"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-dasharray="200"
        stroke-dashoffset="200"
        style="animation: drawLine 1.4s ease forwards; animation-delay: ${0.6 + i * 0.2}s;"
      />
      <style>
        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }
      </style>
    `;
  });
}

/* ============================================
   COUNTER ANIMATIONS
   ============================================ */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const isFloat = el.dataset.float === 'true';
      const duration = 1600;
      const start = performance.now();

      const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const val = target * ease;
        el.textContent = isFloat
          ? val.toFixed(1) + suffix
          : Math.floor(val) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => io.observe(c));
}

/* ============================================
   HERO TYPING EFFECT
   ============================================ */
function initHeroTyping() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const words = ['Data Analyst', 'Insight Storyteller', 'Dashboard Builder', 'Python Developer'];
  let wIdx = 0, cIdx = 0, deleting = false;

  const type = () => {
    const word = words[wIdx];

    if (deleting) {
      cIdx--;
      el.textContent = word.slice(0, cIdx);
      if (cIdx === 0) {
        deleting = false;
        wIdx = (wIdx + 1) % words.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 50);
    } else {
      cIdx++;
      el.textContent = word.slice(0, cIdx);
      if (cIdx === word.length) {
        setTimeout(() => { deleting = true; type(); }, 2000);
        return;
      }
      setTimeout(type, 85);
    }
  };

  type();
}

/* ============================================
   PROJECT MOCK ANIMATIONS
   ============================================ */
function initProjectMocks() {
  const mocks = document.querySelectorAll('.mock-bar');
  mocks.forEach((bar, i) => {
    bar.style.height = '8px';
    const heights = [30, 60, 45, 75, 55, 85, 40];
    setTimeout(() => {
      bar.style.height = heights[i % heights.length] + '%';
      bar.style.transition = `height 0.7s cubic-bezier(.4,0,.2,1) ${i * 60}ms`;
    }, 800);
  });
}

/* ============================================
   BACK TO TOP
   ============================================ */
function backToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* Expose globally */
window.backToTop = backToTop;
