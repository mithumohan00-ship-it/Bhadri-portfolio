/**
 * Veerabhadri (Bhadri) - Portfolio Scripts
 * Handles contact form and gallery lightbox cleanly on all pages.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Contact Form Submission ---
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name')?.value || '';
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      setTimeout(() => {
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        }
        if (formSuccess) {
          formSuccess.style.display = 'block';
          formSuccess.innerHTML = `Thank you, <strong>${name}</strong>! Your message has been received. You can also reach out directly via WhatsApp for a quicker reply.`;
        }
      }, 600);
    });
  }

  // --- Gallery Lightbox Viewer (Natural uncropped ratio, no captions) ---
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  if (galleryItems.length && lightbox && lightboxImg) {
    const imageUrls = Array.from(galleryItems).map((item) => {
      const img = item.querySelector('img');
      return img ? img.getAttribute('src') : '';
    }).filter(Boolean);

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
});
