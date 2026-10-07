/**
 * Medicina por Imágenes - Lógica Interactiva
 * Mendoza, Argentina
 */

document.addEventListener('DOMContentLoaded', () => {
  // Base WhatsApp helper
  const WA_PHONE = '5492615117290';
  const buildWaLink = (message) => `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(message)}`;

  /* ==========================================================================
     1. Menú Móvil Desplegable
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-menu-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileDrawer) {
    const toggleMenu = (open) => {
      const isExpanded = open !== undefined ? open : mobileToggle.getAttribute('aria-expanded') === 'true';
      const newState = !isExpanded;
      mobileToggle.setAttribute('aria-expanded', String(newState));
      mobileToggle.setAttribute('aria-label', newState ? 'Cerrar menú' : 'Abrir menú');
      mobileDrawer.classList.toggle('open', newState);
      document.body.style.overflow = newState ? 'hidden' : '';
    };

    mobileToggle.addEventListener('click', () => toggleMenu());

    // Cerrar al hacer clic en cualquier enlace del menú móvil
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        toggleMenu(false);
        mobileToggle.focus();
      }
    });
  }

  // Desplegable de Servicios en Desktop (Soporte click/touch)
  const dropdownItem = document.querySelector('.nav-item-dropdown');
  const dropdownToggle = document.getElementById('nav-dropdown-servicios');
  if (dropdownItem && dropdownToggle) {
    dropdownToggle.addEventListener('click', (e) => {
      const isExpanded = dropdownItem.classList.contains('open');
      dropdownToggle.setAttribute('aria-expanded', String(!isExpanded));
      dropdownItem.classList.toggle('open', !isExpanded);
    });

    document.addEventListener('click', (e) => {
      if (!dropdownItem.contains(e.target)) {
        dropdownItem.classList.remove('open');
        dropdownToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Apertura automática de acordeón de servicio al hacer clic en submenú
  const bindServiceAccordionTrigger = (href, serviceId) => {
    document.querySelectorAll(`a[href="${href}"]`).forEach(link => {
      link.addEventListener('click', () => {
        const targetService = document.getElementById(serviceId);
        if (targetService) {
          targetService.open = true;
        }
      });
    });
  };
  bindServiceAccordionTrigger('#servicio-resonancia', 'servicio-resonancia');
  bindServiceAccordionTrigger('#servicio-hemodinamia', 'servicio-hemodinamia');

  /* ==========================================================================
     2. Slider Principal (Portada)
     ========================================================================== */
  const slides = [
    {
      id: 0,
      eyebrow: 'MEDICINA POR IMÁGENES · MENDOZA',
      title: 'Resonancia Magnética con tecnología de avanzada.',
      desc: 'Contamos con un resonador a la vanguardia tecnológica de Mendoza, junto con un equipo de profesionales que te acompaña durante tu estudio.',
      btnTurnoText: 'Solicitar turno',
      btnTurnoMsg: 'Hola, quisiera solicitar un turno de Resonancia Magnética.',
      btnSecText: 'Conocé el servicio',
      btnSecLink: '#servicios',
      serviceQueryId: 0,
      location: 'Resonancia magnética · Sede Mitre 775, Ciudad de Mendoza',
      phone: 'Resonancia: 0261 423 7271',
      phoneLink: 'tel:02614237271',
      image: 'assets/hero-resonancia.webp',
      alt: 'Equipo de resonancia magnética en Medicina por Imágenes'
    },
    {
      id: 1,
      eyebrow: 'HEMODINAMIA',
      title: 'Tecnología especializada. Experiencia médica.',
      desc: 'Cardiología intervencionista, electrofisiología y neurointervencionismo, con tecnología angiográfica y criterio médico.',
      btnTurnoText: 'Consultar por Hemodinamia',
      btnTurnoMsg: 'Hola, quisiera consultar por el servicio de Hemodinamia.',
      btnSecText: 'Conocé el servicio',
      btnSecLink: '#servicios',
      serviceQueryId: 1,
      location: 'Hospital Privado de Mendoza · Santa Isabel de Hungría',
      phone: 'WhatsApp: 261 511 7290',
      phoneLink: 'https://wa.me/5492615117290',
      image: 'assets/hero-hemodinamia.webp',
      alt: 'Sala de hemodinamia y angiógrafo de Medicina por Imágenes'
    },
    {
      id: 2,
      eyebrow: 'SEDE MITRE',
      title: 'Un espacio para acompañarte en cada estudio.',
      desc: 'Conocé nuestra sede de Mitre 775 y consultá por los servicios disponibles.',
      btnTurnoText: 'Solicitar turno',
      btnTurnoMsg: 'Hola, quisiera consultar por un turno en Sede Mitre.',
      btnSecText: 'Conocé la sede',
      btnSecLink: '#sedes',
      serviceQueryId: null,
      location: 'Mitre 775 · Ciudad de Mendoza',
      phone: 'Central de turnos: 261 511 7290',
      phoneLink: 'https://wa.me/5492615117290',
      image: 'assets/hero-sede-mitre.webp',
      alt: 'Instalaciones y sala de atención en Sede Mitre'
    }
  ];

  let currentSlide = 0;
  let slideInterval = null;
  const slideItems = document.querySelectorAll('.slide-item');
  const slideTabs = document.querySelectorAll('.slider-tab-btn');
  const slidePrevBtn = document.getElementById('slider-prev');
  const slideNextBtn = document.getElementById('slider-next');

  const showSlide = (index) => {
    currentSlide = (index + slides.length) % slides.length;
    slideItems.forEach((item, i) => {
      item.classList.toggle('active', i === currentSlide);
      item.setAttribute('aria-hidden', i === currentSlide ? 'false' : 'true');
    });

    slideTabs.forEach((tab, i) => {
      tab.classList.toggle('active', i === currentSlide);
      tab.setAttribute('aria-selected', i === currentSlide ? 'true' : 'false');
      tab.tabIndex = i === currentSlide ? 0 : -1;
    });
  };

  const startSlideTimer = () => {
    stopSlideTimer();
    slideInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 7000);
  };

  const stopSlideTimer = () => {
    if (slideInterval) clearInterval(slideInterval);
  };

  if (slideTabs.length > 0) {
    slideTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const idx = parseInt(tab.dataset.slide, 10);
        showSlide(idx);
        startSlideTimer();
      });

      tab.addEventListener('keydown', (e) => {
        let target = currentSlide;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') target = (currentSlide + 1) % slides.length;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') target = (currentSlide - 1 + slides.length) % slides.length;
        else if (e.key === 'Home') target = 0;
        else if (e.key === 'End') target = slides.length - 1;
        else return;

        e.preventDefault();
        showSlide(target);
        slideTabs[target].focus();
        startSlideTimer();
      });
    });

    if (slidePrevBtn) {
      slidePrevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
        startSlideTimer();
      });
    }

    if (slideNextBtn) {
      slideNextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
        startSlideTimer();
      });
    }

    const sliderSection = document.querySelector('.hero-slider-section');
    if (sliderSection) {
      sliderSection.addEventListener('mouseenter', stopSlideTimer);
      sliderSection.addEventListener('mouseleave', startSlideTimer);
      sliderSection.addEventListener('focusin', stopSlideTimer);
      sliderSection.addEventListener('focusout', startSlideTimer);

      // Touch swipe support
      let touchStartX = 0;
      sliderSection.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      sliderSection.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {
          if (diff > 0) showSlide(currentSlide + 1);
          else showSlide(currentSlide - 1);
          startSlideTimer();
        }
      }, { passive: true });
    }

    startSlideTimer();
  }

  /* ==========================================================================
     3. Servicios y Modal de Detalle
     ========================================================================== */
  const servicesData = [
    {
      id: 0,
      name: 'Resonancia Magnética',
      guardia: null,
      locations: 'Mitre 775 · Ciudad de Mendoza',
      description: 'Tecnología avanzada al servicio del diagnóstico médico.',
      image: 'assets/service-resonancia.webp',
      alt: 'Resonador magnético de Medicina por Imágenes'
    },
    {
      id: 1,
      name: 'Hemodinamia',
      guardia: 'Guardia pasiva',
      locations: 'Hospital Privado de Mendoza · Hospital Santa Isabel de Hungría',
      description: 'Cardiología intervencionista, electrofisiología y neurointervencionismo.',
      image: 'assets/service-hemodinamia.webp',
      alt: 'Sala de hemodinamia y angiógrafo'
    },
    {
      id: 2,
      name: 'Tomografía',
      guardia: 'Guardia activa 24 hs.',
      locations: 'Clínica Santa María · Av. Colón 350/352, Ciudad de Mendoza',
      description: 'Estudios por imágenes con acompañamiento y criterio médico.',
      image: 'assets/service-tomografia.webp',
      alt: 'Tomógrafo computado de última generación'
    },
    {
      id: 3,
      name: 'Eco Doppler Color',
      guardia: null,
      locations: '9 de Julio 716, primer piso · Av. Colón 350/352, Ciudad de Mendoza',
      description: 'Consultá por tu estudio, disponibilidad y requisitos.',
      image: 'assets/service-ecografia.webp',
      alt: 'Ecógrafo y tecnología doppler'
    },
    {
      id: 4,
      name: 'Radiología Digital',
      guardia: null,
      locations: '9 de Julio 716, primer piso · Av. Colón 350/352, Ciudad de Mendoza',
      description: 'Servicio de diagnóstico radiológico.',
      image: 'assets/service-radiologia.webp',
      alt: 'Equipo de radiología digital'
    },
    {
      id: 5,
      name: 'Ecografía',
      guardia: null,
      locations: '9 de Julio 716, primer piso · Ciudad de Mendoza',
      description: 'Estudios ecográficos con atención médica cercana.',
      image: 'assets/service-ecografia.webp',
      alt: 'Equipo de ecografía diagnóstica'
    },
    {
      id: 6,
      name: 'Punciones Guiadas por Ecografía',
      guardia: null,
      locations: '9 de Julio 716, primer piso · Ciudad de Mendoza',
      description: 'Procedimientos guiados por ecografía según la indicación médica.',
      image: 'assets/service-ecografia.webp',
      alt: 'Procedimiento de punción guiada por ecografía'
    },
    {
      id: 7,
      name: 'Ecocardiografía',
      guardia: null,
      locations: '9 de Julio 716, primer piso · Ciudad de Mendoza',
      description: 'Estudios ecocardiográficos. Consultá turnos y requisitos.',
      image: 'assets/service-ecografia.webp',
      alt: 'Ecocardiografía cardiovascular'
    },
    {
      id: 8,
      name: 'Punciones Biopsia Guiada por Tomografía',
      guardia: null,
      locations: 'Av. Colón 350/352 · Ciudad de Mendoza',
      description: 'Procedimientos guiados por tomografía según la indicación médica.',
      image: 'assets/service-tomografia.webp',
      alt: 'Punción biopsia guiada por tomografía'
    },
    {
      id: 9,
      name: 'Mamografía Digital',
      guardia: null,
      locations: 'Colón 775 · 9 de Julio 716, Ciudad de Mendoza',
      description: 'Estudios de diagnóstico mamario. Consultá cobertura y disponibilidad.',
      image: 'assets/service-mamografia.webp',
      alt: 'Mamógrafo digital'
    }
  ];

  const dialog = document.getElementById('service-dialog');
  const dialogCloseBtn = document.getElementById('dialog-close');
  const dialogTitle = document.getElementById('dialog-title');
  const dialogDesc = document.getElementById('dialog-description');
  const dialogLocations = document.getElementById('dialog-locations');
  const dialogGuardiaBox = document.getElementById('dialog-guardia-box');
  const dialogGuardiaText = document.getElementById('dialog-guardia');
  const dialogImg = document.getElementById('dialog-image');
  const dialogTurnBtn = document.getElementById('dialog-turn-btn');
  let lastActiveTrigger = null;

  const openServiceModal = (serviceIndex, triggerElement) => {
    const s = servicesData[serviceIndex];
    if (!s || !dialog) return;

    lastActiveTrigger = triggerElement;
    dialogTitle.textContent = s.name;
    dialogDesc.textContent = s.description;
    dialogLocations.textContent = s.locations;

    if (s.guardia) {
      dialogGuardiaText.textContent = s.guardia;
      dialogGuardiaBox.style.display = 'block';
    } else {
      dialogGuardiaBox.style.display = 'none';
    }

    dialogImg.src = s.image;
    dialogImg.alt = s.alt;
    dialogTurnBtn.href = buildWaLink(`Hola, quisiera solicitar un turno o consultar por ${s.name}.`);

    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    document.body.style.overflow = 'hidden';
  };

  const closeServiceModal = () => {
    if (!dialog) return;
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
    document.body.style.overflow = '';
    if (lastActiveTrigger) {
      lastActiveTrigger.focus();
    }
  };

  // Bind service modal buttons
  document.querySelectorAll('[data-service-detail]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.serviceDetail, 10);
      openServiceModal(idx, btn);
    });
  });

  if (dialogCloseBtn) {
    dialogCloseBtn.addEventListener('click', closeServiceModal);
  }

  if (dialog) {
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) {
        closeServiceModal();
      }
    });

    dialog.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeServiceModal();
      }
    });
  }

  /* ==========================================================================
     4. Sedes (Selector y Google Maps)
     ========================================================================== */
  const sedesData = [
    {
      id: 0,
      name: 'Sede Mitre',
      address: 'Mitre 775 · Ciudad de Mendoza',
      mapQuery: 'Mitre 775 Ciudad de Mendoza Mendoza Argentina',
      services: ['Resonancia Magnética', 'Tomografía', 'Ecografía', 'Eco Doppler Color', 'Mamografía Digital', 'Punciones guiadas', 'Bloqueos por dolor'],
      note: 'Consultá la disponibilidad de tu estudio y los horarios de la sede al solicitar el turno.'
    },
    {
      id: 1,
      name: 'Sede 9 de Julio',
      address: '9 de Julio 716, primer piso · Ciudad de Mendoza',
      mapQuery: '9 de Julio 716 Ciudad de Mendoza Mendoza Argentina',
      services: ['Eco Doppler Color', 'Radiología Digital', 'Ecografía', 'Punciones Guiadas por Ecografía', 'Ecocardiografía', 'Mamografía Digital', 'Panorámicas dentales'],
      note: 'Consultá la disponibilidad de tu estudio y los horarios de la sede al solicitar el turno.'
    },
    {
      id: 2,
      name: 'Sede Av. Colón',
      address: 'Av. Colón 350/352 · Ciudad de Mendoza',
      mapQuery: 'Av Colon 350 Ciudad de Mendoza Mendoza Argentina',
      services: ['Hemodinamia', 'Tomografía (Clínica Santa María)', 'Eco Doppler Color', 'Radiología Digital', 'Punciones Biopsia por Tomografía'],
      note: 'Consultá la disponibilidad de tu estudio y los horarios de la sede al solicitar el turno.'
    },
    {
      id: 3,
      name: 'Hospital Santa Isabel de Hungría',
      address: 'Pedro del Castillo 2854 · Guaymallén, Mendoza',
      mapQuery: 'Hospital Santa Isabel de Hungria Pedro del Castillo 2854 Guaymallen Mendoza Argentina',
      services: ['Hemodinamia', 'Cardiología Intervencionista', 'Electrofisiología', 'Neurointervencionismo'],
      note: 'Consultá la disponibilidad de tu estudio y los horarios de la sede al solicitar el turno.'
    },
    {
      id: 4,
      name: 'Hospital Privado',
      address: 'Mitre 667 · Ciudad de Mendoza',
      mapQuery: 'Hospital Privado Mitre 667 Ciudad de Mendoza Mendoza Argentina',
      services: ['Hemodinamia', 'Cardiología Intervencionista'],
      note: 'Consultá la disponibilidad de tu estudio y los horarios de la sede al solicitar el turno.'
    }
  ];

  const sedeTabs = document.querySelectorAll('.location-tab-btn');
  const sedeNameEl = document.getElementById('sede-name');
  const sedeAddressEl = document.getElementById('sede-address');
  const sedeChipsEl = document.getElementById('sede-chips');
  const sedeNoteEl = document.getElementById('sede-note');
  const sedeMapIframe = document.getElementById('sede-map-iframe');
  const sedeDirectionsBtn = document.getElementById('sede-directions-btn');
  const sedeTurnBtn = document.getElementById('sede-turn-btn');

  const updateSede = (index) => {
    const s = sedesData[index];
    if (!s) return;

    sedeTabs.forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
      btn.setAttribute('aria-selected', i === index ? 'true' : 'false');
      btn.tabIndex = i === index ? 0 : -1;
    });

    if (sedeNameEl) sedeNameEl.textContent = s.name;
    if (sedeAddressEl) sedeAddressEl.textContent = s.address;
    if (sedeNoteEl) sedeNoteEl.textContent = s.note;

    if (sedeChipsEl) {
      sedeChipsEl.innerHTML = '';
      s.services.forEach(serv => {
        const span = document.createElement('span');
        span.className = 'service-chip';
        span.textContent = serv;
        sedeChipsEl.appendChild(span);
      });
    }

    const encodedMap = encodeURIComponent(s.mapQuery);
    if (sedeMapIframe) {
      sedeMapIframe.src = `https://maps.google.com/maps?q=${encodedMap}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
      sedeMapIframe.title = `Mapa de ubicación de ${s.name}`;
    }

    if (sedeDirectionsBtn) {
      sedeDirectionsBtn.href = `https://www.google.com/maps/search/?api=1&query=${encodedMap}`;
    }

    if (sedeTurnBtn) {
      sedeTurnBtn.href = buildWaLink(`Hola, quisiera consultar por los servicios y turnos disponibles en ${s.name}.`);
    }
  };

  if (sedeTabs.length > 0) {
    sedeTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const idx = parseInt(tab.dataset.sede, 10);
        updateSede(idx);
      });

      tab.addEventListener('keydown', (e) => {
        let currentIdx = Array.from(sedeTabs).findIndex(b => b.classList.contains('active'));
        let target = currentIdx;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') target = (currentIdx + 1) % sedesData.length;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') target = (currentIdx - 1 + sedesData.length) % sedesData.length;
        else if (e.key === 'Home') target = 0;
        else if (e.key === 'End') target = sedesData.length - 1;
        else return;

        e.preventDefault();
        updateSede(target);
        sedeTabs[target].focus();
      });
    });
  }

  /* ==========================================================================
     5. Carrusel de Obras Sociales y Prepagas
     ========================================================================== */
  const coverageTrack = document.getElementById('coverage-track');
  const coverageViewport = document.querySelector('.coverage-viewport');
  const coveragePrevBtn = document.getElementById('coverage-prev');
  const coverageNextBtn = document.getElementById('coverage-next');
  let coverageCurrentIndex = 0;

  if (coverageTrack && coverageViewport) {
    const updateCoveragePosition = (step = 0) => {
      const items = Array.from(coverageTrack.children);
      if (items.length === 0) return;

      const viewportWidth = coverageViewport.clientWidth;
      const itemWidth = items[0].getBoundingClientRect().width + 20; // 20px gap
      const visibleCount = Math.max(1, Math.floor(viewportWidth / itemWidth));
      const maxIndex = Math.max(0, items.length - visibleCount);

      coverageCurrentIndex += step;
      if (coverageCurrentIndex > maxIndex) coverageCurrentIndex = 0;
      if (coverageCurrentIndex < 0) coverageCurrentIndex = maxIndex;

      const translateX = coverageCurrentIndex * itemWidth;
      coverageTrack.style.transform = `translateX(-${translateX}px)`;
    };

    if (coveragePrevBtn) coveragePrevBtn.addEventListener('click', () => updateCoveragePosition(-1));
    if (coverageNextBtn) coverageNextBtn.addEventListener('click', () => updateCoveragePosition(1));

    window.addEventListener('resize', () => updateCoveragePosition(0));

    // Touch swipe for coverage track
    let covTouchStartX = 0;
    coverageViewport.addEventListener('touchstart', (e) => {
      covTouchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    coverageViewport.addEventListener('touchend', (e) => {
      const covTouchEndX = e.changedTouches[0].screenX;
      const diff = covTouchStartX - covTouchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) updateCoveragePosition(1);
        else updateCoveragePosition(-1);
      }
    }, { passive: true });
  }

  /* ==========================================================================
     6. Smooth scroll para anclas con offset del header
     ========================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 78;
        const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
