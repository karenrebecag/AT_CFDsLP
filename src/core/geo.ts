// Geo-IP solo front (sin API key, el bundle es público): detecta el país del visitante y lo
// mapea a idioma. Cascada de proveedores con timeout y degradación silenciosa. Cloudflare
// /cdn-cgi/trace primero (mismo origen, rápido — el sitio está tras Cloudflare); luego
// ipwho.is / geojs.io como respaldo. Reutiliza el enfoque de atfx-forms (core/geo.ts).

import type { Lang } from './types';

const TIMEOUT_MS = 1200;

// Países hispanohablantes (ISO2) → 'es'. El resto → 'en'. Brasil (BR) cae a 'en' hasta que
// exista 'pt' en la LP (cambio de una línea: añadir 'BR' aquí lo mandaría a 'es').
const SPANISH: ReadonlySet<string> = new Set([
  'MX', 'CO', 'PE', 'CL', 'AR', 'EC', 'VE', 'GT', 'CU', 'BO',
  'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'ES', 'GQ', 'PR',
]);

function langForCountry(iso2: string): Lang {
  return SPANISH.has(iso2.toUpperCase()) ? 'es' : 'en';
}

async function fromCloudflare(signal: AbortSignal): Promise<string | undefined> {
  const res = await fetch('/cdn-cgi/trace', { signal });
  if (!res.ok) return undefined;
  const txt = await res.text();
  return txt.match(/^loc=([A-Z]{2})$/m)?.[1];
}

async function fromJson(url: string, key: string, signal: AbortSignal): Promise<string | undefined> {
  const res = await fetch(url, { signal, headers: { Accept: 'application/json' } });
  if (!res.ok) return undefined;
  const data: unknown = await res.json();
  if (data && typeof data === 'object' && key in data) {
    const v = (data as Record<string, unknown>)[key];
    if (typeof v === 'string' && v.length === 2) return v;
  }
  return undefined;
}

// Idioma por país (IP), o null ante cualquier fallo/timeout. Prueba proveedores en orden.
export async function detectLang(): Promise<Lang | null> {
  const providers: ((s: AbortSignal) => Promise<string | undefined>)[] = [
    fromCloudflare,
    (s) => fromJson('https://ipwho.is/', 'country_code', s),
    (s) => fromJson('https://get.geojs.io/v1/ip/country.json', 'country', s),
  ];
  for (const provider of providers) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const iso2 = await provider(controller.signal);
      if (iso2) return langForCountry(iso2);
    } catch {
      // proveedor caído / timeout / CORS → probar el siguiente
    } finally {
      clearTimeout(timer);
    }
  }
  return null;
}
