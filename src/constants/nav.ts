// Navegación — labels + anclas, bilingües (ES/EN). Las anclas apuntan a secciones que
// existen en el DOM; el indicador del navbar se activa solo cuando el ancla existe.

import type { Lang } from '../core/types';

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: Record<Lang, NavLink[]> = {
  es: [
    { label: 'Habilidades', href: '#problema' },
    { label: 'Conceptos', href: '#aprenderas' },
    { label: 'Por qué ATFX', href: '#beneficios' },
    { label: 'FAQ', href: '#faq' },
  ],
  en: [
    { label: 'Skills', href: '#problema' },
    { label: 'Concepts', href: '#aprenderas' },
    { label: 'Why ATFX', href: '#beneficios' },
    { label: 'FAQ', href: '#faq' },
  ],
};

export const NAV_CTA: Record<Lang, NavLink> = {
  es: { label: 'Quiero más información', href: '#registro' },
  en: { label: 'Get more information', href: '#registro' },
};
