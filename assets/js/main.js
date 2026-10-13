/**
 * Veerabhadra S (Veerabhadri / Bhadri) - Portfolio Scripts
 * Editorial Monochromatic Architecture & Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. Dark Theme Enforcer (Default Theme)
  // =========================================================================
  document.documentElement.classList.add('dark');
  localStorage.setItem('theme', 'dark');



  // =========================================================================
  // 3. Curated Photo Carousel & Mobile Strategy Slide Cards Navigation
  // =========================================================================
  const carouselStrip = document.getElementById('carouselStrip');
  const carouselPrevBtn = document.getElementById('carouselPrev');
  const carouselNextBtn = document.getElementById('carouselNext');

  if (carouselStrip && carouselPrevBtn && carouselNextBtn) {
    const scrollStep = () => {
      const firstCard = carouselStrip.querySelector('.carousel-card');
      return firstCard ? firstCard.clientWidth + 20 : 320;
    };

    carouselPrevBtn.addEventListener('click', () => {
      carouselStrip.scrollBy({ left: -scrollStep(), behavior: 'smooth' });
    });

    carouselNextBtn.addEventListener('click', () => {
      carouselStrip.scrollBy({ left: scrollStep(), behavior: 'smooth' });
    });
  }

  // Mobile-Only Strategy Slide Cards Navigation
  const strategiesTrack = document.getElementById('strategiesTrack');
  const strategiesPrevBtn = document.getElementById('strategiesPrev');
  const strategiesNextBtn = document.getElementById('strategiesNext');

  if (strategiesTrack && strategiesPrevBtn && strategiesNextBtn) {
    const strategyStep = () => {
      const firstSlide = strategiesTrack.querySelector('.strategy-slide-card');
      return firstSlide ? firstSlide.clientWidth + 16 : 260;
    };

    strategiesPrevBtn.addEventListener('click', () => {
      strategiesTrack.scrollBy({ left: -strategyStep(), behavior: 'smooth' });
    });

    strategiesNextBtn.addEventListener('click', () => {
      strategiesTrack.scrollBy({ left: strategyStep(), behavior: 'smooth' });
    });
  }



  // =========================================================================
  // 5. Contact / Newsletter Form Redirection to WhatsApp (+91 96326 45625)
  // =========================================================================
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const contactInput = document.getElementById('contactInput');
      const messageInput = document.getElementById('message');
      const termsCheckbox = document.getElementById('termsCheckbox');

      if (termsCheckbox && !termsCheckbox.checked) {
        alert('Please accept the terms to proceed with academic mentorship inquiries.');
        termsCheckbox.focus();
        return;
      }

      const name = nameInput ? nameInput.value.trim() : '';
      const contact = contactInput ? contactInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : '';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Connecting to WhatsApp...';
      }

      // Pre-filled WhatsApp message
      const text = encodeURIComponent(
        `Hello Veerabhadra Sir,\n\nName: ${name}\nEmail / Phone: ${contact}\nInquiry / Message: ${message}\n\n[Submitted via Veerabhadra S Editorial Portfolio]`
      );
      const whatsappNumber = '919632645625';
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;

      setTimeout(() => {
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
        if (formSuccess) {
          formSuccess.style.display = 'block';
          formSuccess.innerHTML = `
            Redirecting to WhatsApp... If it didn't open automatically, 
            <a href="${whatsappUrl}" target="_blank" rel="noopener" style="text-decoration: underline; font-weight: 700; color: inherit;">
              click here to send message directly via WhatsApp (+91 96326 45625)
            </a>.
          `;
        }

        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank');
      }, 350);
    });
  }

  // =========================================================================
  // 6. Hamburger Menu Drawer (Mobile Navigation)
  // =========================================================================
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenuMobile = document.getElementById('navMenuMobile');

  if (hamburgerBtn && navMenuMobile) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = hamburgerBtn.classList.toggle('active');
      navMenuMobile.classList.toggle('active', isActive);
      hamburgerBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    // Close on navigation link click
    navMenuMobile.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        navMenuMobile.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!navMenuMobile.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        hamburgerBtn.classList.remove('active');
        navMenuMobile.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenuMobile.classList.contains('active')) {
        hamburgerBtn.classList.remove('active');
        navMenuMobile.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // =========================================================================
  // 7. Lightbox Modal Viewer (Uncropped Natural Aspect Ratio)
  // =========================================================================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  const galleryItems = document.querySelectorAll('.gallery-item, .carousel-card');

  if (galleryItems.length && lightbox && lightboxImg) {
    const imageUrls = Array.from(galleryItems)
      .map((item) => {
        const img = item.querySelector('img');
        return img ? img.getAttribute('src') : '';
      })
      .filter(Boolean);

    let currentIndex = 0;

    function showImage(index) {
      if (!imageUrls.length || !lightboxImg) return;
      if (index < 0) index = imageUrls.length - 1;
      if (index >= imageUrls.length) index = 0;
      currentIndex = index;
      lightboxImg.src = imageUrls[currentIndex];
    }

    function openLightbox(index) {
      if (!lightbox) return;
      showImage(index);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    galleryItems.forEach((item, idx) => {
      item.addEventListener('click', () => openLightbox(idx));
    });

    lightboxClose?.addEventListener('click', closeLightbox);

    lightboxPrev?.addEventListener('click', (e) => {
      e.stopPropagation();
      showImage(currentIndex - 1);
    });

    lightboxNext?.addEventListener('click', (e) => {
      e.stopPropagation();
      showImage(currentIndex + 1);
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
      if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });
  }

  // =========================================================================
  // 8. Privacy Policy & Imprint Modal
  // =========================================================================
  const legalModal = document.getElementById('legalModal');
  const legalClose = document.getElementById('legalClose');
  const legalTriggers = document.querySelectorAll('.legal-modal-trigger');

  if (legalModal) {
    legalTriggers.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        legalModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    legalClose?.addEventListener('click', () => {
      legalModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    legalModal.addEventListener('click', (e) => {
      if (e.target === legalModal) {
        legalModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});
