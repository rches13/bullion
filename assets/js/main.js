(function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Intersection Observer for reveal animations
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // Smooth anchor focus for accessibility
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href.length === 1) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => target.setAttribute('tabindex', '-1'), 0);
        setTimeout(() => target.focus({ preventScroll: true }), 600);
      }
    });
  });

  // Minimal client-side form UX (no submission backend wired)
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const required = ['name', 'email', 'message'];
      const missing = required.filter((k) => !String(data.get(k) || '').trim());
      if (missing.length) {
        alert('Please complete the required fields.');
        return;
      }
      alert('Thank you. Your inquiry has been noted. We will reach out discreetly.');
      form.reset();
    });
  }
})();


