// Datos del sitio centralizados. Todo lo marcado con TODO sigue pendiente de confirmar con Javier / el cliente.

// En Node (tests) import.meta.env no existe
const env = import.meta.env ?? {}

const soloDigitos = (v) => String(v ?? '').replace(/\D/g, '')

export const SITIO = {
  nombre: 'Kinor Motors S.A.',

  // TODO: numero real de WhatsApp (formato internacional, solo digitos). Hoy es un placeholder.
  whatsappNumero: soloDigitos(env.VITE_WHATSAPP_NUMERO) || '5491100000000',

  // TODO: direccion, horarios y telefono de la agencia
  direccion: '',
  horarios: '',
  telefono: '',

  // Redes sociales. Vacio = el boton se muestra pero sin link (todavia no estan definidas las cuentas).
  // Para activarlas, completar la URL completa (https://...).
  redes: {
    instagram: '',
    facebook: '',
    youtube: '',
    x: '',
  },

  // Video de la seccion "Dominá tu movimiento". Vacio = se muestra un fondo.
  videoHomeUrl: env.VITE_VIDEO_HOME_URL || '',

  // Sitio oficial de la marca, solo como referencia en el aviso legal
  marca: 'Kia',
}

// Si la API no responde, la financiacion queda OCULTA (los precios todavia no estan definidos).
export const FINANCIACION_POR_DEFECTO = false
