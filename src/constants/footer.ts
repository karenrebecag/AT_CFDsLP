// Footer oficial de ATFX — links, redes y disclaimer legal, bilingües (ES/EN). Los
// hrefs apuntan al sitio global de ATFX (mismos destinos en ambos idiomas); las etiquetas
// y el disclaimer se traducen. Contenido real de marca (no placeholder).

import type { Lang } from '../core/types';

export interface FooterLink {
  label: string;
  href: string;
}
export interface FooterGroup {
  title: string;
  links: FooterLink[];
}
export interface FooterSocial {
  label: string;
  href: string;
  icon: string; // inner SVG markup
  fill: boolean;
}

export const ATFX_HOME: Record<Lang, string> = {
  es: 'https://www.atfx.com/es/',
  en: 'https://www.atfx.com/en/',
};

export const FOOTER_GROUPS: Record<Lang, FooterGroup[]> = {
  es: [
    {
      title: 'Legal',
      links: [
        { label: 'Legal', href: 'https://www.atfx.com/es/condiciones-legales' },
        { label: 'Términos comerciales', href: 'https://www.atfx.com/wp-content/uploads/2024/04/AT-Global-Markets-MU_EN_Standard-Terms-of-Business.pdf' },
        { label: 'Privacidad', href: 'https://www.atfx.com/wp-content/uploads/2024/04/AT-Global-Markets-MU_EN_Privacy-and-Internal-Privacy-Controls-Policy.pdf' },
        { label: 'Cookies', href: 'https://www.atfx.com/wp-content/uploads/2025/03/ES-ATFX-GM-Cookies-Policy-EN-V20200605.pdf' },
        { label: 'Boletines', href: 'https://notice.atfx.com/es/notice' },
      ],
    },
    {
      title: 'Sobre Nosotros',
      links: [
        { label: 'Nuestra visión', href: 'https://www.atfx.com/es/sobre-nosotros/nuestra-vision' },
        { label: '¿Por qué elegir ATFX?', href: 'https://www.atfx.com/es/sobre-nosotros/por-que-elegir-atfx' },
        { label: 'Licencias ATFX', href: 'https://www.atfx.com/es/sobre-nosotros/atfx-reguladores' },
        { label: 'Premios y reconocimientos', href: 'https://www.atfx.com/es/sobre-nosotros/premios-y-reconocimientos' },
        { label: 'Responsabilidad social corporativa', href: 'https://www.atfx.com/es/duke-of-edinburgh-cup-sponsorship' },
        { label: 'Noticias de la compañía', href: 'https://www.atfx.com/es/sobre-nosotros/noticias-de-la-compania' },
      ],
    },
  ],
  en: [
    {
      title: 'Legal',
      links: [
        { label: 'Legal', href: 'https://www.atfx.com/es/condiciones-legales' },
        { label: 'Terms of business', href: 'https://www.atfx.com/wp-content/uploads/2024/04/AT-Global-Markets-MU_EN_Standard-Terms-of-Business.pdf' },
        { label: 'Privacy', href: 'https://www.atfx.com/wp-content/uploads/2024/04/AT-Global-Markets-MU_EN_Privacy-and-Internal-Privacy-Controls-Policy.pdf' },
        { label: 'Cookies', href: 'https://www.atfx.com/wp-content/uploads/2025/03/ES-ATFX-GM-Cookies-Policy-EN-V20200605.pdf' },
        { label: 'Notices', href: 'https://notice.atfx.com/es/notice' },
      ],
    },
    {
      title: 'About us',
      links: [
        { label: 'Our vision', href: 'https://www.atfx.com/es/sobre-nosotros/nuestra-vision' },
        { label: 'Why choose ATFX?', href: 'https://www.atfx.com/es/sobre-nosotros/por-que-elegir-atfx' },
        { label: 'ATFX licences', href: 'https://www.atfx.com/es/sobre-nosotros/atfx-reguladores' },
        { label: 'Awards & recognitions', href: 'https://www.atfx.com/es/sobre-nosotros/premios-y-reconocimientos' },
        { label: 'Corporate social responsibility', href: 'https://www.atfx.com/es/duke-of-edinburgh-cup-sponsorship' },
        { label: 'Company news', href: 'https://www.atfx.com/es/sobre-nosotros/noticias-de-la-compania' },
      ],
    },
  ],
};

