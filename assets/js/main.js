/**
 * MEDITATION CENTER — Master JavaScript
 * Vanilla JS implementations for navigation, timetable filters, accordion,
 * gallery lightbox, demo audio player, forms validation, and scroll reveals.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initActiveNavLink();
  initScrollReveal();
  initBackToTop();
  initAccordion();
  initTimetableFilters();
  initGalleryLightbox();
  initDemoAudioPlayer();
  initBookingForm();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. Mobile Navigation & Dropdowns
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const menuToggle = document.querySelector('.menu-toggle');
  const primaryNav = document.querySelector('.primary-nav');
  const navDropdowns = document.querySelectorAll('.nav-dropdown');

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      primaryNav.classList.toggle('nav-open');
      document.body.classList.toggle('no-scroll', !isExpanded);
    });

    // Close when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (!primaryNav.contains(e.target) && !menuToggle.contains(e.target) && primaryNav.classList.contains('nav-open')) {
        primaryNav.classList.remove('nav-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      }
    });
  }

  // Mobile dropdown toggle
  navDropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    if (toggle) {
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 820) {
          e.preventDefault();
          dropdown.classList.toggle('open');
        }
      });
    }
  });
}

/* --------------------------------------------------------------------------
   2. Active Nav Link Detection
   -------------------------------------------------------------------------- */
function initActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      const parentDropdown = link.closest('.nav-dropdown');
      if (parentDropdown) {
        const toggle = parentDropdown.querySelector('.dropdown-toggle');
        if (toggle) toggle.classList.add('active');
      }
    }
  });
}

/* --------------------------------------------------------------------------
   3. Scroll Reveal Animation
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.12
    });

    reveals.forEach(el => revealObserver.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('active'));
  }
}

/* --------------------------------------------------------------------------
   4. Back To Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   5. Accessible Accordion (FAQ & Info)
   -------------------------------------------------------------------------- */
function initAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  if (!accordionItems.length) return;

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');

    if (!header || !content) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close other accordions in the same wrapper if desired
      const wrapper = item.closest('.accordion-wrapper');
      if (wrapper) {
        wrapper.querySelectorAll('.accordion-item').forEach(sibling => {
          if (sibling !== item) {
            sibling.classList.remove('active');
            const sibHeader = sibling.querySelector('.accordion-header');
            const sibContent = sibling.querySelector('.accordion-content');
            if (sibHeader) sibHeader.setAttribute('aria-expanded', 'false');
            if (sibContent) sibContent.style.maxHeight = null;
          }
        });
      }

      if (isActive) {
        item.classList.remove('active');
        header.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. Timetable Schedule Filters
   -------------------------------------------------------------------------- */
function initTimetableFilters() {
  const timetable = document.getElementById('session-timetable');
  if (!timetable) return;

  const dayFilter = document.getElementById('filter-day');
  const typeFilter = document.getElementById('filter-type');
  const levelFilter = document.getElementById('filter-level');
  const timeFilter = document.getElementById('filter-time');
  const resetBtn = document.getElementById('filter-reset');
  const emptyNotice = document.getElementById('filter-empty-state');
  const rows = timetable.querySelectorAll('tbody tr');

  function applyFilters() {
    const selectedDay = dayFilter ? dayFilter.value.toLowerCase() : 'all';
    const selectedType = typeFilter ? typeFilter.value.toLowerCase() : 'all';
    const selectedLevel = levelFilter ? levelFilter.value.toLowerCase() : 'all';
    const selectedTime = timeFilter ? timeFilter.value.toLowerCase() : 'all';

    let visibleCount = 0;

    rows.forEach(row => {
      const rowDay = (row.getAttribute('data-day') || '').toLowerCase();
      const rowType = (row.getAttribute('data-type') || '').toLowerCase();
      const rowLevel = (row.getAttribute('data-level') || '').toLowerCase();
      const rowTimeOfDay = (row.getAttribute('data-timeofday') || '').toLowerCase();

      const matchDay = (selectedDay === 'all' || rowDay === selectedDay);
      const matchType = (selectedType === 'all' || rowType === selectedType);
      const matchLevel = (selectedLevel === 'all' || rowLevel === selectedLevel);
      const matchTime = (selectedTime === 'all' || rowTimeOfDay === selectedTime);

      if (matchDay && matchType && matchLevel && matchTime) {
        row.style.display = '';
        visibleCount++;
      } else {
        row.style.display = 'none';
      }
    });

    if (emptyNotice) {
      emptyNotice.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  [dayFilter, typeFilter, levelFilter, timeFilter].forEach(filter => {
    if (filter) {
      filter.addEventListener('change', applyFilters);
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (dayFilter) dayFilter.value = 'all';
      if (typeFilter) typeFilter.value = 'all';
      if (levelFilter) levelFilter.value = 'all';
      if (timeFilter) timeFilter.value = 'all';
      applyFilters();
    });
  }
}

/* --------------------------------------------------------------------------
   7. Gallery Filters & Interactive Lightbox
   -------------------------------------------------------------------------- */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const lightbox = document.getElementById('gallery-lightbox');

  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          const itemCat = item.getAttribute('data-category');
          if (category === 'all' || itemCat === category) {
            item.style.display = '';
            item.style.opacity = '1';
          } else {
            item.style.display = 'none';
            item.style.opacity = '0';
          }
        });
      });
    });
  }

  if (!lightbox || !galleryItems.length) return;

  const lightboxImgContainer = lightbox.querySelector('.lightbox-image-container');
  const lightboxTitle = lightbox.querySelector('.lightbox-title');
  const lightboxDesc = lightbox.querySelector('.lightbox-desc');
  const closeBtn = lightbox.querySelector('.lightbox-close-btn');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let currentIndex = 0;
  let activeList = [];

  function getVisibleItems() {
    return Array.from(galleryItems).filter(item => item.style.display !== 'none');
  }

  function updateLightbox(index) {
    activeList = getVisibleItems();
    if (!activeList.length) return;

    if (index < 0) index = activeList.length - 1;
    if (index >= activeList.length) index = 0;
    currentIndex = index;

    const currentItem = activeList[currentIndex];
    const title = currentItem.getAttribute('data-title') || 'Meditation Sanctuary';
    const desc = currentItem.getAttribute('data-desc') || 'Peaceful mindfulness space';
    const filename = currentItem.getAttribute('data-img') || 'gallery-image.jpg';
    const ratio = currentItem.getAttribute('data-ratio') || '16 / 9';

    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxDesc) lightboxDesc.textContent = desc;

    // Render actual image inside lightbox
    if (lightboxImgContainer) {
      lightboxImgContainer.innerHTML = `
        <div style="width: 100%; max-height: 70vh; display: flex; align-items: center; justify-content: center; background-color: #1a231d;">
          <img src="images/${filename}" alt="${title}" style="max-width: 100%; max-height: 70vh; object-fit: contain; display: block;">
        </div>
      `;
    }
  }

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      activeList = getVisibleItems();
      const index = activeList.indexOf(item);
      updateLightbox(index >= 0 ? index : 0);
      lightbox.classList.add('active');
      document.body.classList.add('no-scroll');
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => updateLightbox(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => updateLightbox(currentIndex + 1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') updateLightbox(currentIndex - 1);
    if (e.key === 'ArrowRight') updateLightbox(currentIndex + 1);
  });
}

/* --------------------------------------------------------------------------
   8. Demo Audio Player Simulation
   -------------------------------------------------------------------------- */
