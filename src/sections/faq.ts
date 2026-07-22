// FAQ — card flotante (patrón ATOM): eyebrow + heading + intro + Accordion + CTA.
// Sección light (penúltima antes del footer), sin mapa. Copy CFDs bilingüe (ES/EN).

import { renderContainer } from '../ui/layout';
import { renderHeading, renderParagraph } from '../ui/text';
import { renderPill } from '../ui/atoms/pill';
import { renderAccordion } from '../ui/accordion';
import { renderButton } from '../ui/atoms/button';
import type { Lang } from '../core/types';
import type { FaqItem } from '../constants/content';

interface FaqCopy {
  eyebrow: string;
  heading: string;
  intro: string;
  cta: string;
  faqs: FaqItem[];
}

const COPY: Record<Lang, FaqCopy> = {
  es: {
    eyebrow: 'FAQ',
    heading: 'Preguntas frecuentes',
    intro: 'Lo esencial antes de operar CFDs con ATFX. Si te queda alguna duda, contáctanos y nuestro equipo te acompaña.',
    cta: 'Quiero más información',
    faqs: [
      { question: '¿En qué se diferencian los CFDs de comprar el activo?', answer: 'Comprar el activo significa que lo posees y solo ganas si el precio sube. Con CFDs no lo posees: operas la dirección del precio. Eso te da apalancamiento y la posibilidad de ganar cuando los precios caen, pero también significa que puedes ser liquidado si el mercado se mueve en tu contra.' },
      { question: '¿Cuál es la diferencia entre largo y corto?', answer: 'Ir largo significa que ganas si el precio sube. Ir corto significa que ganas si el precio baja. Con la inversión tradicional solo ganas cuando los precios suben; los CFDs te permiten tomar posición en cualquier dirección.' },
      { question: '¿Qué es el swap o costo de financiamiento?', answer: 'Es un pequeño cargo o crédito que se aplica al mantener una posición abierta de un día para otro. Depende del activo, de tu dirección y de las tasas de interés asociadas. En operaciones intradía no aplica.' },
      { question: '¿Qué es la liquidación?', answer: 'Es cuando tu posición se cierra automáticamente porque el mercado se movió lo suficiente en tu contra y tu margen se agotó. Cuanto más apalancamiento usas, menor es el movimiento de precio necesario para activarla.' },
      { question: '¿Puedo perder más de lo que deposité?', answer: 'Los mecanismos de cierre automático limitan pérdidas cerrando posiciones cuando el margen se agota, pero no funcionan como un stop loss garantizado. Movimientos rápidos o extremos del mercado, incluyendo gaps de precio o baja liquidez, pueden ejecutarse a precios significativamente peores que el nivel de liquidación, lo que podría producir un saldo negativo.' },
      { question: '¿Hay mínimos requeridos?', answer: 'El tamaño mínimo de operación depende del activo y se muestra en la plataforma antes de operar.' },
      { question: '¿Qué puedo operar?', answer: 'Divisas, índices, materias primas como oro y petróleo, acciones y más, todo desde una sola cuenta.' },
    ],
  },
  en: {
    eyebrow: 'FAQ',
    heading: 'Frequently asked',
    intro: 'The essentials before trading CFDs with ATFX. If you still have questions, contact us and our team will guide you.',
    cta: 'Get more information',
    faqs: [
      { question: 'How are CFDs different from buying the asset?', answer: 'Buying the asset means you own it and can only profit if the price goes up. With CFDs you don’t own it: you trade price direction. That unlocks leverage and the ability to profit when prices fall, but it also means you can be liquidated if the market moves against you.' },
      { question: 'What is the difference between long and short?', answer: 'Going long means you profit if the price rises. Going short means you profit if the price falls. With traditional investing you can only make money when prices go up; CFDs let you take a position in either direction.' },
      { question: 'What is the swap or financing cost?', answer: 'It’s a small charge or credit applied when you hold a position open overnight. It depends on the asset, your direction, and the associated interest rates. It doesn’t apply to intraday trades.' },
      { question: 'What is liquidation?', answer: 'Liquidation is when your position is automatically closed because the market moved far enough against you and your margin ran out. The more leverage you use, the smaller the price move required to trigger it.' },
      { question: 'Can I lose more than I deposit?', answer: 'Auto-liquidation mechanisms limit losses by closing positions when margin thresholds are breached, but they do not function as a guaranteed stop-loss. Rapid or extreme market movements, including price gaps or periods of illiquidity, may execute at prices significantly worse than the liquidation trigger, potentially producing a negative account balance.' },
      { question: 'Are there required minimums?', answer: 'The minimum trade size depends on the asset and is shown on the platform before you trade.' },
      { question: 'What can I trade?', answer: 'Forex, indices, commodities like gold and oil, stocks, and more — all from a single account.' },
    ],
  },
};

export function renderFaqSection(root: Element, lang: Lang): void {
  const t = COPY[lang];

  const section = document.createElement('section');
  section.className = 'aa-section aa-faq';
  section.id = 'faq';
  section.setAttribute('data-aa-section-theme', 'light');
  section.setAttribute('data-aa-nav-anchor', '');

  const badge = renderPill(t.eyebrow);
  badge.setAttribute('data-aa-fade', '');

  const heading = renderHeading({ size: 'l', tag: 'h2', text: t.heading, split: true });

  const intro = renderParagraph({ size: 'l', text: t.intro, className: 'aa-faq__intro' });
  intro.setAttribute('data-aa-fade', '');

  const acc = renderAccordion(t.faqs);
  acc.setAttribute('data-aa-fade', '');

  const cta = document.createElement('div');
  cta.className = 'aa-faq__cta';
  cta.appendChild(renderButton({ href: '#registro', label: t.cta, variant: 'primary' }));

  const inner = document.createElement('div');
  inner.className = 'aa-faq__inner';
  inner.append(badge, heading, intro, acc, cta);

  const card = renderContainer({ size: 'default', className: 'aa-container--card', children: [inner] });
  section.appendChild(card);
  root.appendChild(section);
}
