// Hero (banner) — maquetación Relume "Header 113": fondo full-bleed (video + overlay),
// contenido anclado abajo en 2 columnas (título + CTA | subheading + producto) y una
// banda de métricas full-width con odómetro. Copy CFDs bilingüe (ES/EN). Tokens --aa-*.

import { renderHeading } from '../ui/text';
import { renderButton } from '../ui/atoms/button';
import { renderPill } from '../ui/atoms/pill';
import { ASSETS } from '../constants/assets';
import type { Lang } from '../core/types';

interface HeroCopy {
  pill: string;
  title: string;
  sub: string; // admite **negritas** para remarcar frases clave
  product: string; // admite **negritas**
  cta: string;
}

const COPY: Record<Lang, HeroCopy> = {
  es: {
    pill: 'CFDs',
    title: 'De la mesa al mercado.',
    sub: 'Ya sabes **leer la mesa**, **gestionar tu bankroll** y poner tu dinero cuando las probabilidades están de tu lado. **En los mercados es igual.**',
    product: 'Opera **divisas, oro, índices y más** con ATFX. **Sin poseer el activo. En ambas direcciones.**',
    cta: 'Abre tu cuenta',
  },
  en: {
    pill: 'CFDs',
    title: 'From the table to the markets.',
    sub: 'You already know how to **read the table**, **manage your bankroll**, and put your money down when the odds are in your favor. **In the markets, it is the same.**',
    product: 'Trade **forex, gold, indices, and more** with ATFX. **Without owning the asset. In both directions.**',
    cta: 'Open your account',
  },
};

// Mini-parser de negritas: convierte los tramos **...** en <strong> (resto = texto plano).
// Copy estático y confiable → sin innerHTML, se construye por nodos.
function appendRich(el: HTMLElement, text: string): void {
  text.split(/\*\*(.+?)\*\*/g).forEach((part, i) => {
    if (!part) return;
    if (i % 2 === 1) {
      const strong = document.createElement('strong');
      strong.className = 'aa-hero__em';
      strong.textContent = part;
      el.appendChild(strong);
    } else {
      el.appendChild(document.createTextNode(part));
    }
  });
}

interface CredItem {
  value: string;
  label: Record<Lang, string>;
}

// Barra de credibilidad. Cifras de fuentes oficiales de ATFX (atfx.com/about-us,
// atfx.com/es), SUJETAS A VERIFICACIÓN del equipo antes de publicar:
//   2017 = "Trusted Worldwide Since 2017" · 14 países con equipo/oficinas ·
//   10 licencias regulatorias (FCA, ASIC, CySEC, FSCA, CMA, SFC HK, FSC MU, SFSA SC,
//   SERC KH, Colombia) · +500.000 clientes en el mundo.
const CREDIBILITY: CredItem[] = [
  { value: '2017', label: { es: 'Operando desde', en: 'Operating since' } },
  { value: '14', label: { es: 'Países con oficinas', en: 'Countries with offices' } },
  { value: '10', label: { es: 'Regulaciones', en: 'Regulators' } },
  { value: '+500K', label: { es: 'Clientes en el mundo', en: 'Clients worldwide' } },
];

function buildHeroMedia(): HTMLElement {
  if (ASSETS.splineScene) {
    const media = document.createElement('spline-viewer');
    media.className = 'aa-hero__spline';
    media.setAttribute('url', ASSETS.splineScene);
    media.setAttribute('loading-anim-type', 'none');
    media.setAttribute('aria-hidden', 'true');
    return media;
  }
  const video = document.createElement('video');
  video.className = 'aa-hero__video';
  video.src = ASSETS.heroVideo;
  video.muted = true;
  video.loop = true;
  video.autoplay = true;
  video.playsInline = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('preload', 'metadata');
  video.setAttribute('aria-hidden', 'true');
  return video;
}

