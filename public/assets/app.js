/**
 * ON CALL TRAILERS — LUXURY AUTOMOTIVE CINEMATIC MOTION ENGINE
 * AB Web Studio (https://abwebstudio.com.au)
 * 60fps GPU-Accelerated Animation & Telemetry Interaction Suite
 */

document.addEventListener('DOMContentLoaded', () => {
  initAmbientParticles();
  initHeader();
  initMobileMenu();
  init3DTilt();
  initTrailerSpotlight();
  initConfigurator();
  initFaqAccordion();
  initTowingTabs();
  initScrollReveals();
  initAnimatedCounters();
  initMagneticButtons();
  initParallax();
});

/* 1. CINEMATIC AMBIENT PARTICLES CANVAS */
function initAmbientParticles() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let canvas = document.getElementById('ambient-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'ambient-canvas';
    document.body.prepend(canvas);
  }

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = window.innerWidth < 768 ? 30 : 65;
  const particles = [];
  const colors = ['#087EFF', '#00CFFF', '#C0C7D0', '#38bdf8'];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 0.45,
      vy: -Math.random() * 0.55 - 0.15,
      alpha: Math.random() * 0.7 + 0.2,
      pulse: Math.random() * 0.02 + 0.01
    });
  }

  let mouseX = width / 2;
  let mouseY = height / 2;
  let hasMouse = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    hasMouse = true;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha += Math.sin(Date.now() * p.pulse * 0.1) * 0.005;

      // Mouse attraction
      if (hasMouse) {
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          p.x += (dx / dist) * 0.4;
          p.y += (dy / dist) * 0.4;
        }
      }

      if (p.y < -10) p.y = height + 10;
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0.1, Math.min(0.85, p.alpha));
      ctx.shadowBlur = p.radius * 6;
      ctx.shadowColor = p.color;
      ctx.fill();
    }

    ctx.shadowBlur = 0;
    requestAnimationFrame(render);
  }

  render();
}

