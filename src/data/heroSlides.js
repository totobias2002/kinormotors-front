// Slides del banner de la home, en el mismo orden y con los mismos textos que el banner de Kia Argentina.
// Las imagenes estan en public/assets/hero/ (<slug>-desktop / <slug>-mobile).
// `modelo` es el modelo al que se asocia el WhatsApp del boton (para el mensaje y la trazabilidad).
const M = {
  k4h: { slug: 'k4-hatchback', nombre: 'K4 Hatchback' },
  k4s: { slug: 'k4-sedan', nombre: 'K4 Sedán' },
  k3c: { slug: 'k3-cross', nombre: 'K3 Cross' },
  k3s: { slug: 'k3-sedan', nombre: 'K3 Sedán' },
  tasman: { slug: 'tasman', nombre: 'Tasman' },
  carnival: { slug: 'carnival', nombre: 'Carnival' },
  sportage: { slug: 'sportage', nombre: 'Sportage' },
  seltos: { slug: 'seltos', nombre: 'Seltos' },
  k2500: { slug: 'k2500', nombre: 'K2500' },
}

const img = (nombre, ext = 'webp') => ({
  desktop: `/assets/hero/${nombre}-desktop.${ext === 'jpg' ? 'jpg' : 'webp'}`,
  mobile: `/assets/hero/${nombre}-mobile.webp`,
})

export const HERO_SLIDES = [
  { id: 'k4-hatchback', ...img('k4-hatchback'), titulo: 'Kia K4', subtitulo: 'De lo ordinario a lo extraordinario', boton: 'Conocer más', modelo: M.k4h },
  { id: 'tasman', ...img('tasman'), titulo: 'Tasman', subtitulo: 'Explorá una nueva dimensión', boton: 'Conocer más', modelo: M.tasman },
  { id: 'tasman-santander', ...img('tasman-santander'), titulo: '', subtitulo: '', boton: 'Quiero mi Tasman', modelo: M.tasman },
  { id: 'tasman-park', ...img('tasman-park', 'jpg'), titulo: '', subtitulo: '', boton: 'Vení a probarla', modelo: M.tasman },
  { id: 'k4-sedan', ...img('k4-sedan'), titulo: 'K4 Sedán', subtitulo: 'Una nueva forma de avanzar', boton: 'Quiero mi K4', modelo: M.k4s, overlay: true },
  { id: 'k3-mejor-auto', ...img('k3-mejor-auto', 'jpg'), titulo: '', subtitulo: '', boton: 'Quiero mi K3', modelo: M.k3c },
  { id: 'k3-cross', ...img('k3-cross'), titulo: 'K3 Cross', subtitulo: 'Más allá de lo posible', boton: 'Conocer más', modelo: M.k3c },
  { id: 'k3-sedan', ...img('k3-sedan'), titulo: 'K3 Sedán', subtitulo: 'Más allá de lo posible', boton: 'Conocer más', modelo: M.k3s },
  { id: 'carnival', ...img('carnival'), titulo: 'Carnival', subtitulo: 'Amplia tus horizontes', boton: 'Conocer más', modelo: M.carnival },
  { id: 'sportage', ...img('sportage', 'jpg'), titulo: 'Sportage', subtitulo: 'Inspiración sin límites', boton: 'Conocer más', modelo: M.sportage },
  { id: 'seltos', ...img('seltos'), titulo: 'Seltos', subtitulo: 'Que nada te detenga', boton: 'Conocer más', modelo: M.seltos },
  { id: 'k2500', ...img('k2500'), titulo: 'K2500', subtitulo: 'A la medida de tu negocio', boton: 'Conocer más', modelo: M.k2500 },
]