// Banda de métricas: fila de stats (valor + etiqueta). Los valores llevan los data-attrs
// del odómetro (initNumberOdometer los detecta por [data-odometer-group]); ruedan como
// contador al entrar al viewport.
function buildCredibility(lang: Lang): HTMLElement {
  const bar = document.createElement('ul');
  bar.className = 'aa-hero__cred';
  bar.setAttribute('data-aa-fade', '');
  bar.setAttribute('data-odometer-group', '');
  bar.setAttribute('data-odometer-stagger-order', 'left');
  CREDIBILITY.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'aa-hero__cred-item';
    const value = document.createElement('span');
    value.className = 'aa-hero__cred-value';
    value.setAttribute('data-odometer-element', '');
    value.textContent = item.value;
    const label = document.createElement('span');
    label.className = 'aa-hero__cred-label';
    label.textContent = item.label[lang];
    li.append(value, label);
    bar.appendChild(li);
  });
  return bar;
}

export function renderHero(root: Element, lang: Lang): void {
  const t = COPY[lang];

  const hero = document.createElement('section');
  hero.className = 'aa-hero';
  hero.id = 'top';
  hero.setAttribute('data-aa-section-theme', 'dark'); // strip oscuro sobre el video
  hero.setAttribute('data-aa-nav-anchor', '');
  hero.setAttribute('data-aa-intro', ''); // sus hijos animan al montar (no al scroll)
  // Parallax: la escena de fondo se mueve scrubbeada al scroll
  hero.setAttribute('data-parallax', 'trigger');
  hero.setAttribute('data-parallax-start', '10');
  hero.setAttribute('data-parallax-end', '-10');

  // Fondo full-bleed: escena Spline o video de fallback + overlay oscuro.
  const bg = document.createElement('div');
  bg.className = 'aa-hero__bg';

  // Wrapper = target del parallax (GSAP mueve este; el scale/zoom va en el media interno).
  const mediaWrap = document.createElement('div');
  mediaWrap.className = 'aa-hero__media-wrap';
  mediaWrap.setAttribute('data-parallax', 'target');
  mediaWrap.appendChild(buildHeroMedia());

  const overlay = document.createElement('div');
  overlay.className = 'aa-hero__overlay';
  bg.append(mediaWrap, overlay);

  // Contenedor: contenido anclado al fondo del hero.
  const grid = document.createElement('div');
  grid.className = 'aa-hero__grid';

  const content = document.createElement('div');
  content.className = 'aa-hero__content';

  // Dos columnas: principal (pill + título + CTA + riesgo) | soporte (subheading + producto).
  const cols = document.createElement('div');
  cols.className = 'aa-hero__cols';

  const main = document.createElement('div');
  main.className = 'aa-hero__col aa-hero__col--main';

  const tag = renderPill(t.pill);
  tag.classList.add('aa-hero__tag');
  tag.setAttribute('data-aa-fade', '');
  main.appendChild(tag);

  main.appendChild(
    renderHeading({
      size: 'xxl',
      tag: 'h1',
      text: t.title,
      split: true,
      className: 'aa-hero__title',
    }),
  );

  const cta = document.createElement('div');
  cta.className = 'aa-hero__cta';
  cta.setAttribute('data-aa-fade', '');
  cta.appendChild(renderButton({ href: '#registro', label: t.cta, variant: 'primary' }));
  main.appendChild(cta);

  const support = document.createElement('div');
  support.className = 'aa-hero__col aa-hero__col--support';

  // Subheading = lead de la columna: reveal de palabras al montar (data-aa-split).
  const sub = document.createElement('p');
  sub.className = 'aa-hero__sub aa-hero__sub--lead';
  sub.setAttribute('data-aa-split', '');
  appendRich(sub, t.sub);
  support.appendChild(sub);

  // Línea de producto = apoyo: sube con fade al montar (data-aa-fade).
  const product = document.createElement('p');
  product.className = 'aa-hero__sub aa-hero__sub--product';
  product.setAttribute('data-aa-fade', '');
  appendRich(product, t.product);
  support.appendChild(product);

  cols.append(main, support);
  content.append(cols, buildCredibility(lang));
  grid.appendChild(content);
  hero.append(bg, grid);
  root.appendChild(hero);
}
