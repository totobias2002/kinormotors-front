/**
 * Convierte un error de axios en mensajes para mostrar.
 * El back responde {"error": "..."} o, en validaciones, {"campo": "mensaje"}.
 */
export function leerErrores(err) {
  const data = err?.response?.data
  if (!err?.response) return { general: 'No pudimos conectarnos. Probá de nuevo en unos minutos o escribinos por WhatsApp.' }
  if (err.response.status === 429) return { general: data?.error || 'Demasiados intentos. Probá más tarde.' }
  if (data && typeof data === 'object' && data.error) return { general: data.error }
  if (data && typeof data === 'object') return { campos: data }
  return { general: 'Ocurrió un error inesperado. Probá de nuevo.' }
}
