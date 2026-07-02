// Footer oficial de ATFX — logo + columnas (Legal / Sobre Nosotros / Redes) +
// disclaimer legal. Solo ATFX (sin co-brand). Strip dark. Labels bilingües (ES/EN);
// el disclaimer legal se mantiene en ES (texto regulatorio oficial del grupo).

import { renderContainer } from '../ui/layout';
import {
  ATFX_HOME,
  FOOTER_GROUPS,
  FOOTER_SOCIALS,
  FOOTER_LEGAL,
} from '../constants/footer';
import type { Lang } from '../core/types';

const LOGOS = 'https://pub-62c41549a44642efbcd3f775bdb039b3.r2.dev';

const SOCIALS_LABEL: Record<Lang, string> = { es: 'Redes', en: 'Social' };

function renderSocialLink({ label, href, icon, fill }: { label: string; href: string; icon: string; fill: boolean }): HTMLAnchorElement {
  const a = document.createElement('a');
  a.className = 'aa-footer__social';
  a.href = href;
  a.target = '_blank';
  a.rel = 'noopener';
  a.setAttribute('aria-label', label);
  a.innerHTML = `<svg viewBox="0 0 24 24" fill="${fill ? 'currentColor' : 'none'}" stroke="${fill ? 'none' : 'currentColor'}" stroke-width="${fill ? 0 : 2}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icon}</svg>`;
  return a;
}

export function renderFooterSection(root: Element, lang: Lang): void {
  const section = document.createElement('section');
  section.className = 'aa-section aa-footer';
  section.id = 'footer';
  section.setAttribute('data-aa-section-theme', 'dark');
  section.setAttribute('data-aa-nav-anchor', '');

  // Logo ATFX (footer dark → versión white)
  const top = document.createElement('div');
  top.className = 'aa-footer__top';

  const logos = document.createElement('div');
  logos.className = 'aa-footer__logos';

  const atfxLink = document.createElement('a');
  atfxLink.href = ATFX_HOME[lang];
  atfxLink.target = '_blank';
  atfxLink.rel = 'noopener';
  const atfx = document.createElement('img');
  atfx.className = 'aa-footer__logo aa-footer__logo--atfx';
  atfx.src = `${LOGOS}/atfx-white.png`;
  atfx.alt = 'ATFX';
  atfx.loading = 'lazy';
  atfxLink.appendChild(atfx);

  logos.append(atfxLink);
  top.appendChild(logos);

  // Columnas de links
  const cols = document.createElement('div');
  cols.className = 'aa-footer__cols';

  FOOTER_GROUPS[lang].forEach((group) => {
    const col = document.createElement('div');
    col.className = 'aa-footer__col';

    const eyebrow = document.createElement('p');
    eyebrow.className = 'aa-footer__eyebrow';
    eyebrow.textContent = `( ${group.title} )`;

    const links = document.createElement('div');
    links.className = 'aa-footer__links';
    group.links.forEach(({ label, href }) => {
      const a = document.createElement('a');
      a.className = 'aa-footer__link';
      a.href = href;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = label;
      links.appendChild(a);
    });

    col.append(eyebrow, links);
    cols.appendChild(col);
  });

  // Columna de redes (solo ATFX)
  const socialCol = document.createElement('div');
  socialCol.className = 'aa-footer__col aa-footer__col--socials';
  const socialEyebrow = document.createElement('p');
  socialEyebrow.className = 'aa-footer__eyebrow';
  socialEyebrow.textContent = `( ${SOCIALS_LABEL[lang]} )`;
  const socials = document.createElement('div');
  socials.className = 'aa-footer__socials';
  FOOTER_SOCIALS.forEach((s) => socials.appendChild(renderSocialLink(s)));
  socialCol.append(socialEyebrow, socials);
  cols.appendChild(socialCol);

  // Disclaimer legal
  const legal = document.createElement('div');
  legal.className = 'aa-footer__legal';
  const legalText = document.createElement('p');
  legalText.textContent = FOOTER_LEGAL[lang];
  legal.appendChild(legalText);

  const inner = document.createElement('div');
  inner.className = 'aa-footer__inner';
  inner.append(top, cols, legal);

  section.appendChild(renderContainer({ children: [inner] }));
  root.appendChild(section);
}
