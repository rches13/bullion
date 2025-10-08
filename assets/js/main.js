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


