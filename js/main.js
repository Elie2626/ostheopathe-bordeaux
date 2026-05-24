/* ─── Nav scroll ─── */
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('stuck', window.scrollY > 40);
  }, { passive: true });
}

/* ─── Reveal on scroll ─── */
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); }),
  { threshold: 0.1 }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ─── 3D Tilt on cards ─── */
document.querySelectorAll('.tilt').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(900px) rotateY(0) rotateX(0) scale(1)';
    card.style.transition = 'transform .4s ease, box-shadow .4s ease';
    setTimeout(() => card.style.transition = '', 400);
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'box-shadow .15s ease';
  });
});

/* ─── Hero parallax (mouse) ─── */
const heroEl  = document.querySelector('.hero');
const heroBg  = document.querySelector('.hero-bg');
const heroOrb = document.querySelector('.hero-orb');
if (heroEl && heroOrb) {
  heroEl.addEventListener('mousemove', e => {
    const r = heroEl.getBoundingClientRect();
    const x = (e.clientX - r.width  / 2) / r.width;
    const y = (e.clientY - r.height / 2) / r.height;
    heroOrb.style.transform = `translateY(calc(-50% + ${y * -18}px)) translateX(${x * -18}px)`;
    if (heroBg) heroBg.style.transform = `translateY(${y * 12}px) translateX(${x * 8}px)`;
  });
  heroEl.addEventListener('mouseleave', () => {
    heroOrb.style.transform = 'translateY(-50%)';
    if (heroBg) heroBg.style.transform = '';
  });
}

/* ─── Hero bg scroll parallax ─── */
if (heroBg) {
  window.addEventListener('scroll', () => {
    heroBg.style.transform = `translateY(${window.scrollY * 0.35}px)`;
  }, { passive: true });
}

/* ─── Mobile nav ─── */
const burger    = document.querySelector('.burger');
const mobileNav = document.getElementById('mobile-nav');
if (burger && mobileNav) {
  burger.addEventListener('click', () => mobileNav.classList.toggle('open'));
  mobileNav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => mobileNav.classList.remove('open'))
  );
}

/* ─── FAQ accordion ─── */
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    const open = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!open) item.classList.add('open');
  });
});

/* ─── Active link ─── */
const current = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
  if (a.getAttribute('href') === current) a.classList.add('active');
});

/* ─── Page hero mouse glow ─── */
const pageHero = document.querySelector('.page-hero');
if (pageHero) {
  const glow = document.createElement('div');
  glow.className = 'ph-mouse-glow';
  pageHero.insertBefore(glow, pageHero.firstChild);
  pageHero.addEventListener('mousemove', e => {
    const r = pageHero.getBoundingClientRect();
    glow.style.left = (e.clientX - r.left) + 'px';
    glow.style.top  = (e.clientY - r.top)  + 'px';
  });
}
