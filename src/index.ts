// Entry point. Cada punto de montaje declara su configuración por atributos:
//   <div data-aa-mount
//        data-aa-theme="light|dark"
//        data-aa-lang="es|en"></div>
//
//   <script data-cfasync="false"
//     src="https://cdn.jsdelivr.net/gh/karenrebecag/AT_CFDsLP@latest/loader.js"></script>
const _v = document.querySelector<HTMLScriptElement>('script[src*="AT_CFDsLP@"]')?.src.match(/AT_CFDsLP@([^/]+)/)?.[1] ?? 'dev';
console.log(`[atfx-cfds-lp] v${_v} loaded`);

import { type Theme, type Lang } from './core/types';
import { detectLang } from './core/geo';
import { initMotion } from './ui/motion';
import { renderNavbar, initNavbar } from './ui/navbar';
import { renderTopbar, initTopbar } from './ui/topbar';
import { renderScrollProgress, initScrollProgress } from './ui/scroll-progress';
import { initSpline } from './ui/spline';
import { initParallax } from './ui/parallax';
import { initDirectionalHover } from './ui/directional-hover';
import { renderHero } from './sections/hero';
import { renderFormSection, initAtfxForm } from './sections/form';
import { renderProblemSection } from './sections/problem';
import { renderLearnSection } from './sections/learn';
import { renderComparisonSection } from './sections/comparison';
import { renderBenefitsSection } from './sections/benefits';
import { renderFaqSection } from './sections/faq';
import { renderFooterSection } from './sections/footer';
import { initAccordion } from './ui/accordion';
import { initPillarSlider } from './ui/pillar-slider';
import { initRotatingText } from './ui/rotating-text';
import { initBenefitsScroll } from './ui/benefits-scroll';
import { initCursor } from './ui/cursor';
import { initMomentumHover } from './ui/momentum-hover';
import { initButton004 } from './ui/button004';
import { initDriftGallery } from './ui/drift-gallery';
import { initNumberOdometer } from './ui/odometer';
import { initTimeline } from './ui/timeline';

// Scroll suave para anclas internas (#id) sin tocar CSS global de Elementor.
function initAnchorScroll(root: HTMLElement): void {
  root.addEventListener('click', (e) => {
    const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href')?.slice(1);
    if (!id) return;
    const target = root.querySelector(`#${CSS.escape(id)}`);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function resolveTheme(raw: string | undefined): Theme {
  return raw === 'dark' ? 'dark' : 'light';
}

function resolveLang(raw: string | undefined): Lang {
  return raw === 'en' ? 'en' : 'es';
}

const LANG_KEY = 'aa-lang';

function storedLang(): Lang | null {
  try {
    const v = localStorage.getItem(LANG_KEY);
    return v === 'es' || v === 'en' ? v : null;
  } catch {
    return null; // modo privado / storage bloqueado
  }
}
function persistLang(lang: Lang): void {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    /* no-op */
  }
}

// Resuelve el idioma una sola vez, con precedencia:
//   1) ?lang= en la URL (elección manual del toggle) → gana y se recuerda
//   2) localStorage (última elección manual) → no lo pisa el geo en cada visita
//   3) geo-IP (país → es/en)
//   4) data-aa-lang del mount (default es)
async function resolveLangAsync(mount: HTMLElement): Promise<Lang> {
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  if (urlLang === 'es' || urlLang === 'en') {
    persistLang(urlLang);
    return urlLang;
  }
  const stored = storedLang();
  if (stored) return stored;
  const geo = await detectLang();
  if (geo) return geo;
  return resolveLang(mount.dataset.aaLang);
}

async function boot(): Promise<void> {
  const mounts = document.querySelectorAll<HTMLElement>('[data-aa-mount]');
  if (!mounts.length) return;
  // Idioma global (manual/recordado/geo) resuelto ANTES de pintar → sin flash de idioma.
  // El form hereda este idioma vía data-lang (form.ts), así cambia a inglés por geoloc.
  const lang = await resolveLangAsync(mounts[0]);
  mounts.forEach((mount) => {
    const theme = resolveTheme(mount.dataset.aaTheme);

    // Root wrapper — todo el CSS está scopeado a .aa-landing
    const root = document.createElement('div');
    root.className = 'aa-landing';
    root.setAttribute('data-aa-theme', theme);
    root.setAttribute('data-aa-lang', lang);

    // Navbar (fixed) + cada sección como módulo, recibiendo `root` como contenedor.
    renderTopbar(root, lang); // barra fija superior (botón de registro permanente)
    renderScrollProgress(root);
    renderNavbar(root, lang);
    renderHero(root, lang);
    renderFormSection(root, lang); // bloque de registro (form atfx-forms)
    renderLearnSection(root, lang);
    renderComparisonSection(root, lang);
    renderBenefitsSection(root, lang);
    renderProblemSection(root, lang); // "Lo que ya sabes" (light) — justo antes de FAQ
    renderFaqSection(root, lang);
    renderFooterSection(root, lang);

    mount.replaceChildren(root);
    initAnchorScroll(root);
    // Pines primero: crean sus pin-spacers (~200vh) para que initMotion mida los triggers
    // de reveal con la altura real. Si no, en el layout colapsado las secciones de abajo
    // caen dentro del viewport y sus reveals once:true disparan antes de tiempo (el texto
    // ya está visible cuando llegas, sin animación).
    initBenefitsScroll(root);
    initDriftGallery(root);
    initMotion(root);
    initNavbar(root);
    initTopbar(root);
    initScrollProgress(root);
    initSpline();
    initParallax(root);
    initDirectionalHover(root);
    initAccordion(root);
    initPillarSlider(root);
    initRotatingText(root);
    initCursor(root);
    initMomentumHover(root);
    initButton004(root);
    initNumberOdometer();
    initTimeline(root);
    initAtfxForm();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
