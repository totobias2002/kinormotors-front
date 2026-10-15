import { useEffect, useState } from 'react'
import api from '../../services/api'

/**
 * Interruptores de financiacion: el general y el de cada modelo. Para que se publique un texto de
 * financiacion tienen que estar prendidos los dos.
 */
export default function PanelModelos({ modelos, onCambio }) {
  const [global, setGlobal] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/config').then((r) => setGlobal(r.data.mostrarFinanciacion)).catch(() => setError('No se pudo leer la configuración'))
  }, [])

  const alternarGlobal = async () => {
    try {
      const { data } = await api.put('/admin/config', { mostrarFinanciacion: !global })
      setGlobal(data.mostrarFinanciacion)
    } catch {
      setError('No se pudo guardar el cambio')
    }
  }

  const alternarModelo = async (m) => {
    try {
      const { id, ...resto } = m
      await api.put(`/admin/modelos/${id}`, { ...resto, mostrarFinanciacion: !m.mostrarFinanciacion })
      onCambio()
    } catch {
      setError('No se pudo guardar el cambio')
    }
  }

  return (
    <div className="space-y-6">
      {error && <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      <div className="flex items-center justify-between rounded-lg bg-white p-4">
        <div>
          <h2 className="font-black">Mostrar financiación en el sitio</h2>
          <p className="text-sm text-slate-600">Interruptor general. Apagado, no se publica ningún texto de financiación.</p>
        </div>
        <button type="button" role="switch" aria-checked={global} onClick={alternarGlobal} className={`rounded-full px-5 py-2 text-sm font-bold ${global ? 'bg-green-600 text-white' : 'bg-slate-300'}`}>
          {global ? 'Visible' : 'Oculta'}
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600">
            <tr><th className="px-3 py-2">Modelo</th><th className="px-3 py-2">Texto de financiación</th><th className="px-3 py-2">Mostrar</th></tr>
          </thead>
          <tbody>
            {modelos.map((m) => (
              <tr key={m.id} className="border-t border-slate-100">
                <td className="px-3 py-2 font-semibold">{m.nombre}</td>
                <td className="px-3 py-2">{m.textoFinanciacion || '—'}</td>
                <td className="px-3 py-2">
                  <button type="button" role="switch" aria-checked={m.mostrarFinanciacion} aria-label={`Financiación de ${m.nombre}`} onClick={() => alternarModelo(m)} className={`rounded-full px-4 py-1.5 text-xs font-bold ${m.mostrarFinanciacion ? 'bg-green-600 text-white' : 'bg-slate-300'}`}>
                    {m.mostrarFinanciacion ? 'Sí' : 'No'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
