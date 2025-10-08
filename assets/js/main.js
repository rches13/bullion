(function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Parallax scrolling for hero
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      heroImg.style.transform = `translateY(${rate}px)`;
    });
  }

  // Gold particles generation
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    const particleCount = 15;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 8 + 's';
      particlesContainer.appendChild(particle);
    }
  }

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

  // Intro sand particles sprinkling (one-time)
  const sandCanvas = document.getElementById('intro-sand');
  if (sandCanvas) {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      const ctx = sandCanvas.getContext('2d');
      const DPR = Math.min(window.devicePixelRatio || 1, 2);
      const rect = sandCanvas.getBoundingClientRect();
      sandCanvas.width = rect.width * DPR;
      sandCanvas.height = rect.height * DPR;
      sandCanvas.style.width = rect.width + 'px';
      sandCanvas.style.height = rect.height + 'px';
      ctx.scale(DPR, DPR);
      ctx.globalCompositeOperation = 'lighter';

      const particles = [];
      const PARTICLE_COUNT = 360; // denser for visibility
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * rect.width,
          // Start within the top 25% of the hero so they are visible immediately
          y: Math.random() * (rect.height * 0.25) - 10,
          size: Math.random() * 1.6 + 1.0,
          // Fall a bit faster so motion is noticeable at once
          speedY: Math.random() * 1.2 + 1.0,
          speedX: (Math.random() - 0.5) * 0.8,
          // Shorter life so they fade naturally
          life: 70 + Math.random() * 40
        });
      }

      let frame = 0;
      function draw() {
        frame++;
        ctx.clearRect(0, 0, rect.width, rect.height);
        for (const p of particles) {
          p.y += p.speedY;
          p.x += p.speedX + Math.sin((p.y + frame) * 0.02) * 0.4;
          p.life -= 1;
          const opacity = Math.max(0, Math.min(1, p.life / 100));

          ctx.beginPath();
          ctx.shadowColor = 'rgba(212,175,55,0.35)';
          ctx.shadowBlur = 6;
          ctx.fillStyle = `rgba(212,175,55,${0.65 * opacity})`;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        if (frame < 220) requestAnimationFrame(draw); else sandCanvas.remove();
      }
      // Render first frame immediately so particles are visible without delay
      draw();
      requestAnimationFrame(draw);
    } else {
      sandCanvas.remove();
    }
  }

  // Active nav underline on scroll
  const sectionsForNav = [
    { id: '#about', link: 'a[href="#about"]' },
    { id: '#process', link: 'a[href="#process"]' },
    { id: '#why', link: 'a[href="#why"]' },
    { id: '#contact', link: 'a[href="#contact"]' }
  ];
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const item = sectionsForNav.find(s => s.id === '#' + entry.target.id);
      if (!item) return;
      const link = document.querySelector(item.link);
      if (!link) return;
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { threshold: 0.6 });

  sectionsForNav.forEach(s => {
    const el = document.querySelector(s.id);
    if (el) navObserver.observe(el);
  });

  // Progress bar
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }

  // Smooth section transitions
  const sections = document.querySelectorAll('.section');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => sectionObserver.observe(section));

  // Animated counters
  const statNumbers = document.querySelectorAll('.stat-number');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = parseFloat(target.dataset.target);
        animateCounter(target, finalValue);
        statObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => statObserver.observe(stat));

  function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60; // 60fps animation
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = target === 99.9 ? current.toFixed(1) : Math.floor(current);
    }, 16);
  }

  // Testimonials carousel
  let currentTestimonial = 0;
  const testimonials = document.querySelectorAll('.testimonial-slide');
  
  window.changeTestimonial = function(direction) {
    testimonials[currentTestimonial].classList.remove('active');
    currentTestimonial = (currentTestimonial + direction + testimonials.length) % testimonials.length;
    testimonials[currentTestimonial].classList.add('active');
  };

  // Auto-rotate testimonials
  setInterval(() => {
    changeTestimonial(1);
  }, 5000);

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

  // Form submission with email link
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

      // Get form data
      const name = data.get('name');
      const email = data.get('email');
      const whatsapp = data.get('whatsapp') || 'Not provided';
      const message = data.get('message');

      // Create email subject and body
      const subject = `New Inquiry from ${name}`;
      const body = `Name: ${name}\nEmail: ${email}\nWhatsApp: ${whatsapp}\n\nMessage:\n${message}`;

      // Create mailto link
      const mailtoLink = `mailto:rodgerschesoni@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Show success message
      alert('Your email client will open with the inquiry details. Please send the email to complete your inquiry.');
      form.reset();
    });
  }
})();


