# Changelog

Formato basado en [Keep a Changelog](https://keepachangelog.com/es/1.1.0/).
Versionado: el CI de release etiqueta `vX.Y.Z` por push a `main` (cuando se conecte el repo).

## [Unreleased]

### Added
- Bootstrap del proyecto: duplicado 1:1 de `ATOM_Academy` como punto de partida (stack
  vanilla TS + esbuild + GSAP, Mount Point Pattern para Elementor).
- `PORT` configurable en `esbuild.config.mjs` (default `8766`) para coexistir con otros
  proyectos del mismo stack en local.
- Plan de traslado de SparkSummit2026 documentado en `CLAUDE.md` (mapeo de tokens,
  secciones, componentes y fases).
- Este `CHANGELOG.md`.
- Fotos reales de los aliados en la sección Speakers: Álvaro Matos (columna izquierda) y
  Josué Flores (strip inferior, columna derecha), reemplazando los placeholders.

### Changed
- Pin del loader de `at_forms` a `@v1.0.12` (incluye preselección de país/prefijo por geo-IP
  y el fix de envío a Salesforce).
- Fotos de aliados corregidas (cruce de identidad) y media en proporción 1:1 (antes 3:4
  desktop / 4:3 mobile).
- Rol unificado de Álvaro y Josué: "Fundador y CEO de Blue Makers. Cofundador de Skillyfund."
- Fotos de aliados en proporción 4:5 (ligeramente vertical).
- Countdown: squares en grid de columnas iguales (`minmax(0,1fr)`) con `aspect-ratio` 1:1,
  para que los 4 midan lo mismo; 2 columnas en mobile.

### Fixed
- Desborde horizontal en todas las strips: se restauró el reset `box-sizing: border-box`
  (perdido en el duplicado). Sin él, `width:100%` + `padding-inline` del `.aa-container`
  desbordaba y el `overflow-x: clip` del root recortaba el contenido por la derecha
  (más visible en la sección del form embebido).

### Changed
- Beneficios ("Por qué asistir"): se reemplazó el slider draggable por el efecto MWG 087
  (pin + scroll horizontal con inercia por card según la velocidad de scroll). Header sin
  cambios. Nuevos `ui/benefits-scroll.ts` y `styles/benefits.css`; `ui/slider.ts` +
  `styles/slider.css` quedan sin uso.
- FAQ accordion: portado el estilo de ATOM Academy (filas underline + icono +/−) en lugar
  del de Spark (pills rellenos), que se estiraban a lo ancho de la card navy.
- Git desconectado del duplicado (sin historial ni remote del proyecto origen).

### Pending
- Rebrand de identidad: `package.json` (`name`), refs `Academy_LP` en `loader.js` /
  `src/index.ts`, definir repo/remote/CDN destino.
- Traslado de las 9 secciones + navbar de SparkSummit (ver fases en `CLAUDE.md`).
- Reemplazo de contenido/copy/imagery por el de ATFX Perú.
