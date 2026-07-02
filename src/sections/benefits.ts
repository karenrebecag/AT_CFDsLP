// "Por qué ATFX" — maquetación Relume "Layout 614" (item = icono size-12 + título +
// texto) en disposición 2-col: aside izquierda (heading + CTA) + lista de 4
// diferenciadores a la derecha. Sección dark. Copy CFDs bilingüe (ES/EN). id=beneficios.

import { renderContainer } from '../ui/layout';
import { renderHeading, renderParagraph } from '../ui/text';
import { renderPill } from '../ui/atoms/pill';
import { renderButton } from '../ui/atoms/button';
import { renderMediaSlot } from '../ui/atoms/media-slot';
import type { Lang } from '../core/types';

interface WhyItem {
  icon: string;
  title: string;
  desc: string;
}
interface WhyCopy {
  eyebrow: string;
  heading: string;
  lead: string;
  cta: string;
  items: WhyItem[];
}

const ICON = {
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
  message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  transfer: '<path d="M17 3v18"/><path d="m21 7-4-4-4 4"/><path d="M7 21V3"/><path d="m3 17 4 4 4-4"/>',
};

// Copy de diferenciadores: descripciones apoyadas en datos oficiales de ATFX
// (2017 · 14 países · LATAM MX/CO), EDITABLES por el equipo antes de publicar.
const COPY: Record<Lang, WhyCopy> = {
  es: {
    eyebrow: 'Por qué ATFX',
    heading: 'Una base sólida para operar',
    lead: 'Un bróker global, regulado y en español, pensado para que operes con confianza.',
    cta: 'Abre tu cuenta',
    items: [
      { icon: ICON.globe, title: 'Broker global con presencia en LATAM', desc: 'Operando desde 2017, con equipo en 14 países y oficinas en LATAM (México y Colombia).' },
      { icon: ICON.zap, title: 'Plataforma rápida y fácil de usar', desc: 'Divisas, oro, índices y más desde una sola cuenta, con ejecución ágil e interfaz clara.' },
      { icon: ICON.message, title: 'Soporte en español', desc: 'Atención y materiales en español, con un equipo que conoce el mercado latinoamericano.' },
      { icon: ICON.transfer, title: 'Depósitos y retiros locales', desc: 'Métodos de depósito y retiro adaptados a tu región para mover tu capital con facilidad.' },
    ],
  },
  en: {
    eyebrow: 'Why ATFX',
    heading: 'A solid base to trade on',
    lead: 'A global, regulated, Spanish-language broker built so you can trade with confidence.',
    cta: 'Open your account',
    items: [
      { icon: ICON.globe, title: 'Global broker with LATAM presence', desc: 'Operating since 2017, with a team across 14 countries and offices in LATAM (Mexico and Colombia).' },
      { icon: ICON.zap, title: 'Fast, easy-to-use platform', desc: 'Forex, gold, indices, and more from a single account, with quick execution and a clear interface.' },
      { icon: ICON.message, title: 'Support in your language', desc: 'Service and materials in Spanish, with a team that knows the Latin American market.' },
      { icon: ICON.transfer, title: 'Local deposits and withdrawals', desc: 'Deposit and withdrawal methods adapted to your region to move your capital with ease.' },
    ],
  },
};

function buildItem(item: WhyItem): HTMLElement {
  const li = document.createElement('li');
  li.className = 'aa-why__item';
  li.setAttribute('data-aa-fade', '');

  const icon = document.createElement('span');
  icon.className = 'aa-why__icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${item.icon}</svg>`;

  const title = document.createElement('h3');
  title.className = 'aa-why__title aa-h-m';
  title.textContent = item.title;

  const desc = document.createElement('p');
  desc.className = 'aa-why__desc aa-p-l';
  desc.textContent = item.desc;

  li.append(icon, title, desc);
  return li;
}

export function renderBenefitsSection(root: Element, lang: Lang): void {
  const t = COPY[lang];

  const section = document.createElement('section');
  section.className = 'aa-section aa-why';
  section.id = 'beneficios';
  section.setAttribute('data-aa-section-theme', 'dark');
  section.setAttribute('data-aa-nav-anchor', '');

  const aside = document.createElement('div');
  aside.className = 'aa-why__aside';
  const pill = renderPill(t.eyebrow);
  pill.setAttribute('data-aa-fade', '');
  const lead = renderParagraph({ size: 'l', text: t.lead, className: 'aa-why__lead' });
  lead.setAttribute('data-aa-fade', '');
  const cta = document.createElement('div');
  cta.className = 'aa-why__cta';
  cta.setAttribute('data-aa-fade', '');
  cta.appendChild(renderButton({ href: '#registro', label: t.cta, variant: 'primary' }));
  aside.append(pill, renderHeading({ size: 'l', tag: 'h2', text: t.heading, split: true }), lead, cta);
  aside.appendChild(
    renderMediaSlot({
      label: lang === 'es' ? 'Opera con ATFX' : 'Trade with ATFX',
      ratio: '4 / 3',
      className: 'aa-why__media-slot',
      src: 'https://pub-62c41549a44642efbcd3f775bdb039b3.r2.dev/persona_1.webp',
    }),
  );

  const list = document.createElement('ul');
  list.className = 'aa-why__list';
  t.items.forEach((item) => list.appendChild(buildItem(item)));

  const grid = document.createElement('div');
  grid.className = 'aa-why__grid';
  grid.append(aside, list);

  section.appendChild(renderContainer({ size: 'default', children: [grid] }));
  root.appendChild(section);
}