export const FOOTER_SOCIALS: FooterSocial[] = [
  { label: 'Facebook', href: 'https://www.facebook.com/ATFXLatam', fill: true, icon: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>' },
  { label: 'Instagram', href: 'https://www.instagram.com/atfxlatinoamerica', fill: false, icon: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>' },
  { label: 'X', href: 'https://x.com/ATFX_Latam', fill: true, icon: '<path d="M13.71 10.59L20.41 2.8H18.82L13 9.56L8.35 2.8H3L10.03 13.03L3 21.2H4.59L10.73 14.06L15.64 21.2H21L13.71 10.59ZM11.54 13.12L10.83 12.1L5.16 4H7.6L12.17 10.54L12.88 11.56L18.82 20.06H16.38L11.53 13.12H11.54Z"/>' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/atfx-latam/', fill: true, icon: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>' },
  { label: 'YouTube', href: 'https://www.youtube.com/@atfxlatam', fill: true, icon: '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#08101d"/>' },
];

export const FOOTER_LEGAL: Record<Lang, string> = {
  es: 'ATFX es una alianza estratégica formada por un grupo de entidades que incluye: AT Global Markets (UK) Ltd, autorizada y regulada por la FCA (n.º 760555) · AT Global Markets (Australia) Pty Ltd, regulada por ASIC (AFSL 418036) · AT Global Markets SA (Pty) Ltd, regulada por FSCA (FSP 44816) · ATFX Global Markets (CY) Ltd, regulada por CySEC (licencia 285/15) · AT Global Markets Intl Ltd, regulada por FSC de Mauricio (C118023331) · AT Global Markets (SC) Limited, regulada por FSA de Seychelles (SD093) · ATFX MENA Financial Services LLC, regulada por CMA (n.º 20200000078) · AT Global Financial Services (HK) Limited, regulada por SFC de Hong Kong (BUM667) · ATFX (Cambodia) Company Limited, regulada por SERC (n.º 040). ADVERTENCIA DE INVERSIÓN DE ALTO RIESGO: El trading de Forex y CFDs es muy especulativo, conlleva un alto nivel de riesgo y puede no ser adecuado para todos los inversores. Puede perder parte o la totalidad de su capital. Regiones restringidas: AT Global Markets Intl Ltd no brinda servicios a residentes de Canadá, Japón, Corea del Norte, Irán ni EE.UU. © 2026 ATFX. Todos los derechos reservados.',
  en: 'ATFX is a strategic partnership formed by a group of entities that includes: AT Global Markets (UK) Ltd, authorised and regulated by the FCA (No. 760555) · AT Global Markets (Australia) Pty Ltd, regulated by ASIC (AFSL 418036) · AT Global Markets SA (Pty) Ltd, regulated by the FSCA (FSP 44816) · ATFX Global Markets (CY) Ltd, regulated by CySEC (licence 285/15) · AT Global Markets Intl Ltd, regulated by the FSC of Mauritius (C118023331) · AT Global Markets (SC) Limited, regulated by the FSA of Seychelles (SD093) · ATFX MENA Financial Services LLC, regulated by the CMA (No. 20200000078) · AT Global Financial Services (HK) Limited, regulated by the SFC of Hong Kong (BUM667) · ATFX (Cambodia) Company Limited, regulated by the SERC (No. 040). HIGH-RISK INVESTMENT WARNING: Trading Forex and CFDs is highly speculative, carries a high level of risk and may not be suitable for all investors. You may lose some or all of your invested capital. Restricted regions: AT Global Markets Intl Ltd does not provide services to residents of Canada, Japan, North Korea, Iran or the USA. © 2026 ATFX. All rights reserved.',
};