function initDemoAudioPlayer() {
  const player = document.querySelector('.audio-player-card');
  if (!player) return;

  const playBtn = player.querySelector('.play-pause-btn');
  const playIcon = player.querySelector('.play-icon');
  const pauseIcon = player.querySelector('.pause-icon');
  const progressBar = player.querySelector('.player-progress-bar');
  const progressFill = player.querySelector('.progress-fill');
  const currentTimeDisplay = player.querySelector('.current-time');
  const totalDurationDisplay = player.querySelector('.total-time');
  const trackSelector = document.getElementById('demo-track-select');
  const trackTitle = player.querySelector('.player-track-info h3');
  const trackSub = player.querySelector('.player-track-sub');

  let isPlaying = false;
  let currentSeconds = 84; // sample 01:24
  let totalSeconds = 900;  // 15:00
  let intervalTimer = null;

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  function updateDisplay() {
    if (currentTimeDisplay) currentTimeDisplay.textContent = formatTime(currentSeconds);
    if (totalDurationDisplay) totalDurationDisplay.textContent = formatTime(totalSeconds);
    if (progressFill) {
      const pct = (currentSeconds / totalSeconds) * 100;
      progressFill.style.width = `${pct}%`;
    }
  }

  updateDisplay();

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      if (isPlaying) {
        if (playIcon) playIcon.style.display = 'none';
        if (pauseIcon) pauseIcon.style.display = 'block';
        intervalTimer = setInterval(() => {
          if (currentSeconds < totalSeconds) {
            currentSeconds++;
            updateDisplay();
          } else {
            clearInterval(intervalTimer);
            isPlaying = false;
            if (playIcon) playIcon.style.display = 'block';
            if (pauseIcon) pauseIcon.style.display = 'none';
          }
        }, 1000);
      } else {
        if (playIcon) playIcon.style.display = 'block';
        if (pauseIcon) pauseIcon.style.display = 'none';
        clearInterval(intervalTimer);
      }
    });
  }

  if (progressBar) {
    progressBar.addEventListener('click', (e) => {
      const rect = progressBar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const pct = Math.max(0, Math.min(1, clickX / width));
      currentSeconds = Math.round(pct * totalSeconds);
      updateDisplay();
    });
  }

  if (trackSelector) {
    trackSelector.addEventListener('change', (e) => {
      const opt = e.target.selectedOptions[0];
      if (opt) {
        if (trackTitle) trackTitle.textContent = opt.textContent;
        const dur = parseInt(opt.getAttribute('data-duration') || '900', 10);
        totalSeconds = dur;
        currentSeconds = 0;
        updateDisplay();
        if (isPlaying) {
          clearInterval(intervalTimer);
          isPlaying = false;
          if (playIcon) playIcon.style.display = 'block';
          if (pauseIcon) pauseIcon.style.display = 'none';
        }
      }
    });
  }
}

/* --------------------------------------------------------------------------
   9. Booking Form Validation & Safe Demo Confirmation
   -------------------------------------------------------------------------- */
function initBookingForm() {
  const form = document.getElementById('booking-enquiry-form');
  const feedbackModal = document.getElementById('booking-feedback-modal');
  const closeFeedbackBtn = document.getElementById('close-feedback-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Required inputs
    const requiredInputs = form.querySelectorAll('[required]');
    requiredInputs.forEach(input => {
      if (!input.value.trim()) {
        input.classList.add('error');
        isValid = false;
      } else {
        input.classList.remove('error');
      }
    });

    // Email format
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value.trim()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        emailInput.classList.add('error');
        isValid = false;
      }
    }

    if (isValid) {
      if (feedbackModal) {
        feedbackModal.classList.add('active');
      }
      form.reset();
    }
  });

  // Remove error on input
  form.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', () => el.classList.remove('error'));
    el.addEventListener('change', () => el.classList.remove('error'));
  });

  if (closeFeedbackBtn && feedbackModal) {
    closeFeedbackBtn.addEventListener('click', () => {
      feedbackModal.classList.remove('active');
    });
  }
}

/* --------------------------------------------------------------------------
   10. Contact Form Validation & Safe Demo Confirmation
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-us-form');
  const feedbackModal = document.getElementById('contact-feedback-modal');
  const closeFeedbackBtn = document.getElementById('close-contact-feedback-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const requiredInputs = form.querySelectorAll('[required]');
    requiredInputs.forEach(input => {
      if (!input.value.trim()) {
        input.classList.add('error');
        isValid = false;
      } else {
        input.classList.remove('error');
      }
    });

    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value.trim()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        emailInput.classList.add('error');
        isValid = false;
      }
    }

    if (isValid) {
      if (feedbackModal) {
        feedbackModal.classList.add('active');
      }
      form.reset();
    }
  });

  form.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', () => el.classList.remove('error'));
  });

  if (closeFeedbackBtn && feedbackModal) {
    closeFeedbackBtn.addEventListener('click', () => {
      feedbackModal.classList.remove('active');
    });
  }
}
