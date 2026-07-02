// 6 · Aliados / Quiénes dirigen la masterclass — tres strips portadas de ATOM:
//   La tesis    → intro centrado (statement)
//   El problema → Álvaro Matos (2-col, media izquierda + lista de dots)
//   La visión   → Josué Flores (2-col, media derecha + prosa)
// Una sola sección dark navy; media en placeholder hasta tener las fotos reales.

import { renderContainer } from '../ui/layout';
import { renderHeading, renderParagraph } from '../ui/text';
import { renderRotatingHeading } from '../ui/rotating-text';
import { renderPill } from '../ui/atoms/pill';

function mediaPlaceholder(label: string): HTMLElement {
  const media = document.createElement('div');
  media.className = 'aa-ally__media';
  const span = document.createElement('span');
  span.className = 'aa-ally__media-label';
  span.textContent = label;
  media.appendChild(span);
  return media;
}

function mediaPhoto(url: string, alt: string): HTMLElement {
  const media = document.createElement('div');
  media.className = 'aa-ally__media';
  const img = document.createElement('img');
  img.className = 'aa-ally__img';
  img.src = url;
  img.alt = alt;
  img.loading = 'lazy';
  img.decoding = 'async';
  media.appendChild(img);
  return media;
}

function allyMedia(o: { photo?: string; name: string }): HTMLElement {
  return o.photo ? mediaPhoto(o.photo, `Foto · ${o.name}`) : mediaPlaceholder(`Foto · ${o.name}`);
}

function roleLine(text: string): HTMLElement {
  const el = document.createElement('p');
  el.className = 'aa-ally__role';
  el.textContent = text;
  el.setAttribute('data-aa-fade', '');
  return el;
}

interface AllyOpts {
  side: 'left' | 'right'; // lado de la media
  name: string;
  role: string;
  heading: string;
  photo?: string;
}

// El problema → lista de dots
function buildAllyList(o: AllyOpts & { intro: string; list: string[] }): HTMLElement {
  const el = document.createElement('div');
  el.className = o.side === 'left' ? 'aa-ally aa-ally--media-left' : 'aa-ally';

  const text = document.createElement('div');
  text.className = 'aa-ally__text';

  const pill = renderPill(o.name);
  pill.setAttribute('data-aa-fade', '');

  const list = document.createElement('ul');
  list.className = 'aa-ally__list';
  list.setAttribute('data-aa-fade', '');
  o.list.forEach((t) => {
    const li = document.createElement('li');
    li.textContent = t;
    list.appendChild(li);
  });

  text.append(
    pill,
    renderHeading({ size: 'l', tag: 'h3', text: o.heading, split: true }),
    roleLine(o.role),
    renderParagraph({ size: 'l', text: o.intro }),
    list,
  );

  el.append(text, allyMedia(o));
  return el;
}

// La visión → prosa
function buildAllyProse(o: AllyOpts & { paragraphs: string[] }): HTMLElement {
  const el = document.createElement('div');
  el.className = o.side === 'left' ? 'aa-ally aa-ally--media-left' : 'aa-ally';

  const text = document.createElement('div');
  text.className = 'aa-ally__text';

  const pill = renderPill(o.name);
  pill.setAttribute('data-aa-fade', '');

  text.append(pill, renderHeading({ size: 'l', tag: 'h3', text: o.heading, split: true }), roleLine(o.role));
  o.paragraphs.forEach((p) => {
    const par = renderParagraph({ size: 'l', text: p });
    par.setAttribute('data-aa-fade', '');
    text.appendChild(par);
  });

  el.append(text, allyMedia(o));
  return el;
}

export function renderSpeakersSection(root: Element): void {
  const section = document.createElement('section');
  section.className = 'aa-section aa-speakers';
  section.id = 'speakers';
  section.setAttribute('data-aa-section-theme', 'dark');
  section.setAttribute('data-aa-nav-anchor', '');

  // — Strip 1 · intro (La tesis) —
  const intro = document.createElement('div');
  intro.className = 'aa-allies-intro';
  const introPill = renderPill('Aliados');
  introPill.setAttribute('data-aa-fade', '');
  intro.append(
    introPill,
    renderRotatingHeading({
      size: 'l',
      tag: 'h2',
      before: 'Quiénes',
      words: ['dirigen', 'lideran', 'imparten', 'guían'],
      after: 'la masterclass',
    }),
    renderParagraph({
      size: 'l',
      text: 'La formación está liderada por el equipo de Blue Makers: traders e inversionistas en activo que operan los mercados todos los días y forman a la próxima generación de inversionistas en LATAM.',
    }),
  );

  // — Strip 2 · Álvaro Matos (prosa, media izquierda) —
  const alvaro = buildAllyProse({
    side: 'left',
    name: 'Álvaro Matos',
    role: 'Co-CEO de Blue Makers. Cofundador de Skilly Fund.',
    photo: 'https://pub-62c41549a44642efbcd3f775bdb039b3.r2.dev/%2Cn%CC%83mln.kb%2Cvjmchnfgxbdfzxncmg%2C_4e1baf77176b027c45966af329a62c44c5ceb9f6c7bf4712a4b97c9ae12fe6ce.webp',
    heading: 'Estrategia que opera todos los días',
    paragraphs: [
      'Trader e inversionista con experiencia en mercados financieros, criptomonedas y análisis macroeconómico.',
      'Está certificado en Análisis de Datos Financieros por Bloomberg y lidera un ecosistema que integra un fondo de inversión basado en trading cuantitativo algorítmico, una academia de formación para traders y programas de mentoría presencial.',
      'Su enfoque combina macroeconomía, análisis de mercados y tecnología aplicada a las inversiones.',
    ],
  });

  // — Strip 3 · Josué Flores (intro + viñetas, media derecha) —
  const josue = buildAllyList({
    side: 'right',
    name: 'Josué Flores',
    role: 'Fundador y CEO de Blue Makers. Cofundador de Skilly Fund.',
    photo: 'https://pub-62c41549a44642efbcd3f775bdb039b3.r2.dev/1_ff76c0d7bc1893d54ed31a9eb14cc1d9fe01136767b7ea840a67b051c3d4f6c4.webp',
    heading: 'Seis años operando los mercados',
    intro:
      '6 años operando en los mercados financieros. Trader e inversionista con experiencia en mercados financieros, análisis macroeconómico y cuantitativo.',
    list: [
      'Certificado en Análisis de Datos Financieros por Bloomberg',
      'Lidera un fondo de inversión de trading cuantitativo algorítmico',
      'Dirige una academia de formación en trading que lleva operando en vivo hace más de 2 años.',
      'Se enfoca en el largo plazo principalmente en índices americanos',
    ],
  });

  const inner = document.createElement('div');
  inner.className = 'aa-allies';
  inner.append(intro, alvaro, josue);

  section.appendChild(renderContainer({ size: 'default', children: [inner] }));
  root.appendChild(section);
}
