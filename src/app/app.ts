import { Component, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit, OnDestroy {
  menuOpen = false;

  testimonios = [
    { texto: 'Ahora puedo ver qué cubículos están disponibles antes de llegar a la biblioteca. Me ahorra mucho tiempo.', autor: 'Valeria Salazar, Estudiante de Ingeniería, UPC San Miguel', img: 'testimonios/testimonio-h-1.jpg' },
    { texto: 'El sistema facilita mi trabajo, ya no tengo que verificar manualmente la ocupación de los cubículos.', autor: 'Carlos Ramos, Estudiante de Negocios, UPC Monterrico', img: 'testimonios/testimonio-h-2.jpg' },
    { texto: 'Bibflip me ayuda a organizar mejor mis horarios de estudio y aprovechar los espacios libres.', autor: 'Andrea Torres, Estudiante de Psicología, UPC Villa', img: 'testimonios/testimonio-h-3.jpg' },
    { texto: 'Recomiendo Bibflip a todos mis compañeros, es muy fácil de usar y realmente útil.', autor: 'Joaquín Torres, Estudiante de Derecho, UPC San Isidro', img: 'testimonios/testimonio-h-4.jpg' },
    { texto: 'Como bibliotecario, puedo gestionar los cubículos de forma más eficiente y rápida.', autor: 'Oscar Caceres, Estudiante de Ingeniería, UPC San Miguel', img: 'testimonios/testimonio-h-5.jpg' },
    { texto: 'La reserva online me permite organizar mi grupo de estudio sin complicaciones.', autor: 'Piero Landa, Estudiante de Ingeniería, UPC Monterrico', img: 'testimonios/testimonio-h-6.jpg' },
    { texto: 'Me gusta que puedo ver la disponibilidad desde mi celular antes de ir.', autor: 'Diego Ramos, Estudiante de Arquitectura, UPC Villa', img: 'testimonios/testimonio-h-7.jpg' },
    { texto: 'El sistema es intuitivo y rápido, lo recomiendo.', autor: 'José Galves, Estudiante de Administración, UPC San Isidro', img: 'testimonios/testimonio-m-1.jpg' },
    { texto: 'Ahora los estudiantes aprovechan mejor los espacios y hay menos conflictos.', autor: 'André Tarazona, Estudiante de Ingeniería, UPC Villa', img: 'testimonios/testimonio-m-2.jpg' }
  ];
  currentGroup = 0;
  private testiInterval?: any;

  private heroImages: string[] = ['cub-1.jpg', 'cub-2.jpg', 'cub-3.jpg'];
  private heroIndex = 0;
  private heroInterval?: any;

  private parallaxRaf?: number;
  private parallaxListener?: () => void;
  private featuresImgEl?: HTMLImageElement;

  toggleMenu() { this.menuOpen = !this.menuOpen; }

  ngAfterViewInit(): void {
    this.updateTestimonioDOM();
    this.testiInterval = setInterval(() => { this.nextTestimonioGroup(); }, 5000);
    const prevBtn = document.getElementById('testi-prev');
    const nextBtn = document.getElementById('testi-next');
    if (prevBtn) prevBtn.addEventListener('click', () => this.prevTestimonioGroup());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextTestimonioGroup());
    this.updateIndicators();

    this.initHeroBackground();
    this.initFeaturesParallax();
  }

  ngOnDestroy(): void {
    if (this.testiInterval) clearInterval(this.testiInterval);
    if (this.heroInterval) clearInterval(this.heroInterval);
    if (this.parallaxRaf) cancelAnimationFrame(this.parallaxRaf);
    if (this.parallaxListener) this.parallaxListener();
  }

  private initHeroBackground() {
    const heroBg = document.querySelector<HTMLElement>('.hero-bg');
    if (!heroBg || this.heroImages.length === 0) return;

    const preload: HTMLImageElement[] = [];
    this.heroImages.forEach((src) => { const img = new Image(); img.src = src; preload.push(img); });

    const applyImage = (idx: number) => { heroBg.style.backgroundImage = `url('${this.heroImages[idx]}')`; };

    const first = preload[0];
    let started = false;
    const startCycle = () => {
      if (started) return;
      started = true;
      heroBg.style.opacity = '1';
      this.heroInterval = setInterval(() => {
        const next = (this.heroIndex + 1) % this.heroImages.length;
        heroBg.style.opacity = '0';
        setTimeout(() => { applyImage(next); heroBg.style.opacity = '1'; this.heroIndex = next; }, 200);
      }, 3000);
    };

    if (first && !first.complete) {
      first.onload = () => { applyImage(this.heroIndex); startCycle(); };
      setTimeout(() => { if (!started) { applyImage(this.heroIndex); startCycle(); } }, 800);
    } else {
      applyImage(this.heroIndex);
      startCycle();
    }
  }

  private initFeaturesParallax() {
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduce) return;
    this.featuresImgEl = document.querySelector<HTMLImageElement>('.features-img') || undefined;
    if (!this.featuresImgEl) return;
    const section = document.getElementById('caracteristicas');
    if (!section) return;
    const onScroll = () => {
      if (this.parallaxRaf) cancelAnimationFrame(this.parallaxRaf);
      this.parallaxRaf = requestAnimationFrame(() => {
        if (!this.featuresImgEl) return;
        const sectionRect = section.getBoundingClientRect();
        const viewportH = window.innerHeight;
        const sectionCenter = sectionRect.top + sectionRect.height / 2;
        const viewportCenter = viewportH / 2;
        const delta = sectionCenter - viewportCenter;
        let translate = -delta * 0.06;
        if (translate > 60) translate = 60;
        if (translate < -60) translate = -60;
        this.featuresImgEl.style.transform = `translateY(${translate}px) scale(1.02)`;
      });
    };
    setTimeout(onScroll, 1000);
    window.addEventListener('scroll', onScroll, { passive: true });
    this.parallaxListener = () => window.removeEventListener('scroll', onScroll);
  }

  private updateTestimonioDOM() {
    const testiGrid = document.getElementById('testi-grid');
    if (testiGrid) {
      testiGrid.innerHTML = '';
      testiGrid.classList.remove('testi-group-anim');
      void testiGrid.offsetWidth;
      testiGrid.classList.add('testi-group-anim');
      const testimoniosPorGrupo = 3;
      const start = this.currentGroup * testimoniosPorGrupo;
      for (let i = 0; i < testimoniosPorGrupo; i++) {
        const idx = (start + i) % this.testimonios.length;
        const t = this.testimonios[idx];
        const fig = document.createElement('figure');
        fig.className = 'testi rounded-4 shadow-sm p-4 testi-anim';

        const img = document.createElement('img');
        img.className = 'testimonio-avatar';
        img.src = t.img;
        img.alt = t.autor;
        fig.appendChild(img);

        const block = document.createElement('blockquote');
        block.className = 'mb-2';
        block.textContent = `“${t.texto}”`;
        fig.appendChild(block);
        const fc = document.createElement('figcaption');
        fc.className = 'fst-italic';
        fc.textContent = `— ${t.autor}`;
        fig.appendChild(fc);
        testiGrid.appendChild(fig);
      }
    }
    this.updateIndicators();
  }

  private nextTestimonioGroup() {
    const testimoniosPorGrupo = 3;
    const totalGrupos = Math.ceil(this.testimonios.length / testimoniosPorGrupo);
    this.currentGroup = (this.currentGroup + 1) % totalGrupos;
    this.updateTestimonioDOM();
  }

  private prevTestimonioGroup() {
    const testimoniosPorGrupo = 3;
    const totalGrupos = Math.ceil(this.testimonios.length / testimoniosPorGrupo);
    this.currentGroup = (this.currentGroup - 1 + totalGrupos) % totalGrupos;
    this.updateTestimonioDOM();
  }

  private updateIndicators() {
    const testimoniosPorGrupo = 3;
    const totalGrupos = Math.ceil(this.testimonios.length / testimoniosPorGrupo);
    const indicators = document.getElementById('testi-indicators');
    if (indicators) {
      indicators.innerHTML = '';
      for (let i = 0; i < totalGrupos; i++) {
        const dot = document.createElement('span');
        dot.style.display = 'inline-block';
        dot.style.width = '12px';
        dot.style.height = '12px';
        dot.style.margin = '0 4px';
        dot.style.borderRadius = '50%';
        dot.style.background = i === this.currentGroup ? '#007bff' : '#ccc';
        indicators.appendChild(dot);
      }
    }
  }

  onNavClick(event: Event, sectionId: string) {
    event.preventDefault();
    this.menuOpen = false;
    const target = document.getElementById(sectionId);
    if (!target) return;
    const header = document.querySelector<HTMLElement>('header.site-header');
    const offset = (header?.offsetHeight ?? 0) + 8;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });

    const applyFocus = () => {
      target.classList.add('section-focus');
      setTimeout(() => target.classList.remove('section-focus'), 900);
      window.removeEventListener('scroll', onArrive);
    };
    const onArrive = () => {
      const distance = Math.abs(target.getBoundingClientRect().top - (header?.offsetHeight ?? 0));
      if (distance < 4) applyFocus();
    };
    if (Math.abs(target.getBoundingClientRect().top - (header?.offsetHeight ?? 0)) < 4) applyFocus();
    else window.addEventListener('scroll', onArrive);
  }
}
