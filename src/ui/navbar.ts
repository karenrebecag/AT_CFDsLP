// Navbar simple — logo ATFX a la izquierda y un CTA a la derecha, en space-between.
// Fijo bajo el topbar, fondo transparente. El logo cambia de versión según el tema de la
// sección detrás: white sobre dark, dark sobre light (initNavbar setea data-nav-theme).

import { renderButton } from './atoms/button';
import { NAV_CTA } from '../constants/nav';
import { persistLang, LANG_PARAM } from '../core/lang';
import type { Lang } from '../core/types';

// URL de la elección: setea ?aalang sobre la URL actual (preserva los demás params, p. ej. UTM;
// reemplazarla por `?aalang=x` los borraría). Se recalcula en cada uso para leer la URL viva.
function langHref(code: Lang): string {
  const url = new URL(window.location.href);
  url.searchParams.set(LANG_PARAM, code);
  return url.href;
}

// Toggle de idioma: recarga con ?aalang=… (el boot lo lee y re-renderiza en ese idioma). El
// click persiste la elección ANTES de recargar; así, si un caché/CDN/redirect quita el
// parámetro, la precedencia por localStorage ya refleja el idioma nuevo (no queda atrapado).
function buildLangToggle(lang: Lang): HTMLElement {
  const group = document.createElement('div');
  group.className = 'aa-lang';
  group.setAttribute('role', 'group');
  group.setAttribute('aria-label', lang === 'es' ? 'Idioma' : 'Language');
  (['es', 'en'] as Lang[]).forEach((code) => {
    const a = document.createElement('a');
    a.className = code === lang ? 'aa-lang__opt is--active' : 'aa-lang__opt';
    a.href = langHref(code); // fallback sin-JS con params preservados
    a.textContent = code.toUpperCase();
    if (code === lang) {
      a.setAttribute('aria-current', 'true');
    } else {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        persistLang(code);
        window.location.assign(langHref(code));
      });
    }
    group.appendChild(a);
  });
  return group;
}

const LOGOS = 'https://pub-62c41549a44642efbcd3f775bdb039b3.r2.dev';

function logo(name: string, darkSrc: string, whiteSrc: string, modifier: string): HTMLElement {
  const wrap = document.createElement('span');
  wrap.className = `aa-nav__logo ${modifier}`;

  const dark = document.createElement('img');
  dark.className = 'aa-nav__logo-img aa-nav__logo-img--dark';
  dark.src = darkSrc;
  dark.alt = name;

  const white = document.createElement('img');
  white.className = 'aa-nav__logo-img aa-nav__logo-img--white';
  white.src = whiteSrc;
  white.alt = '';
  white.setAttribute('aria-hidden', 'true');

  wrap.append(dark, white);
  return wrap;
}

export function renderNavbar(root: Element, lang: Lang): void {
  const nav = document.createElement('nav');
  nav.className = 'aa-nav';
  nav.setAttribute('aria-label', 'ATFX');
  nav.setAttribute('data-nav-theme', 'dark'); // el hero arranca dark

  const logos = document.createElement('div');
  logos.className = 'aa-nav__logos';
  logos.append(
    logo('ATFX', `${LOGOS}/atfx-dark.png`, `${LOGOS}/atfx-white.png`, 'aa-nav__logo--atfx'),
  );

  // Acciones (derecha): toggle de idioma + CTA
  const actions = document.createElement('div');
  actions.className = 'aa-nav__actions';
  actions.append(
    buildLangToggle(lang),
    renderButton({ href: NAV_CTA[lang].href, label: NAV_CTA[lang].label, variant: 'primary', size: 'sm' }),
  );

  nav.append(logos, actions);
  root.appendChild(nav);
}

export function initNavbar(root: Element): void {
  const nav = root.querySelector<HTMLElement>('.aa-nav');
  if (!nav) return;
  const topbar = document.querySelector<HTMLElement>('[data-aa-topbar]');

  let raf = 0;
  let lastY = window.scrollY;

  const update = (): void => {
    raf = 0;

    // Tema según la sección detrás. Probe bajo el topbar (referencia fija, no depende del
    // transform del nav al ocultarse); los logos son pointer-events:none → el hit-test pasa.
    const topbarBottom = topbar ? topbar.getBoundingClientRect().bottom : 0;
    // Probe al centro: capta las cards centradas con tema propio (FAQ navy) además de
    // los strips full-width. closest() sube hasta el ancestro con data-aa-section-theme.
    const el = document.elementFromPoint(window.innerWidth / 2, topbarBottom + 18);
    const section = el?.closest<HTMLElement>('[data-aa-section-theme]');
    nav.setAttribute('data-nav-theme', section?.getAttribute('data-aa-section-theme') ?? 'light');

    // Hide on scroll down (y no-top) · show en top y scroll up.
    const y = window.scrollY;
    if (y <= 4) nav.classList.remove('aa-nav--hidden');
    else if (y > lastY + 2 && y > 80) nav.classList.add('aa-nav--hidden');
    else if (y < lastY - 2) nav.classList.remove('aa-nav--hidden');
    lastY = y;
  };
  const onScroll = (): void => {
    if (!raf) raf = requestAnimationFrame(update);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  requestAnimationFrame(update);
}
