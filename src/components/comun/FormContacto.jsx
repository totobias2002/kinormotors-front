import { useState } from 'react'
import api, { hayApi } from '../../services/api'
import { contextoDeVisita } from '../../services/tracking'
import { useModelos } from '../../context/ModelosContext'
import { leerErrores } from '../../utils/errores'
import Campo, { estiloInput } from './Campo'
import EnlaceWhatsapp from './EnlaceWhatsapp'

const VACIO = { nombre: '', telefono: '', email: '', modeloSlug: '', mensaje: '' }

/** Formulario "Contáctenos": se guarda en el back junto con el origen de la visita. */
export default function FormContacto() {
  const { modelos } = useModelos()
  const [datos, setDatos] = useState(VACIO)
  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [listo, setListo] = useState(false)

  const cambiar = (e) => setDatos((d) => ({ ...d, [e.target.name]: e.target.value }))

  const enviar = async (e) => {
    e.preventDefault()
    setErrores({})
    if (!datos.telefono.trim() && !datos.email.trim()) {
      setErrores({ campos: { telefono: 'Dejanos un teléfono o un email para poder responderte' } })
      return
    }
    setEnviando(true)
    try {
      await api.post('/contacto', {
        ...datos,
        telefono: datos.telefono.trim() || undefined,
        email: datos.email.trim() || undefined,
        modeloSlug: datos.modeloSlug || undefined,
        ...contextoDeVisita('formulario-contacto'),
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
        El formulario todavía no está disponible. Escribinos por{' '}
        <EnlaceWhatsapp seccion="contacto" className="font-bold underline">
          WhatsApp
        </EnlaceWhatsapp>
        .
      </p>
    )
  }

  if (listo) {
    return (
      <div role="status" className="rounded-md bg-green-50 p-5 text-green-900">
        <p className="text-lg font-bold">¡Gracias! Recibimos tu consulta.</p>
        <p>Un asesor de Kinor Motors se va a comunicar con vos.</p>
        <button type="button" onClick={() => setListo(false)} className="mt-3 text-sm font-semibold underline">
          Enviar otra consulta
        </button>
      </div>
    )
  }

  const c = errores.campos || {}
  return (
    <form onSubmit={enviar} noValidate className="space-y-4">
      <Campo id="nombre" etiqueta="Nombre y apellido" error={c.nombre}>
        <input id="nombre" name="nombre" value={datos.nombre} onChange={cambiar} required maxLength={120} autoComplete="name" className={estiloInput} />
      </Campo>
      <div className="grid gap-4 sm:grid-cols-2">
        <Campo id="telefono" etiqueta="Teléfono" error={c.telefono}>
          <input id="telefono" name="telefono" type="tel" value={datos.telefono} onChange={cambiar} maxLength={40} autoComplete="tel" className={estiloInput} />
        </Campo>
        <Campo id="email" etiqueta="Email" error={c.email}>
          <input id="email" name="email" type="email" value={datos.email} onChange={cambiar} maxLength={160} autoComplete="email" className={estiloInput} />
        </Campo>
      </div>
      <Campo id="modeloSlug" etiqueta="Modelo de interés (opcional)">
        <select id="modeloSlug" name="modeloSlug" value={datos.modeloSlug} onChange={cambiar} className={estiloInput}>
          <option value="">Todavía no lo sé</option>
          {modelos.map((m) => (
            <option key={m.slug} value={m.slug}>
              {m.nombre}
            </option>
          ))}
        </select>
      </Campo>
      <Campo id="mensaje" etiqueta="Mensaje" error={c.mensaje}>
        <textarea id="mensaje" name="mensaje" rows={4} value={datos.mensaje} onChange={cambiar} required maxLength={1000} className={estiloInput} />
      </Campo>
      {errores.general && (
        <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-800">
          {errores.general}
        </p>
      )}
      <button type="submit" disabled={enviando} className="rounded-md bg-kia-red px-8 py-3 font-extrabold uppercase tracking-wide text-white transition hover:bg-kia-red-dark disabled:opacity-60">
        {enviando ? 'Enviando…' : 'Enviar consulta'}
      </button>
    </form>
  )
}
