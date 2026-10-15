import { useState } from 'react'
import api, { hayApi } from '../../services/api'
import { contextoDeVisita } from '../../services/tracking'
import { leerErrores } from '../../utils/errores'
import Campo, { estiloInput } from './Campo'
import EnlaceWhatsapp from './EnlaceWhatsapp'

const VACIO = { nombre: '', telefono: '', email: '', vehiculo: '', patente: '', servicio: '', fechaDeseada: '', franja: '', comentarios: '' }

// TODO: confirmar con posventa la lista real de servicios
const SERVICIOS = ['Service de mantenimiento', 'Revisión general', 'Frenos', 'Neumáticos', 'Garantía', 'Otro']

const hoy = () => new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10)

/** Turno online de posventa. */
export default function FormTurno() {
  const [datos, setDatos] = useState(VACIO)
  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [listo, setListo] = useState(false)

  const cambiar = (e) => setDatos((d) => ({ ...d, [e.target.name]: e.target.value }))

  const enviar = async (e) => {
    e.preventDefault()
    setErrores({})
    setEnviando(true)
    try {
      await api.post('/turnos', {
        ...datos,
        email: datos.email.trim() || undefined,
        patente: datos.patente.trim() || undefined,
        franja: datos.franja || undefined,
        comentarios: datos.comentarios.trim() || undefined,
        ...contextoDeVisita('formulario-turno'),
      })
      setListo(true)
      setDatos(VACIO)
    } catch (err) {
      setErrores(leerErrores(err))
    } finally {
      setEnviando(false)
    }
  }

  if (!hayApi) {
    return (
      <p className="rounded-md bg-slate-100 p-4">
        El turno online todavía no está disponible. Pedí tu turno por{' '}
        <EnlaceWhatsapp seccion="turnos" className="font-bold underline">
          WhatsApp
        </EnlaceWhatsapp>
        .
      </p>
    )
  }

  if (listo) {
    return (
      <div role="status" className="rounded-md bg-green-50 p-5 text-green-900">
        <p className="text-lg font-bold">¡Listo! Recibimos tu pedido de turno.</p>
        <p>Te vamos a contactar para confirmarlo.</p>
        <button type="button" onClick={() => setListo(false)} className="mt-3 text-sm font-semibold underline">
          Pedir otro turno
        </button>
      </div>
    )
  }

  const c = errores.campos || {}
  return (
    <form onSubmit={enviar} className="space-y-4">
      <Campo id="nombre" etiqueta="Nombre y apellido" error={c.nombre}>
        <input id="nombre" name="nombre" value={datos.nombre} onChange={cambiar} required maxLength={120} autoComplete="name" className={estiloInput} />
      </Campo>
      <div className="grid gap-4 sm:grid-cols-2">
        <Campo id="telefono" etiqueta="Teléfono" error={c.telefono}>
          <input id="telefono" name="telefono" type="tel" value={datos.telefono} onChange={cambiar} required maxLength={40} autoComplete="tel" className={estiloInput} />
        </Campo>
        <Campo id="email" etiqueta="Email (opcional)" error={c.email}>
          <input id="email" name="email" type="email" value={datos.email} onChange={cambiar} maxLength={160} autoComplete="email" className={estiloInput} />
        </Campo>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Campo id="vehiculo" etiqueta="Vehículo (modelo y año)" error={c.vehiculo}>
          <input id="vehiculo" name="vehiculo" value={datos.vehiculo} onChange={cambiar} required maxLength={160} placeholder="Ej: Kia Seltos 2024" className={estiloInput} />
        </Campo>
        <Campo id="patente" etiqueta="Patente (opcional)" error={c.patente}>
          <input id="patente" name="patente" value={datos.patente} onChange={cambiar} maxLength={12} className={`${estiloInput} uppercase`} />
        </Campo>
      </div>
      <Campo id="servicio" etiqueta="Servicio" error={c.servicio}>
        <select id="servicio" name="servicio" value={datos.servicio} onChange={cambiar} required className={estiloInput}>
          <option value="">Elegí un servicio</option>
          {SERVICIOS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </Campo>
      <div className="grid gap-4 sm:grid-cols-2">
        <Campo id="fechaDeseada" etiqueta="Fecha deseada" error={c.fechaDeseada}>
          <input id="fechaDeseada" name="fechaDeseada" type="date" min={hoy()} value={datos.fechaDeseada} onChange={cambiar} required className={estiloInput} />
        </Campo>
        <Campo id="franja" etiqueta="Franja horaria" error={c.franja}>
          <select id="franja" name="franja" value={datos.franja} onChange={cambiar} className={estiloInput}>
            <option value="">Indistinto</option>
            <option value="MANANA">Mañana</option>
            <option value="TARDE">Tarde</option>
          </select>
        </Campo>
      </div>
      <Campo id="comentarios" etiqueta="Comentarios (opcional)" error={c.comentarios}>
        <textarea id="comentarios" name="comentarios" rows={3} value={datos.comentarios} onChange={cambiar} maxLength={1000} className={estiloInput} />
      </Campo>
      {errores.general && (
        <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-800">
          {errores.general}
        </p>
      )}
      <button type="submit" disabled={enviando} className="rounded-md bg-kia-red px-8 py-3 font-extrabold uppercase tracking-wide text-white transition hover:bg-kia-red-dark disabled:opacity-60">
        {enviando ? 'Enviando…' : 'Pedir turno'}
      </button>
    </form>
  )
}
