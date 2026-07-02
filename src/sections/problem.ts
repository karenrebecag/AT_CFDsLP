// "Lo que ya sabes hacer" — maquetación Relume "Layout 303": header a la izquierda +
// rejilla de 4 columnas (icono + título + descripción). Traduce las habilidades de poker
// a habilidades de trading. Copy CFDs bilingüe (ES/EN). id=problema (ancla estable).

import { renderContainer } from '../ui/layout';
import { renderSectionHeader } from '../ui/section-header';
import type { Lang } from '../core/types';

interface Skill {
  icon: string; // inner SVG markup (stroke currentColor)
  title: string;
  desc: string;
}

interface SkillsCopy {
  eyebrow: string;
  heading: string;
  sub: string;
  skills: Skill[];
}

const ICON = {
  eye: '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/>',
  wallet:
    '<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/>',
  scale: '<path d="M12 3v18"/><path d="M5 7h14"/><path d="M5 7l-3 6h6z"/><path d="M19 7l-3 6h6z"/><path d="M8 21h8"/>',
  pulse: '<path d="M3 12h4l3 8 4-16 3 8h4"/>',
};

const COPY: Record<Lang, SkillsCopy> = {
  es: {
    eyebrow: 'Lo que ya sabes hacer',
    heading: 'Si juegas poker, ya dominas lo más difícil del trading',
    sub: 'El trading premia exactamente esas habilidades. La única diferencia es la mesa.',
    skills: [
      { icon: ICON.eye, title: 'Lees la situación', desc: 'No apuestas por apostar. Evalúas antes de entrar.' },
      { icon: ICON.wallet, title: 'Gestionas tu bankroll', desc: 'Sabes cuánto arriesgar y cuándo retirarte.' },
      { icon: ICON.scale, title: 'Piensas en EV', desc: 'Decides por valor esperado, no por corazonadas.' },
      { icon: ICON.pulse, title: 'Controlas la varianza', desc: 'Una mala mano no te descontrola.' },
    ],
  },
  en: {
    eyebrow: 'What you already know how to do',
    heading: 'If you play poker, you already master the hardest part of trading',
    sub: 'Trading rewards exactly those skills. The only difference is the table.',
    skills: [
      { icon: ICON.eye, title: 'You read the situation', desc: 'You don’t bet for the sake of betting. You evaluate before entering.' },
      { icon: ICON.wallet, title: 'You manage your bankroll', desc: 'You know how much to risk and when to walk away.' },
      { icon: ICON.scale, title: 'You think in EV', desc: 'You decide by expected value, not by hunches.' },
      { icon: ICON.pulse, title: 'You control variance', desc: 'A bad hand doesn’t throw you off.' },
    ],
  },
};

function buildSkill(skill: Skill): HTMLElement {
  const item = document.createElement('li');
  item.className = 'aa-skills__item';
  item.setAttribute('data-aa-fade', '');

  const icon = document.createElement('span');
  icon.className = 'aa-skills__icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${skill.icon}</svg>`;

  const title = document.createElement('h3');
  title.className = 'aa-skills__title aa-h-m'; // heading tier (fuente display + escala DS)
  title.textContent = skill.title;

  const desc = document.createElement('p');
  desc.className = 'aa-skills__desc aa-p-l'; // cuerpo estándar del sistema (text-s)
  desc.textContent = skill.desc;

  item.append(icon, title, desc);
  return item;
}

export function renderProblemSection(root: Element, lang: Lang): void {
  const t = COPY[lang];

  const section = document.createElement('section');
  section.className = 'aa-section aa-skills';
  section.id = 'problema';
  section.setAttribute('data-aa-section-theme', 'light');
  section.setAttribute('data-aa-nav-anchor', '');

  const header = renderSectionHeader({
    eyebrow: t.eyebrow,
    heading: t.heading,
    sub: t.sub,
    align: 'left',
  });

  const grid = document.createElement('ul');
  grid.className = 'aa-skills__grid';
  t.skills.forEach((skill) => grid.appendChild(buildSkill(skill)));

  const wrap = document.createElement('div');
  wrap.className = 'aa-skills__wrap';
  wrap.append(header, grid);

  section.appendChild(renderContainer({ size: 'default', children: [wrap] }));
  root.appendChild(section);
}
