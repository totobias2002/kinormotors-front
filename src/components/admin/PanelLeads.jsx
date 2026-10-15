import { useCallback, useEffect, useState } from 'react'
import { Download } from 'lucide-react'
import api from '../../services/api'
import { estiloInput } from '../comun/Campo'

const TIPOS = ['WHATSAPP', 'CONTACTO', 'TURNO', 'PROMOCION', 'LLAMADA']
const FILTROS_VACIOS = { desde: '', hasta: '', modelo: '', tipo: '', origen: '' }

const limpiar = (f) => Object.fromEntries(Object.entries(f).filter(([, v]) => v))
const fecha = (iso) => new Date(iso).toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' })

function Resumen({ titulo, filas }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <h3 className="mb-2 text-xs font-extrabold uppercase tracking-widest text-slate-500">{titulo}</h3>
      {filas?.length ? (
        <ul className="space-y-1 text-sm">
          {filas.slice(0, 6).map((f) => (
            <li key={f.clave} className="flex justify-between gap-2">
              <span className="truncate">{f.clave}</span>
              <strong>{f.cantidad}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-500">Sin datos</p>
      )}
    </div>
  )
}

/** Leads con filtros por fecha/modelo/tipo/origen, tablero de conteos y exportacion a CSV. */
export default function PanelLeads({ modelos }) {
  const [filtros, setFiltros] = useState(FILTROS_VACIOS)
  const [pagina, setPagina] = useState(0)
  const [datos, setDatos] = useState({ content: [], totalPages: 0, totalElements: 0 })
  const [resumen, setResumen] = useState(null)
  const [error, setError] = useState('')

  const cargar = useCallback(async () => {
    setError('')
    try {
      const params = limpiar(filtros)
      const [lista, res] = await Promise.all([
        api.get('/admin/leads', { params: { ...params, pagina, tamano: 25 } }),
        api.get('/admin/leads/resumen', { params: { desde: params.desde, hasta: params.hasta } }),
      ])
      setDatos(lista.data)
      setResumen(res.data)
    } catch {
      setError('No se pudieron cargar los leads')
    }
  }, [filtros, pagina])

  useEffect(() => {
    cargar()
  }, [cargar])

  const cambiar = (e) => {
    setPagina(0)
    setFiltros((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const exportar = async () => {
    try {
      const { data } = await api.get('/admin/leads/export.csv', { params: limpiar(filtros), responseType: 'blob' })
      const url = URL.createObjectURL(data)
      const a = document.createElement('a')
      a.href = url
      a.download = 'leads-kinor-motors.csv'
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      setError('No se pudo exportar el CSV')
    }
  }

  return (
    <div className="space-y-6">
      {resumen && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Resumen titulo={`Por tipo (total ${resumen.total})`} filas={resumen.porTipo} />
          <Resumen titulo="Por modelo" filas={resumen.porModelo} />
          <Resumen titulo="Por origen" filas={resumen.porOrigen} />
          <Resumen titulo="Por sección" filas={resumen.porSeccion} />
        </div>
      )}
      <p className="text-xs text-slate-500">Los conteos del tablero usan el rango de fechas elegido (por defecto, últimos 30 días).</p>

      <div className="flex flex-wrap items-end gap-3 rounded-lg bg-white p-4">
        <label className="text-sm font-semibold">
          Desde
          <input type="date" name="desde" value={filtros.desde} onChange={cambiar} className={`${estiloInput} mt-1`} />
        </label>
        <label className="text-sm font-semibold">
          Hasta
          <input type="date" name="hasta" value={filtros.hasta} onChange={cambiar} className={`${estiloInput} mt-1`} />
        </label>
        <label className="text-sm font-semibold">
          Modelo
          <select name="modelo" value={filtros.modelo} onChange={cambiar} className={`${estiloInput} mt-1`}>
            <option value="">Todos</option>
            {modelos.map((m) => (
              <option key={m.slug} value={m.slug}>
                {m.nombre}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold">
          Tipo
          <select name="tipo" value={filtros.tipo} onChange={cambiar} className={`${estiloInput} mt-1`}>
            <option value="">Todos</option>
            {TIPOS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold">
          Origen (utm_source)
          <input name="origen" value={filtros.origen} onChange={cambiar} placeholder="instagram, directo…" className={`${estiloInput} mt-1`} />
        </label>
        <button type="button" onClick={exportar} className="ml-auto inline-flex items-center gap-2 rounded-md bg-navy px-4 py-2.5 text-sm font-bold text-white">
          <Download aria-hidden="true" className="h-4 w-4" />
          Exportar CSV
        </button>
      </div>

      {error && <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-800">{error}</p>}

      <div className="overflow-x-auto rounded-lg bg-white">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600">
            <tr>
              {['Fecha', 'Tipo', 'Modelo', 'Sección', 'Origen', 'Campaña', 'Contacto', 'Mensaje'].map((h) => (
                <th key={h} className="px-3 py-2">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datos.content.map((l) => (
              <tr key={l.id} className="border-t border-slate-100 align-top">
                <td className="whitespace-nowrap px-3 py-2">{fecha(l.creadoEn)}</td>
                <td className="px-3 py-2 font-semibold">{l.tipoAccion}</td>
                <td className="px-3 py-2">{l.modeloSlug || '—'}</td>
                <td className="px-3 py-2">{l.seccion || '—'}</td>
                <td className="px-3 py-2">{l.utmSource || (l.referrer ? new URL(l.referrer, 'http://x').host : 'directo')}</td>
                <td className="px-3 py-2">{l.utmCampaign || '—'}</td>
                <td className="px-3 py-2">{[l.nombre, l.telefono, l.email].filter(Boolean).join(' · ') || '—'}</td>
                <td className="max-w-xs truncate px-3 py-2" title={l.mensaje}>{l.mensaje || '—'}</td>
              </tr>
            ))}
            {!datos.content.length && (
              <tr><td colSpan={8} className="px-3 py-8 text-center text-slate-500">No hay leads con estos filtros</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span>{datos.totalElements} resultados</span>
        <div className="flex gap-2">
          <button type="button" disabled={pagina === 0} onClick={() => setPagina((p) => p - 1)} className="rounded border px-3 py-1.5 disabled:opacity-40">Anterior</button>
          <button type="button" disabled={pagina + 1 >= datos.totalPages} onClick={() => setPagina((p) => p + 1)} className="rounded border px-3 py-1.5 disabled:opacity-40">Siguiente</button>
        </div>
      </div>
    </div>
  )
}
