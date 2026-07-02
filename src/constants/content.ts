// Contenido SCAFFOLD (placeholder on-topic) para las secciones portadas de Spark.
// La ESTRUCTURA es definitiva; el copy/data se reemplaza por el real de ATFX Perú.

export interface SpeakerData {
  name: string;
  role: string;
  company: string;
  bio?: string;
}
export interface BenefitData {
  title: string;
  text: string;
}
export interface FaqItem {
  question: string;
  answer: string;
}
export interface StatData {
  value: string;
  label: string;
}
export interface SocialData {
  label: string;
  href: string;
  icon: string; // inner SVG markup
  fill: boolean;
}

// 5 · Qué aprenderás (8 puntos reales del brief)
export const LEARN_POINTS: string[] = [
  'Comparación entre el plazo fijo y la inflación',
  'Cómo tus ingresos pierden valor con el tiempo',
  'Pros y contras de dejar tu dinero en el banco',
  'Qué hace el banco con tu dinero',
  '¿Es rentable invertir directamente desde el banco?',
  'Cómo trabaja un banco y cómo hacerlo por tu cuenta',
  'Oportunidades de inversión y estrategias',
  'Conoce nuestro fondo de inversión',
];

// 6 · Aliados / instructores (Blue Makers — datos reales del brief)
export const SPEAKERS: SpeakerData[] = [
  {
    name: 'Álvaro Matos',
    role: 'CEO de Blue Makers',
    company: 'Certificado Bloomberg',
    bio: 'Trader e inversionista con experiencia en mercados financieros, criptomonedas y análisis macroeconómico. Lidera un fondo de inversión basado en trading cuantitativo algorítmico, una academia de formación y programas de mentoría presencial.',
  },
  {
    name: 'Josué Flores',
    role: 'Fundador y CEO de Blue Makers · Co-CEO de SkillyFund',
    company: 'Certificado Bloomberg 2026',
    bio: 'Trader profesional con 6 años de experiencia, especializado en índices americanos. Analista fundamental y macroeconómico, ponente en eventos a nivel LATAM, con operativa diaria y sesiones presenciales semanales.',
  },
];

// 7 · Sobre el evento (datos reales del brief)
export const ABOUT_STATS: StatData[] = [
  { value: 'Presencial', label: 'Cámara de Comercio de Lima' },
  { value: '3 h', label: '14 de julio · 9:00–12:00' },
  { value: '+5 años', label: 'Blue Makers en trading' },
];

// 8 · Beneficios (placeholder)
export const BENEFITS: BenefitData[] = [
  { title: 'Aprende de especialistas', text: 'Conocimiento directo de quienes operan en los mercados todos los días.' },
  { title: 'Estrategias accionables', text: 'Sales con pasos concretos para aplicar, no solo teoría.' },
  { title: 'Networking', text: 'Conecta con otras personas que buscan hacer crecer su capital.' },
];

// 8 · Beneficios como slider de pilares (PillarSlider) — placeholder
export interface PillarData {
  variant: 'dark' | 'gradient' | 'light';
  tags: string[];
  title: string;
  text: string;
}
export const PILLARS: PillarData[] = [
  { variant: 'dark', tags: ['Mercados'], title: 'Anticípate', text: 'Aprende a leer las señales del mercado antes que la mayoría.' },
  { variant: 'gradient', tags: ['Estrategia'], title: 'Invierte', text: 'Construye una estrategia con criterio y objetivos claros.' },
  { variant: 'light', tags: ['Patrimonio'], title: 'Protege', text: 'Resguarda el valor de tu capital frente a la inflación.' },
  { variant: 'dark', tags: ['Networking'], title: 'Conecta', text: 'Rodéate de personas que buscan hacer crecer su capital.' },
  { variant: 'gradient', tags: ['Acción'], title: 'Aplica', text: 'Sal con pasos concretos para empezar a invertir hoy.' },
];

// 9 · FAQ (presencial — sin preguntas de "webinar gratuito"/"me van a vender", por brief)
export const FAQS: FaqItem[] = [
  { question: '¿Necesito experiencia previa en inversión?', answer: 'No. La masterclass está diseñada para que cualquier persona entienda los conceptos desde cero.' },
  { question: '¿El evento es presencial?', answer: 'Sí. Es 100% presencial en la Cámara de Comercio de Lima, el martes 14 de julio de 9:00 a.m. a 12:00 p.m.' },
  { question: '¿Qué plataforma necesito para asistir?', answer: 'Ninguna: es un evento presencial. Al registrarte te enviamos por correo la ubicación y los detalles de acceso.' },
  { question: '¿Recibiré algún material?', answer: 'Sí. Los asistentes reciben material de apoyo y merchandising exclusivo del evento.' },
  { question: '¿Cómo confirmo mi lugar?', answer: 'Completa el formulario de registro en esta página. Recibirás la confirmación por correo. Los cupos son limitados.' },
];

// 10 · Redes (placeholder hrefs — reemplazar por las cuentas reales de ATFX Perú)
export const SOCIALS: SocialData[] = [
  {
    label: 'Instagram',
    href: '#',
    icon: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
    fill: false,
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    fill: true,
  },
];

// 10 · Aliados (placeholder — reemplazar por logos reales)
export const ALLIES: string[] = ['Aliado 1', 'Aliado 2', 'Aliado 3', 'Aliado 4', 'Aliado 5'];
