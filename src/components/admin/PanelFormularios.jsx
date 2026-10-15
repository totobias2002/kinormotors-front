import { useCallback, useEffect, useState } from 'react'
import api from '../../services/api'

const ESTADOS = ['PENDIENTE', 'CONFIRMADO', 'CANCELADO', 'ATENDIDO']
const fecha = (iso) => new Date(iso).toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' })

/** Solicitudes de contacto y turnos de posventa recibidos desde la web. */
export default function PanelFormularios({ tipo }) {
  const esTurnos = tipo === 'turnos'
  const [filas, setFilas] = useState([])
  const [error, setError] = useState('')

  const cargar = useCallback(async () => {
    try {
      const { data } = await api.get(`/admin/${esTurnos ? 'turnos' : 'contactos'}`, { params: { tamano: 100 } })
      setFilas(data.content)
    } catch {
      setError('No se pudo cargar la lista')
    }
  }, [esTurnos])

  useEffect(() => {
    cargar()
  }, [cargar])

  const cambiarEstado = async (id, estado) => {
    try {
      await api.patch(`/admin/turnos/${id}/estado`, { estado })
      setFilas((fs) => fs.map((f) => (f.id === id ? { ...f, estado } : f)))
    } catch {
      setError('No se pudo cambiar el estado')
    }
  }

  return (
    <div className="space-y-3">
      {error && <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      <div className="overflow-x-auto rounded-lg bg-white">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600">
            <tr>
              {(esTurnos
                ? ['Recibido', 'Cliente', 'Contacto', 'Vehículo', 'Servicio', 'Fecha deseada', 'Estado']
                : ['Recibido', 'Cliente', 'Contacto', 'Modelo', 'Mensaje']
              ).map((h) => (
                <th key={h} className="px-3 py-2">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filas.map((f) => (
              <tr key={f.id} className="border-t border-slate-100 align-top">
                <td className="whitespace-nowrap px-3 py-2">{fecha(f.creadoEn)}</td>
                <td className="px-3 py-2 font-semibold">{f.nombre}</td>
                <td className="px-3 py-2">{[f.telefono, f.email].filter(Boolean).join(' · ')}</td>
                {esTurnos ? (
                  <>
                    <td className="px-3 py-2">{f.vehiculo}{f.patente ? ` (${f.patente})` : ''}</td>
                    <td className="px-3 py-2">{f.servicio}</td>
                    <td className="whitespace-nowrap px-3 py-2">{f.fechaDeseada}{f.franja ? ` · ${f.franja}` : ''}</td>
                    <td className="px-3 py-2">
                      <select aria-label={`Estado del turno de ${f.nombre}`} value={f.estado} onChange={(e) => cambiarEstado(f.id, e.target.value)} className="rounded border px-2 py-1">
                        {ESTADOS.map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-3 py-2">{f.modeloSlug || '—'}</td>
                    <td className="max-w-md px-3 py-2">{f.mensaje}</td>
                  </>
                )}
              </tr>
            ))}
            {!filas.length && <tr><td colSpan={7} className="px-3 py-8 text-center text-slate-500">Todavía no hay registros</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
