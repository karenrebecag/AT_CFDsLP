// Section header — patrón repetido en Spark (ValueProp/Edition/Faq): pill (eyebrow) +
// heading con split-reveal + subtítulo. Centrado por defecto.

import { renderHeading, renderParagraph } from './text';
import { renderPill } from './atoms/pill';

interface SectionHeaderOptions {
  eyebrow?: string;
  heading: string;
  sub?: string;
  align?: 'center' | 'left';
  highlight?: string;
}

export function renderSectionHeader(opts: SectionHeaderOptions): HTMLElement {
  const { eyebrow, heading, sub, align = 'center', highlight } = opts;
  const el = document.createElement('div');
  el.className = `aa-section-header aa-section-header--${align}`;
  if (eyebrow) el.appendChild(renderPill(eyebrow));
  el.appendChild(renderHeading({ size: 'l', tag: 'h2', text: heading, split: !highlight, highlight }));
  if (sub) el.appendChild(renderParagraph({ size: 'l', text: sub, className: 'aa-section-header__sub' }));
  return el;
}
