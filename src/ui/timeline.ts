// Timeline (conceptos CFDs) — anima la línea de progreso vertical y activa los dots al
// scroll. Port vanilla del efecto de Relume "Timeline 1" (allí con motion/react); aquí
// con GSAP + ScrollTrigger. Idempotente por [data-aa-tl].

import { gsap, ScrollTrigger } from './gsap-env';

const prefersReduced = (): boolean =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

export function initTimeline(scope: Element): void {
  const tl = scope.querySelector<HTMLElement>('[data-aa-tl]');
  if (!tl) return;

  const fill = tl.querySelector<HTMLElement>('[data-aa-tl-fill]');
  const items = tl.querySelector<HTMLElement>('.aa-tl__items');
  const dots = Array.from(tl.querySelectorAll<HTMLElement>('[data-aa-tl-dot]'));

  // Dots: se marcan activos al cruzar el centro del viewport (progreso de lectura).
  dots.forEach((dot) => {
    ScrollTrigger.create({
      trigger: dot,
      start: 'top center',
      onEnter: () => dot.classList.add('is-active'),
      onLeaveBack: () => dot.classList.remove('is-active'),
    });
  });

  if (prefersReduced() || !fill || !items) return;

  // La línea se rellena de arriba a abajo conforme la columna de entradas recorre el
  // viewport (scrub atado al progreso, sin duración fija).
  gsap.fromTo(
    fill,
    { scaleY: 0 },
    {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: items, start: 'top center', end: 'bottom center', scrub: true },
    },
  );
}
