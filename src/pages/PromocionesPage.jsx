import { useEffect, useState } from 'react'
import api, { hayApi } from '../services/api'
import PaginaInterna from '../components/comun/PaginaInterna'
import EnlaceWhatsapp from '../components/comun/EnlaceWhatsapp'
import { useModelos } from '../context/ModelosContext'

export default function PromocionesPage() {
  const { modelos } = useModelos()
  const [promos, setPromos] = useState([])
  const [cargando, setCargando] = useState(hayApi)

  useEffect(() => {
    if (!hayApi) return
    api
      .get('/promociones')
      .then((r) => setPromos(r.data))
      .catch(() => {})
      .finally(() => setCargando(false))
  }, [])

  return (
    <PaginaInterna titulo="Promociones" bajada="Consultá las promociones vigentes con un asesor de Kinor Motors.">
      {cargando && <p>Cargando…</p>}
      {!cargando && promos.length === 0 && (
        <p className="rounded-md bg-slate-100 p-5">
          Por el momento no hay promociones publicadas. Escribinos y te contamos las condiciones vigentes.
        </p>
      )}
      <ul className="space-y-4">
        {promos.map((p) => {
          const modelo = modelos.find((m) => m.slug === p.modeloSlug)
          return (
            <li key={p.id} className="rounded-xl border border-slate-200 p-5">
              <h2 className="text-xl font-black">{p.titulo}</h2>
              {p.descripcion && <p className="mt-2 text-slate-700">{p.descripcion}</p>}
              <EnlaceWhatsapp modelo={modelo} seccion="promociones" className="mt-4 inline-block rounded-md bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#1ebe5b]">
                Consultar por WhatsApp
              </EnlaceWhatsapp>
            </li>
          )
        })}
      </ul>
      {!promos.length && !cargando && (
        <EnlaceWhatsapp seccion="promociones" className="mt-6 inline-block rounded-md bg-[#25D366] px-6 py-3 font-bold text-white hover:bg-[#1ebe5b]">
          Hablá con nosotros
        </EnlaceWhatsapp>
      )}
    </PaginaInterna>
  )
}