/* 2. HEADER SCROLL TRANSITION */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('bg-[#05080D]/95', 'backdrop-blur-xl', 'border-electric/30', 'shadow-2xl');
      header.classList.remove('bg-ink/30', 'border-white/15');
    } else {
      header.classList.remove('bg-[#05080D]/95', 'backdrop-blur-xl', 'border-electric/30', 'shadow-2xl');
      header.classList.add('bg-ink/30', 'border-white/15');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* 3. MOBILE MENU DRAWER */
function initMobileMenu() {
  const burger = document.querySelector('.site-burger');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('mobile-drawer-close');
  if (!burger || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  burger.addEventListener('click', (e) => {
    e.preventDefault();
    drawer.classList.contains('open') ? closeDrawer() : openDrawer();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
    });
  }

  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => closeDrawer());
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* 4. 3D TILT EFFECT ON CARDS */
function init3DTilt() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 1024) return;

  const tiltCards = document.querySelectorAll('.tilt-card, .showroom-stage, .glass-panel');
  tiltCards.forEach(card => {
    // Add glare element if missing
    let glare = card.querySelector('.tilt-glare');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'tilt-glare';
      card.appendChild(glare);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
      glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.18), transparent 60%)`;
      glare.style.opacity = '1';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      glare.style.opacity = '0';
    });
  });
}

/* 5. INTERACTIVE TRAILER SPOTLIGHT WITH LASER SCANNER */
function initTrailerSpotlight() {
  const container = document.querySelector('.spotlight-container');
  if (container && !container.querySelector('.laser-scan-line')) {
    const laser = document.createElement('div');
    laser.className = 'laser-scan-line';
    container.appendChild(laser);
  }

  const triggers = document.querySelectorAll('.hotspot-trigger');
  const cards = document.querySelectorAll('.hotspot-card');
  if (!triggers.length) return;

  function closeAll() {
    triggers.forEach(t => t.classList.remove('active'));
    cards.forEach(c => c.classList.remove('visible'));
  }

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = trigger.getAttribute('data-target');
      const targetCard = document.getElementById(targetId);
      const isActive = trigger.classList.contains('active');

      closeAll();

      if (!isActive && targetCard) {
        trigger.classList.add('active');
        targetCard.classList.add('visible');
      }
    });

    trigger.addEventListener('mouseenter', () => {
      if (window.innerWidth >= 1024) {
        const targetId = trigger.getAttribute('data-target');
        const targetCard = document.getElementById(targetId);
        closeAll();
        if (targetCard) {
          trigger.classList.add('active');
          targetCard.classList.add('visible');
        }
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.hotspot-card') && !e.target.closest('.hotspot-trigger')) {
      closeAll();
    }
  });
}

/* 6. LIVE ESTIMATOR & CONFIGURATOR */
function initConfigurator() {
  const slider = document.getElementById('configurator-hours');
  const hoursDisplay = document.getElementById('configurator-hours-display');
  const priceDisplay = document.getElementById('configurator-price-display');
  const durationSummary = document.getElementById('configurator-duration-summary');
  const quickButtons = document.querySelectorAll('[data-quick-hours]');
  const addonCheckboxes = document.querySelectorAll('.configurator-addon');
  const lockiiTriggerBtn = document.getElementById('configurator-lockii-trigger');

  if (!slider && !hoursDisplay) return;

  function calculateRate(hours) {
    if (hours <= 4) return 20;
    if (hours <= 8) return 40;
    if (hours <= 24) return 80;
    if (hours <= 48) return 150;
    const days = Math.ceil(hours / 24);
    return days * 70;
  }

  function update() {
    const hours = parseInt(slider ? slider.value : '4', 10);
    const base = calculateRate(hours);

    let addonsTotal = 0;
    addonCheckboxes.forEach(cb => {
      if (cb.checked) {
        addonsTotal += parseInt(cb.getAttribute('data-price') || '0', 10);
      }
    });

    const total = base + addonsTotal;

    if (hoursDisplay) {
      if (hours < 24) {
        hoursDisplay.textContent = `${hours} hrs`;
      } else {
        const d = Math.floor(hours / 24);
        const rem = hours % 24;
        hoursDisplay.textContent = rem > 0 ? `${d}d ${rem}h (${hours} hrs)` : `${d} Day${d > 1 ? 's' : ''}`;
      }
    }

    if (priceDisplay) {
      priceDisplay.textContent = `$${total}`;
      priceDisplay.classList.add('scale-105', 'text-cyan');
      setTimeout(() => priceDisplay.classList.remove('scale-105', 'text-cyan'), 200);
    }

    if (durationSummary) {
      durationSummary.textContent = `Tandem Cage Trailer · ${hoursDisplay ? hoursDisplay.textContent : hours + ' hrs'}`;
    }

    quickButtons.forEach(btn => {
      const qHours = parseInt(btn.getAttribute('data-quick-hours'), 10);
      if (qHours === hours) {
        btn.classList.add('bg-electric', 'text-white', 'border-electric', 'shadow-md', 'shadow-electric/30');
        btn.classList.remove('bg-white/5', 'text-chrome', 'border-white/10');
      } else {
        btn.classList.remove('bg-electric', 'text-white', 'border-electric', 'shadow-md', 'shadow-electric/30');
        btn.classList.add('bg-white/5', 'text-chrome', 'border-white/10');
      }
    });
  }

  if (slider) slider.addEventListener('input', update);

  quickButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const val = parseInt(btn.getAttribute('data-quick-hours'), 10);
      if (slider) {
        slider.value = val;
        update();
      }
    });
  });

  addonCheckboxes.forEach(cb => cb.addEventListener('change', update));

  if (lockiiTriggerBtn) {
    lockiiTriggerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openLockiiModal();
    });
  }

  update();
}

/* 7. LOCKII BOOKING MODAL */
function openLockiiModal() {
  let modal = document.getElementById('lockii-booking-modal');
  if (!modal) {
    createLockiiModal();
    modal = document.getElementById('lockii-booking-modal');
  }
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function createLockiiModal() {
  const modalHTML = `
    <div id="lockii-booking-modal" class="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md opacity-0 pointer-events-none transition-opacity duration-300">
      <div class="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-electric/40 bg-[#071322] p-6 sm:p-8 shadow-2xl transition-transform duration-300 scale-95" id="lockii-modal-content">
        <button id="lockii-modal-close" class="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-chrome hover:text-white hover:bg-white/20 transition-colors" aria-label="Close modal">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        <div class="flex items-center gap-3 mb-6">
          <div class="h-3 w-3 rounded-full bg-cyan animate-pulse"></div>
          <span class="text-xs uppercase tracking-widest text-cyan font-bold">Lockii Rental Management System</span>
        </div>

        <h3 class="display text-3xl sm:text-4xl text-white mb-3">Self-Service Trailer Reservation</h3>
        <p class="text-sm text-chrome mb-6">Direct connection to On Call Trailers' Lockii automated booking gateway.</p>

        <div class="space-y-4 mb-8">
          <div class="p-4 rounded-xl border border-white/10 bg-white/5 flex items-start gap-4">
            <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-electric text-xs font-bold text-white">1</span>
            <div>
              <p class="text-sm font-semibold text-white">Trailer Specification</p>
              <p class="text-xs text-chrome">Heavy-Duty Galvanised Tandem Cage Trailer (8x5 Series · 2,000kg GTM)</p>
            </div>
          </div>
          <div class="p-4 rounded-xl border border-white/10 bg-white/5 flex items-start gap-4">
            <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-electric text-xs font-bold text-white">2</span>
            <div>
              <p class="text-sm font-semibold text-white">Pickup Location</p>
              <p class="text-xs text-chrome">Sydney Metro Depot (Secure 24/7 Smart Lockbox Access)</p>
            </div>
          </div>
          <div class="p-4 rounded-xl border border-electric/30 bg-electric/10 flex items-start gap-4">
            <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan text-xs font-bold text-black">3</span>
            <div>
              <p class="text-sm font-semibold text-white">System Status: Demo Integration Mode</p>
              <p class="text-xs text-chrome">Online reservation engine is ready for live Lockii merchant credentials. Bookings can be placed immediately via phone or direct dispatch.</p>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
          <a href="tel:+61490176809" class="btn btn-primary flex-1 text-center justify-center py-3.5">
            Call +61 490 176 809 ↗
          </a>
          <button id="lockii-modal-dismiss" class="btn btn-outline flex-1 text-center justify-center py-3.5">
            Return to fleet
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const modal = document.getElementById('lockii-booking-modal');
  const close = document.getElementById('lockii-modal-close');
  const dismiss = document.getElementById('lockii-modal-dismiss');

  const hide = () => {
    modal.classList.remove('open');
    modal.style.opacity = '0';
    modal.style.pointerEvents = 'none';
    document.body.style.overflow = '';
  };

  close.addEventListener('click', hide);
  dismiss.addEventListener('click', hide);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) hide();
  });
}

