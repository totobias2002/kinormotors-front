import { SITIO } from '../config/sitio.js'

/** Arma el link wa.me con el mensaje precargado. Si se pasa un modelo, el mensaje lo menciona. */
export function armarLinkWhatsapp({ modelo, numero = SITIO.whatsappNumero } = {}) {
  const texto = modelo
    ? `Hola, quiero info sobre el Kia ${modelo}`
    : 'Hola, quiero más información sobre los Kia de Kinor Motors'
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`
}
