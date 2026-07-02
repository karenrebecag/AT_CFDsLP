// Tabla comparativa "Compra directa vs. CFDs" — maquetación Relume "Comparison 1":
// header centrado + tabla de filas (etiqueta | opción A | opción B) con check/cross y
// una columna destacada (CFDs). Card oscuro (navy) sobre strip claro. Copy CFDs bilingüe.

import { renderContainer } from '../ui/layout';
import { renderHeading, renderParagraph } from '../ui/text';
import { renderPill } from '../ui/atoms/pill';
import { renderMediaSlot } from '../ui/atoms/media-slot';
import type { Lang } from '../core/types';

interface Cell {
  state: 'yes' | 'no';
  text: string;
}
interface Row {
  label: string;
  a: Cell; // compra directa
  b: Cell; // CFDs (columna destacada)
}
interface CompareCopy {
  eyebrow: string;
  heading: string;
  lead: string;
  colA: string;
  colB: string;
  rows: Row[];
}

const ICON = {
  check: '<path d="M20 6 9 17l-5-5"/>',
  close: '<path d="M18 6 6 18"/><path d="M6 6l12 12"/>',
};

const COPY: Record<Lang, CompareCopy> = {
  es: {
    eyebrow: 'Lo básico',
    heading: 'Compra directa vs. CFDs',
    lead: 'La diferencia entre poseer el activo y operar su precio.',
    colA: 'Compra directa',
    colB: 'CFDs',
    rows: [
      { label: 'Posees el activo', a: { state: 'yes', text: 'Sí' }, b: { state: 'no', text: 'No' } },
      { label: 'Ganas si el precio baja', a: { state: 'no', text: 'No' }, b: { state: 'yes', text: 'Sí, yendo corto' } },
      { label: 'Apalancamiento', a: { state: 'no', text: 'No' }, b: { state: 'yes', text: 'Sí' } },
      { label: 'Cierre forzado', a: { state: 'no', text: 'No' }, b: { state: 'yes', text: 'Sí, vía liquidación' } },
    ],
  },
  en: {
    eyebrow: 'The basics',
    heading: 'Direct buying vs. CFDs',
    lead: 'The difference between owning the asset and trading its price.',
    colA: 'Direct buying',
    colB: 'CFDs',
    rows: [
      { label: 'Own the asset', a: { state: 'yes', text: 'Yes' }, b: { state: 'no', text: 'No' } },
      { label: 'Profit when price falls', a: { state: 'no', text: 'No' }, b: { state: 'yes', text: 'Yes, by going short' } },
      { label: 'Leverage', a: { state: 'no', text: 'No' }, b: { state: 'yes', text: 'Yes' } },
      { label: 'Forced closure', a: { state: 'no', text: 'No' }, b: { state: 'yes', text: 'Yes, via liquidation' } },
    ],
  },
};

function buildCell(cell: Cell, highlight: boolean): HTMLElement {
  const el = document.createElement('span');
  el.className = highlight ? 'aa-compare__cell is--hl' : 'aa-compare__cell';
  const icon = document.createElement('span');
  icon.className = `aa-compare__icon is--${cell.state}`;
  icon.setAttribute('aria-hidden', 'true');
  icon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${cell.state === 'yes' ? ICON.check : ICON.close}</svg>`;
  const text = document.createElement('span');
  text.className = 'aa-compare__cell-text';
  text.textContent = cell.text;
  el.append(icon, text);
  return el;
}

function buildRow(row: Row): HTMLElement {
  const el = document.createElement('div');
  el.className = 'aa-compare__row';
  el.setAttribute('data-aa-fade', '');
  const label = document.createElement('span');
  label.className = 'aa-compare__label';
  label.textContent = row.label;
  el.append(label, buildCell(row.a, false), buildCell(row.b, true));
  return el;
}

export function renderComparisonSection(root: Element, lang: Lang): void {
  const t = COPY[lang];

  const section = document.createElement('section');
  section.className = 'aa-section aa-compare';
  section.id = 'comparativa';
  section.setAttribute('data-aa-section-theme', 'dark');
  section.setAttribute('data-aa-nav-anchor', '');

  // Header centrado
  const head = document.createElement('div');
  head.className = 'aa-compare__head';
  const pill = renderPill(t.eyebrow);
  pill.setAttribute('data-aa-fade', '');
  const lead = renderParagraph({ size: 'l', text: t.lead, className: 'aa-compare__lead' });
  lead.setAttribute('data-aa-fade', '');
  head.append(pill, renderHeading({ size: 'l', tag: 'h2', text: t.heading, split: true }), lead);

  // Tabla
  const table = document.createElement('div');
  table.className = 'aa-compare__table';

  const headRow = document.createElement('div');
  headRow.className = 'aa-compare__row is--head';
  headRow.setAttribute('data-aa-fade', '');
  const spacer = document.createElement('span');
  spacer.className = 'aa-compare__label';
  spacer.setAttribute('aria-hidden', 'true');
  const nameA = document.createElement('span');
  nameA.className = 'aa-compare__col-name';
  nameA.textContent = t.colA;
  const nameB = document.createElement('span');
  nameB.className = 'aa-compare__col-name is--hl';
  nameB.textContent = t.colB;
  headRow.append(spacer, nameA, nameB);
  table.appendChild(headRow);

  t.rows.forEach((row) => table.appendChild(buildRow(row)));

  // Contenido a la izquierda (header + tabla), slot de imagen a la derecha
  const content = document.createElement('div');
  content.className = 'aa-compare__content';
  content.append(head, table);

  const media = renderMediaSlot({
    label: lang === 'es' ? 'Equipo operando' : 'Team trading',
    ratio: '4 / 5',
    className: 'aa-compare__media-slot',
    src: 'https://pub-62c41549a44642efbcd3f775bdb039b3.r2.dev/business-team-partner-working-with-computer-lapto-2026-01-11-08-42-19-utc_e9d2e7b61f593e0ec37a732572d4c2512e56cdbf97c654b996f2789779bb8e4b.webp',
  });

  const inner = document.createElement('div');
  inner.className = 'aa-compare__inner';
  inner.append(content, media);

  const card = renderContainer({ size: 'default', className: 'aa-container--card', children: [inner] });
  section.appendChild(card);
  root.appendChild(section);
}
