// Slot de media — marco con aspect-ratio. Sin fuente = placeholder (icono + etiqueta).
// Con `video` (o `src`) = media real recortado a cover. Decorativo (role=img/aria-label).

interface MediaSlotOptions {
  label: string;
  ratio?: string; // p. ej. '16 / 10'
  className?: string;
  src?: string; // imagen
  video?: string; // video stock (loop muted)
}

const PICTURE_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" ' +
  'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
  '<rect x="3" y="3" width="18" height="18" rx="2"/>' +
  '<circle cx="9" cy="9" r="2"/><path d="m21 15-4.35-4.35a2 2 0 0 0-2.83 0L4 21"/></svg>';

export function renderMediaSlot(opts: MediaSlotOptions): HTMLElement {
  const el = document.createElement('div');
  el.className = opts.className ? `aa-media-slot ${opts.className}` : 'aa-media-slot';
  if (opts.ratio) el.style.aspectRatio = opts.ratio;
  el.setAttribute('role', 'img');
  el.setAttribute('aria-label', opts.label);
  el.setAttribute('data-aa-fade', '');

  if (opts.video) {
    el.classList.add('is--filled');
    const video = document.createElement('video');
    video.className = 'aa-media-slot__media';
    video.src = opts.video;
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('preload', 'metadata');
    video.setAttribute('aria-hidden', 'true');
    el.appendChild(video);
    return el;
  }

  if (opts.src) {
    el.classList.add('is--filled');
    const img = document.createElement('img');
    img.className = 'aa-media-slot__media';
    img.src = opts.src;
    img.alt = opts.label;
    img.loading = 'lazy';
    img.decoding = 'async';
    el.appendChild(img);
    return el;
  }

  const icon = document.createElement('span');
  icon.className = 'aa-media-slot__icon';
  icon.innerHTML = PICTURE_ICON;
  const label = document.createElement('span');
  label.className = 'aa-media-slot__label';
  label.textContent = opts.label;
  el.append(icon, label);
  return el;
}
