import { API_URL, hayApi } from './api'

const CLAVE_SESION = 'km_sid'
const CLAVE_ORIGEN = 'km_origen'

function leer(clave) {
  try {
    return sessionStorage.getItem(clave)
  } catch {
    return null
  }
}

function guardar(clave, valor) {
  try {
    sessionStorage.setItem(clave, valor)
  } catch {
    /* sin storage: el origen se recalcula en cada click */
  }
}

function idSesion() {
  let id = leer(CLAVE_SESION)
  if (!id) {
    id = globalThis.crypto?.randomUUID?.() ?? `s-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
    guardar(CLAVE_SESION, id)
  }
  return id
}

const recortar = (v, max) => (v ? String(v).slice(0, max) : undefined)

/**
 * Guarda de donde llego el visitante la primera vez en la sesion (UTM y referrer externo).
 * Se llama una vez al cargar la app.
 */
export function capturarOrigen() {
  if (leer(CLAVE_ORIGEN)) return
  const params = new URLSearchParams(window.location.search)
  const origen = {}
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
    const v = params.get(k)
    if (v) origen[k] = recortar(v, 120)
  }
  try {
    const ref = document.referrer ? new URL(document.referrer) : null
    if (ref && ref.host !== window.location.host) origen.referrer = recortar(document.referrer, 500)
  } catch {
    /* referrer invalido: se ignora */
  }
  guardar(CLAVE_ORIGEN, JSON.stringify(origen))
}

/** Datos de trazabilidad que acompanian a cualquier envio (click o formulario). */
export function contextoDeVisita(seccion) {
  let origen = {}
  try {
    origen = JSON.parse(leer(CLAVE_ORIGEN) || '{}')
  } catch {
    origen = {}
  }
  return {
    seccion: recortar(seccion, 80),
    pagina: recortar(window.location.pathname, 300),
    referrer: origen.referrer,
    utmSource: origen.utm_source,
    utmMedium: origen.utm_medium,
    utmCampaign: origen.utm_campaign,
    utmContent: origen.utm_content,
    utmTerm: origen.utm_term,
    sessionId: idSesion(),
  }
}

/**
 * Registra un click comercial. `keepalive` hace que el pedido termine aunque la pestana cambie
 * (por ejemplo, al abrir WhatsApp). Si falla, no molesta al visitante.
 */
export function registrarClick({ tipoAccion, modeloSlug, seccion }) {
  if (!hayApi) return
  try {
    fetch(`${API_URL}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({ tipoAccion, modeloSlug: modeloSlug || undefined, ...contextoDeVisita(seccion) }),
    }).catch(() => {})
  } catch {
    /* el registro nunca debe romper la navegacion */
  }
}
