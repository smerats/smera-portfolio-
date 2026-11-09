/**
 * Smera T S — Main Application Logic
 * Interactive UI, Navigation Spy, Project Modals, 3D Tilt & Contact Form
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // =========================================================================
  // 1. PRELOADER
  // =========================================================================
  const preloader = document.getElementById('page-preloader');
  window.addEventListener('load', function () {
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add('loaded');
      }, 400);
    }
  });
  // Fallback in case load already fired
  setTimeout(() => {
    if (preloader && !preloader.classList.contains('loaded')) {
      preloader.classList.add('loaded');
    }
  }, 1800);

  // =========================================================================
  // 2. STICKY NAVBAR & SCROLL PROGRESS
  // =========================================================================
  const siteHeader = document.querySelector('.site-header');
  const scrollProgressBar = document.getElementById('scroll-progress-bar');
  const backToTopBtn = document.getElementById('back-to-top-btn');
  const progressCircle = document.querySelector('.progress-ring-circle');
  let circumference = 0;

  if (progressCircle) {
    const radius = progressCircle.r.baseVal.value;
    circumference = 2 * Math.PI * radius;
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference;
  }

  function handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    // Header Background
    if (siteHeader) {
      if (scrollTop > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Top Progress Bar
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }

    // Back to Top Button Visibility & Ring
    if (backToTopBtn) {
      if (scrollTop > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }

      if (progressCircle && circumference > 0) {
        const offset = circumference - (scrollPercent / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // =========================================================================
  // 3. NAVIGATION SPY & SMOOTH SCROLLING
  // =========================================================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollPos = (window.scrollY || document.documentElement.scrollTop) + 160;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // =========================================================================
  // 4. MOBILE DRAWER NAVIGATION
  // =========================================================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileOverlay = document.getElementById('mobile-overlay');

  function closeMobileNav() {
    if (mobileToggle) mobileToggle.classList.remove('active');
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (mobileOverlay) mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function openMobileNav() {
    if (mobileToggle) mobileToggle.classList.add('active');
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (mobileOverlay) mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', function () {
      if (mobileDrawer && mobileDrawer.classList.contains('open')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileNav);
  }

  // Close mobile drawer on clicking any link inside
  const mobileLinks = document.querySelectorAll('.mobile-nav-links .nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // =========================================================================
  // 5. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-left, .reveal-right, .reveal-scale');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver not supported
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // =========================================================================
  // 6. CUSTOM CURSOR GLOW EFFECT (Desktop Only)
  // =========================================================================
  const cursorGlow = document.getElementById('cursor-glow');
  const cursorDot = document.getElementById('cursor-dot');

  if (cursorGlow && cursorDot && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;

    window.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    // Smooth cursor glow lag
    function renderCursor() {
      glowX += (mouseX - glowX) * 0.15;
      glowY += (mouseY - glowY) * 0.15;
      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Interactive hover scaling on links & buttons
    const interactiveTargets = document.querySelectorAll('a, button, .project-card, .skill-category-card, .about-info-item');
    interactiveTargets.forEach(target => {
      target.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(2.2)';
        cursorDot.style.backgroundColor = '#8b5cf6';
      });
      target.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorDot.style.backgroundColor = 'var(--accent-cyan)';
      });
    });
  }

  // =========================================================================
  // 7. 3D CARD TILT ON HOVER
  // =========================================================================
  const tiltCards = document.querySelectorAll('.tilt-card');
  if (window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  // =========================================================================
  // 8. SKILLS CATEGORY FILTER
  // =========================================================================
  const skillTabBtns = document.querySelectorAll('.skill-tab-btn');
  const skillCategoryCards = document.querySelectorAll('.skill-category-card');

  skillTabBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      skillTabBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');

      skillCategoryCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // =========================================================================
  // 9. PROJECT DETAILS MODAL
  // =========================================================================
  const projectModalBackdrop = document.getElementById('project-modal-backdrop');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  // Rich Project Data Structure
  const projectDatabase = {
    'deepfake-audio': {
      title: 'Deepfake Audio Detection',
      category: 'AI & Deep Learning',
      image: 'assets/images/projects/deepfake-audio.svg',
      desc: 'An AI-powered application that detects whether uploaded or recorded audio is real or fake using MFCC feature extraction and CNN-based classification.',
      tech: ['Python', 'Flask', 'PyTorch', 'Librosa', 'CNN', 'SQLite'],
      features: [
        'MFCC (Mel-Frequency Cepstral Coefficients) audio feature extraction pipeline.',
        'High-accuracy Convolutional Neural Network (CNN) classification model.',
        'Interactive web interface for drag-and-drop audio uploads and live microphone recordings.',
        'Audio waveform & spectrogram visualization to visually inspect synthetic artifacts.',
        'Lightweight SQLite database storage for analysis logs and confidence analytics.'
      ],
      githubUrl: 'https://github.com/smerats/deepfake-audio-detection',
      isPlaceholderRepo: true
    },
    'kerala-tourism': {
      title: 'Kerala Tourism Assistant',
      category: 'Conversational AI / RAG',
      image: 'assets/images/projects/kerala-tourism.svg',
      desc: 'An AI-powered tourism assistant that provides information and recommendations about tourist destinations in Kerala using retrieval-based techniques and a conversational interface.',
      tech: ['Python', 'Streamlit', 'FAISS', 'Sentence Transformers', 'Mistral'],
      features: [
        'Retrieval-Augmented Generation (RAG) framework tailored to Kerala’s travel destinations.',
        'Dense vector embeddings generated via Sentence Transformers (all-MiniLM-L6-v2).',
        'Sub-millisecond semantic search utilizing FAISS (Facebook AI Similarity Search).',
        'Mistral LLM integration for conversational responses, itineraries, and travel suggestions.',
        'Streamlit interactive web dashboard for real-time natural language tourist queries.'
      ],
      githubUrl: 'https://github.com/smerats/KERALA-TOURISM-ASSISTANT',
      isPlaceholderRepo: false
    },
    'pixradar': {
      title: 'PixRadar — Event Photography Platform',
      category: 'Computer Vision & Matching',
      image: 'assets/images/projects/pixradar.svg',
      desc: 'An event photography platform that uses facial matching technology to help users identify and find their event photographs.',
      tech: ['Python', 'Computer Vision', 'Face Recognition', 'Web Framework', 'Image Processing'],
      features: [
        'Automated facial detection and 128-dimensional facial landmark feature extraction.',
        'High-speed cosine similarity matching against thousands of event gallery photos.',
        'Instant attendee photo discovery: attendees upload a selfie to instantly find all their photos.',
        'Clustering algorithm to organize high-volume event albums automatically.',
        'Secure and privacy-conscious design with fast localized matching workflows.'
      ],
      githubUrl: 'https://github.com/smerats/pixradar',
      isPlaceholderRepo: true
    }
  };

  function openProjectModal(projectId) {
    const data = projectDatabase[projectId];
    if (!data || !projectModalBackdrop) return;

    // Populate modal contents
    document.getElementById('modal-img').src = data.image;
    document.getElementById('modal-img').alt = data.title;
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-category').textContent = data.category;
    document.getElementById('modal-desc').textContent = data.desc;

    // Tech Tags
    const techListEl = document.getElementById('modal-tech-list');
    techListEl.innerHTML = '';
    data.tech.forEach(t => {
      const span = document.createElement('span');
      span.className = 'tech-tag';
      span.textContent = t;
      techListEl.appendChild(span);
    });

    // Features List
    const featuresListEl = document.getElementById('modal-features-list');
    featuresListEl.innerHTML = '';
    data.features.forEach(f => {
      const li = document.createElement('li');
      li.className = 'modal-feature-item';
      li.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${f}</span>
      `;
      featuresListEl.appendChild(li);
    });

    // Modal GitHub Button
    const modalGithubBtn = document.getElementById('modal-github-btn');
    if (modalGithubBtn) {
      modalGithubBtn.href = data.githubUrl;
      modalGithubBtn.target = '_blank';
      modalGithubBtn.rel = 'noopener noreferrer';
      
      const badge = modalGithubBtn.querySelector('.repo-placeholder-badge');
      if (badge) {
        badge.style.display = data.isPlaceholderRepo ? 'inline-block' : 'none';
      }
    }

    projectModalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (projectModalBackdrop) {
      projectModalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Trigger buttons
  const viewDetailBtns = document.querySelectorAll('[data-open-modal]');
  viewDetailBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const projectId = this.getAttribute('data-open-modal');
      openProjectModal(projectId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModalBackdrop) {
    projectModalBackdrop.addEventListener('click', function (e) {
      if (e.target === projectModalBackdrop) {
        closeProjectModal();
      }
    });
  }

  // Escape key closes modal
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && projectModalBackdrop && projectModalBackdrop.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // =========================================================================
  // 10. INTERACTIVE CONTACT FORM & QUICK COPY
  // =========================================================================
  const contactForm = document.getElementById('portfolio-contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = document.getElementById('sender-name');
      const emailInput = document.getElementById('sender-email');
      const subjectInput = document.getElementById('message-subject');
      const messageInput = document.getElementById('message-body');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : 'Inquiry from Portfolio';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        alert('Please fill in your name, email, and message before sending.');
        return;
      }

      // Pre-compose mailto URI
      const targetEmail = 'smerasam2006@gmail.com';
      const mailtoSubject = encodeURIComponent(`[Portfolio Contact] ${subject} - from ${name}`);
      const mailtoBody = encodeURIComponent(`Hi Smera,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent via smera-portfolio website`);
      
      const mailtoLink = `mailto:${targetEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

      // Open email client
      window.location.href = mailtoLink;

      // Show confirmation
      if (formFeedback) {
        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = `
          <strong>Message Prepared!</strong> Opening your email client to send to Smera. If your mail client didn't launch automatically, you can also connect via LinkedIn or directly copy the email address.
        `;
        formFeedback.style.display = 'block';
      }

      contactForm.reset();
    });
  }

  // Clipboard Quick Copy Utility
  const copyButtons = document.querySelectorAll('[data-copy-text]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const textToCopy = this.getAttribute('data-copy-text');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalTitle = this.getAttribute('title') || 'Copy';
        this.setAttribute('title', 'Copied to clipboard!');
        
        // Visual feedback
        const originalColor = this.style.color;
        this.style.color = '#34d399';
        setTimeout(() => {
          this.style.color = originalColor;
          this.setAttribute('title', originalTitle);
        }, 1800);
      }).catch(err => {
        console.error('Copy failed:', err);
      });
    });
  });

  // Log confirmation
  console.log('⚡ Smera T S Portfolio initialized successfully with interactive modules.');
});

