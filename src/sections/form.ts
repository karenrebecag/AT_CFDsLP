// Registro — card con el form atfx-forms. El widget es una librería desacoplada (loader
// desde jsDelivr); aquí solo aportamos el frame, el intro y el mount. id=registro (ancla
// de los CTAs). Copy CFDs bilingüe (ES/EN); sin countdown (no hay fecha de evento).

import { renderContainer } from '../ui/layout';
import { renderHeading, renderParagraph } from '../ui/text';
import { renderPill } from '../ui/atoms/pill';
import type { Lang } from '../core/types';

// Pin a v1.0.12: incluye el fix X-Requested-With/multipart (dispara la acción de Salesforce)
// y la preselección de país/prefijo por geo-IP. @latest podía servir un bundle cacheado.
const ATFX_LOADER = 'https://cdn.jsdelivr.net/gh/karenrebecag/at_forms@v1.0.12/loader.js';

interface FormCopy {
  pill: string;
  heading: string;
  lead: string;
}

const COPY: Record<Lang, FormCopy> = {
  es: {
    pill: 'Quiero más información',
    heading: 'Empieza tu experiencia con ATFX',
    lead: 'Completa el formulario y un especialista te contactará para ayudarte a conocer nuestras plataformas, tipos de cuenta y resolver cualquier duda antes de comenzar.',
  },
  en: {
    pill: 'Get more information',
    heading: 'Start your experience with ATFX',
    lead: 'Fill out the form and a specialist will contact you to help you get to know our platforms, account types, and answer any questions before you start.',
  },
};

export function renderFormSection(root: Element, lang: Lang): void {
  const t = COPY[lang];

  const section = document.createElement('section');
  section.className = 'aa-form-section';
  section.id = 'registro';
  section.setAttribute('data-aa-section-theme', 'light');
  section.setAttribute('data-aa-nav-anchor', '');

  // ── Intro (pill + heading + lead) ────────────────────────────────────────────
  const intro = document.createElement('div');
  intro.className = 'aa-form-section__intro';

  const lead = renderParagraph({ size: 'l', text: t.lead, className: 'aa-text-balance' });

  intro.append(
    renderPill(t.pill),
    renderHeading({ size: 'l', tag: 'h2', text: t.heading, split: false, className: 'aa-text-center' }),
    lead,
  );

  const mount = document.createElement('div');
  mount.setAttribute('data-atfx-form-mount', 'lead');
  mount.setAttribute('data-lang', lang);
  mount.setAttribute('data-theme', 'light'); // atfx-forms aplica su tema light

  // Card: intro + form.
  const inner = document.createElement('div');
  inner.className = 'aa-form-section__inner';
  inner.append(intro, mount);

  section.appendChild(
    renderContainer({ size: 'default', className: 'aa-container--card', children: [inner] }),
  );
  root.appendChild(section);
}

// Carga el motor de atfx-forms (el loader inyecta forms.css + forms.js apuntando al tag
// inmutable). Corre DESPUÉS de montar el DOM, para que encuentre el [data-atfx-form-mount].
export function initAtfxForm(): void {
  if (document.querySelector('script[src*="at_forms@"]')) return; // ya cargado
  const s = document.createElement('script');
  s.src = ATFX_LOADER;
  s.setAttribute('data-cfasync', 'false');
  document.body.appendChild(s);
}
