// Persistencia del idioma elegido manualmente. Vive aparte de index.ts para que el toggle
// del navbar guarde la elección en el CLICK (antes de recargar), sin depender de que el
// parámetro ?lang sobreviva al reload: cachés de página, CDN o el redirect canónico de
// WordPress pueden quitarlo, y sin este guardado el usuario quedaría atrapado en el último
// idioma persistido (típicamente 'en', el único que se alcanza tocando el toggle).

import type { Lang } from './types';

const LANG_KEY = 'aa-lang';

export function storedLang(): Lang | null {
  try {
    const v = localStorage.getItem(LANG_KEY);
    return v === 'es' || v === 'en' ? v : null;
  } catch {
    return null; // modo privado / storage bloqueado
  }
}

export function persistLang(lang: Lang): void {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    /* no-op */
  }
}
