// Conceptos CFDs (01–06) — maquetación Relume "Timeline 1": columna izquierda sticky
// (intro + CTA) + columna derecha con línea vertical, dots que se activan al scroll y
// entradas numeradas (número + título + descripción). Copy CFDs bilingüe (ES/EN).
// La línea de progreso y los dots se animan en ui/timeline.ts. id=aprenderas.

import { renderContainer } from '../ui/layout';
import { renderHeading, renderParagraph } from '../ui/text';
import { renderPill } from '../ui/atoms/pill';
import { renderButton } from '../ui/atoms/button';
import type { Lang } from '../core/types';

interface Concept {
  title: string;
  desc: string;
}

interface ConceptsCopy {
  eyebrow: string;
  heading: string;
  lead: string;
  cta: string;
  concepts: Concept[];
}

const COPY: Record<Lang, ConceptsCopy> = {
  es: {
    eyebrow: 'Conceptos',
    heading: 'Los CFDs, paso a paso',
    lead: 'Seis ideas para operar con criterio: dirección, mecánica, tamaño, control de riesgo, costos y el riesgo real.',
    cta: 'Quiero más información',
    concepts: [
      {
        title: 'Dirección: largo o corto',
        desc: 'Cada operación empieza con una pregunta: ¿hacia dónde crees que va el precio? Buy si crees que subirá; Sell si crees que bajará. Como en la mesa, se trata de leer la situación y tomar la posición correcta.',
      },
      {
        title: '¿Qué son los CFDs?',
        desc: 'Los CFDs (Contratos por Diferencia) te permiten operar el precio de divisas, oro, índices y acciones sin comprarlos. Tomas una posición sobre la dirección del precio; no posees el activo en ningún momento.',
      },
      {
        title: 'Apalancamiento y margen',
        desc: 'El apalancamiento te permite controlar una posición mayor que el margen que aportas. Con 1:400, un margen de $1,000 controla $400,000. Amplifica ganancias y pérdidas por igual: la herramienta más poderosa y la más peligrosa.',
      },
      {
        title: 'Control de riesgo: TP y SL',
        desc: 'Take Profit asegura tu ganancia; Stop Loss limita tu pérdida. Defines objetivo y límite antes de abrir. Es la misma disciplina del bankroll: decides cuánto arriesgas antes de jugar la mano, no después.',
      },
      {
        title: 'El costo de financiamiento (swap)',
        desc: 'Los CFDs no expiran. Por mantener una posición abierta de un día para otro se aplica un pequeño cargo o crédito, el swap o rollover. Depende del activo, la dirección y las tasas. En operaciones intradía no aplica.',
      },
      {
        title: 'Liquidación',
        desc: 'Si el mercado se mueve en tu contra y tu margen se agota, la posición se cierra automáticamente. Piensa en tu margen como un colchón: a mayor apalancamiento, más delgado. Un stop loss te deja cerrar en tus términos antes de llegar ahí.',
      },
    ],
  },
  en: {
    eyebrow: 'Concepts',
    heading: 'CFDs, step by step',
    lead: 'Six ideas to trade with a clear head: direction, mechanics, sizing, risk control, costs, and the real risk.',
    cta: 'Get more information',
    concepts: [
      {
        title: 'Direction: long or short',
        desc: 'Every trade starts with one question: which way do you think the price is going? Buy if you think it will rise; Sell if you think it will fall. Like at the table, it’s about reading the situation and taking the right position.',
      },
      {
        title: 'What are CFDs?',
        desc: 'CFDs (Contracts for Difference) let you trade the price of forex, gold, indices, and stocks without ever owning them. You take a position on which way the price moves; you never own the asset.',
      },
      {
        title: 'Leverage & margin',
        desc: 'Leverage lets you control a larger position than the margin you put in. At 1:400, a $1,000 margin controls $400,000. It amplifies gains and losses equally: the most powerful tool at the table, and the most dangerous.',
      },
      {
        title: 'Risk controls: TP & SL',
        desc: 'Take Profit locks in your gain; Stop Loss caps your loss. You set the target and limit before you open. It’s the same discipline as bankroll management: you decide how much to risk before you play the hand, not after.',
      },
      {
        title: 'Financing cost (swap)',
        desc: 'CFDs never expire. For holding a position open overnight, a small charge or credit applies, the swap or rollover. It depends on the asset, your direction, and interest rates. It doesn’t apply to intraday trades.',
      },
      {
        title: 'Liquidation',
        desc: 'If the market moves against you far enough and your margin runs out, your position closes automatically. Think of your margin as a cushion: the higher your leverage, the thinner it is. A stop loss lets you close on your terms before it gets there.',
      },
    ],
  },
};

function pad(n: number): string {
  return String(n + 1).padStart(2, '0');
}

function buildItem(concept: Concept, index: number): HTMLElement {
  const item = document.createElement('li');
  item.className = 'aa-tl__item';
  item.setAttribute('data-aa-fade', '');

  const dot = document.createElement('span');
  dot.className = 'aa-tl__dot';
  dot.setAttribute('data-aa-tl-dot', '');
  dot.setAttribute('aria-hidden', 'true');

  const num = document.createElement('span');
  num.className = 'aa-tl__num';
  num.textContent = pad(index);

  const title = document.createElement('h3');
  title.className = 'aa-tl__title aa-h-m';
  title.textContent = concept.title;

  const desc = document.createElement('p');
  desc.className = 'aa-tl__desc aa-p-l';
  desc.textContent = concept.desc;

  item.append(dot, num, title, desc);
  return item;
}

export function renderLearnSection(root: Element, lang: Lang): void {
  const t = COPY[lang];

  const section = document.createElement('section');
  section.className = 'aa-section aa-concepts';
  section.id = 'aprenderas';
  section.setAttribute('data-aa-section-theme', 'dark');
  section.setAttribute('data-aa-nav-anchor', '');

  // Columna izquierda (sticky): eyebrow + heading + lead + CTA
  const aside = document.createElement('div');
  aside.className = 'aa-tl__aside';
  const pill = renderPill(t.eyebrow);
  pill.setAttribute('data-aa-fade', '');
  const lead = renderParagraph({ size: 'l', text: t.lead, className: 'aa-tl__lead' });
  lead.setAttribute('data-aa-fade', '');
  const cta = document.createElement('div');
  cta.className = 'aa-tl__cta';
  cta.setAttribute('data-aa-fade', '');
  cta.appendChild(renderButton({ href: '#registro', label: t.cta, variant: 'primary' }));
  aside.append(
    pill,
    renderHeading({ size: 'l', tag: 'h2', text: t.heading, split: true }),
    lead,
    cta,
  );

  // Columna derecha: línea + fill + entradas numeradas
  const main = document.createElement('div');
  main.className = 'aa-tl__main';
  main.setAttribute('data-aa-tl', '');

  const line = document.createElement('span');
  line.className = 'aa-tl__line';
  line.setAttribute('aria-hidden', 'true');
  const fill = document.createElement('span');
  fill.className = 'aa-tl__fill';
  fill.setAttribute('data-aa-tl-fill', '');
  line.appendChild(fill);

  const items = document.createElement('ul');
  items.className = 'aa-tl__items';
  t.concepts.forEach((concept, i) => items.appendChild(buildItem(concept, i)));

  main.append(line, items);

  const grid = document.createElement('div');
  grid.className = 'aa-tl';
  grid.append(aside, main);

  section.appendChild(renderContainer({ size: 'default', children: [grid] }));
  root.appendChild(section);
}