/* 8. FAQ ACCORDION */
function initFaqAccordion() {
  const faqButtons = document.querySelectorAll('[aria-controls^="_R_"], .faq-trigger');
  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const panelId = btn.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      const icon = btn.querySelector('span[aria-hidden="true"], .faq-icon');

      btn.setAttribute('aria-expanded', !isExpanded);
      if (panel) {
        if (!isExpanded) {
          panel.classList.remove('grid-rows-[0fr]');
          panel.classList.add('grid-rows-[1fr]');
          panel.setAttribute('aria-hidden', 'false');
          if (icon) icon.classList.add('rotate-45');
        } else {
          panel.classList.remove('grid-rows-[1fr]');
          panel.classList.add('grid-rows-[0fr]');
          panel.setAttribute('aria-hidden', 'true');
          if (icon) icon.classList.remove('rotate-45');
        }
      }
    });
  });
}

/* 9. TOWING & CAPABILITIES TABS */
function initTowingTabs() {
  const tabs = document.querySelectorAll('[data-towing-tab]');
  const contents = document.querySelectorAll('[data-towing-content]');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const target = tab.getAttribute('data-towing-tab');

      tabs.forEach(t => {
        t.classList.remove('border-electric', 'text-white', 'bg-electric/10');
        t.classList.add('border-white/10', 'text-chrome', 'bg-white/5');
      });

      tab.classList.add('border-electric', 'text-white', 'bg-electric/10');
      tab.classList.remove('border-white/10', 'text-chrome', 'bg-white/5');

      contents.forEach(c => {
        if (c.getAttribute('data-towing-content') === target) {
          c.classList.remove('hidden');
          c.classList.add('block');
        } else {
          c.classList.add('hidden');
          c.classList.remove('block');
        }
      });
    });
  });
}

/* 10. SCROLL REVEALS */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.site-reveal, .editorial-split, .showroom-stage, .section-shell');
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => observer.observe(el));
}

/* 11. ANIMATED NUMERIC COUNTERS */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('[data-counter-target]');
  if (!counters.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-counter-target'), 10);
        const prefix = el.getAttribute('data-counter-prefix') || '';
        const suffix = el.getAttribute('data-counter-suffix') || '';
        const duration = 1600;
        const startTime = performance.now();

        function step(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          // EaseOutQuart
          const ease = 1 - Math.pow(1 - progress, 4);
          const current = Math.floor(ease * target);
          el.textContent = `${prefix}${current.toLocaleString()}${suffix}`;
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
          }
        }

        requestAnimationFrame(step);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(c => observer.observe(c));
}

/* 12. MAGNETIC BUTTON HOVER */
function initMagneticButtons() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 1024) return;

  const buttons = document.querySelectorAll('.btn-primary, .btn-magnetic');
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.24}px, ${y * 0.24}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}

/* 13. PARALLAX ON SCROLL */
function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const heroPhoto = document.querySelector('.hero-photograph img');
  if (!heroPhoto) return;

  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    if (scroll < 1000) {
      heroPhoto.style.transform = `translate3d(0, ${scroll * 0.2}px, 0)`;
    }
  }, { passive: true });
}
