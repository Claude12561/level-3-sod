// js/main.js - Advanced JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Counter animation
  const counters = document.querySelectorAll('.counter');
  let counted = false;
  function animateCounters() {
    if (counted) return;
    counted = true;
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      let current = 0;
      const increment = target / 50;
      const update = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.innerText = target;
          clearInterval(update);
        } else {
          counter.innerText = Math.floor(current);
        }
      }, 30);
    });
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });
  
  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) observer.observe(statsSection);

  // Toast notification
  function showToast(message, isSuccess = true) {
    const toast = document.getElementById('toastMessage');
    toast.textContent = message;
    toast.style.background = isSuccess ? '#0f2b3d' : '#9b2c2c';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }

  // Apply Now Button
  const applyBtn = document.getElementById('applyNowBtn');
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      alert('🎓 Thank you for your interest! Please visit our Contact page to start your application.');
      showToast('Application interest registered!', true);
    });
  }

  // Contact Form Handling (on contact.html)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const message = document.getElementById('message')?.value.trim();
      if (!name || !email) {
        alert('Please fill in all required fields.');
        showToast('Please fill required fields', false);
        return;
      }
      if (!/^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      alert(`Thank you ${name}! We'll contact you at ${email} soon.`);
      showToast('Message sent successfully!', true);
      contactForm.reset();
    });
  }

  // Gallery Lightbox
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img')?.src;
        if (imgSrc) {
          const modal = document.createElement('div');
          modal.style.position = 'fixed';
          modal.style.top = '0';
          modal.style.left = '0';
          modal.style.width = '100%';
          modal.style.height = '100%';
          modal.style.background = 'rgba(0,0,0,0.9)';
          modal.style.display = 'flex';
          modal.style.alignItems = 'center';
          modal.style.justifyContent = 'center';
          modal.style.zIndex = '2000';
          modal.style.cursor = 'pointer';
          const img = document.createElement('img');
          img.src = imgSrc;
          img.style.maxWidth = '90%';
          img.style.maxHeight = '90%';
          img.style.borderRadius = '12px';
          modal.appendChild(img);
          modal.addEventListener('click', () => modal.remove());
          document.body.appendChild(modal);
        }
      });
    });
  }

  // Scroll reveal animation
  const revealElements = document.querySelectorAll('.feature-card, .program-card, .staff-card, .gallery-item, .partner-card');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    revealObserver.observe(el);
  });
});