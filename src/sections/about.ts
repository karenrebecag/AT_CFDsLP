// 7 · Sobre el evento — efecto MWG 094 (drift gallery): sección pinneada con el texto
// (label + heading + sub) centrado fijo, mientras una tira de fotos de la masterclass
// deriva alrededor del centro al scrollear. Strip dark profundo. Init en drift-gallery.ts.

import { renderHeading, renderParagraph } from '../ui/text';
import { renderPill } from '../ui/atoms/pill';
import { MASTERCLASS_PHOTOS } from '../constants/masterclass';

// Subconjunto: ~12 fotos para que el recorrido pinneado no sea excesivo.
const PHOTOS = MASTERCLASS_PHOTOS.slice(0, 12);

export function renderAboutSection(root: Element): void {
  const section = document.createElement('section');
  section.className = 'aa-drift';
  section.id = 'evento';
  section.setAttribute('data-aa-section-theme', 'light');
  section.setAttribute('data-aa-nav-anchor', '');

  const container = document.createElement('div');
  container.className = 'aa-drift__container';

  // Texto centrado (queda fijo en el centro mientras las fotos derivan alrededor)
  const text = document.createElement('div');
  text.className = 'aa-drift__text';

  const pill = renderPill('Sobre el evento');

  const heading = renderHeading({
    size: 'l',
    tag: 'h2',
    text: 'Respaldado por ATFX y Blue Makers',
    highlight: 'Blue Makers',
  });

  const sub = renderParagraph({
    size: 'l',
    text: 'Una masterclass presencial en la Cámara de Comercio de Lima sobre el futuro de la inversión.',
    className: 'aa-drift__sub',
  });

  text.append(pill, heading, sub);

  // Tira horizontal de fotos
  const cards = document.createElement('div');
  cards.className = 'aa-drift__cards';
  PHOTOS.forEach((src, i) => {
    const img = document.createElement('img');
    img.className = 'aa-drift__card';
    img.src = src;
    img.alt = `Masterclass — foto ${i + 1}`;
    img.loading = 'lazy';
    img.decoding = 'async';
    cards.appendChild(img);
  });

  container.append(text, cards);
  section.appendChild(container);
  root.appendChild(section);
}
