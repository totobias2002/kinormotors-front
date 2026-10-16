import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useModelos } from '../../context/ModelosContext'
import EnlaceWhatsapp from '../comun/EnlaceWhatsapp'

// Mismo orden que el menu de Kia
const ORDEN = ['k3-cross', 'k3-sedan', 'k4-hatchback', 'k4-sedan', 'seltos', 'sportage', 'sorento', 'carnival', 'tasman', 'k2500']
const NUEVOS = ['k4-hatchback', 'sorento']
const FILTROS = ['Todos los vehículos', 'Pick-ups', 'Autos', 'SUV', 'Utilitarios']

const posicion = (slug) => {
  const i = ORDEN.indexOf(slug)
  return i === -1 ? ORDEN.length : i
}

/** Panel desplegable "Modelos": filtro por categoria y grilla con "Consultar precios" (abre WhatsApp). */
export default function MenuModelos({ onCerrar, enLinea = false }) {
  const { modelos } = useModelos()
  const [filtro, setFiltro] = useState(FILTROS[0])

  const visibles = modelos
    .filter((m) => filtro === FILTROS[0] || m.categoria === filtro)
    .sort((a, b) => posicion(a.slug) - posicion(b.slug))

  return (
    <div className={enLinea ? 'bg-white text-navy' : 'absolute inset-x-0 top-full max-h-[calc(100svh-5rem)] overflow-y-auto bg-white text-navy shadow-2xl'}>
      <div className="bg-gris">
        <fieldset className={enLinea ? 'grid grid-cols-2' : 'flex gap-x-6 gap-y-2 overflow-x-auto px-4 py-4 md:px-20'}>
          <legend className="sr-only">Filtrar modelos</legend>
          {FILTROS.map((f) => (
            <label key={f} className={`flex cursor-pointer items-center gap-2 text-sm ${enLinea ? 'border-b border-r border-slate-200 px-4 py-3 even:border-r-0' : 'shrink-0'}`}>
              <input type="radio" name={enLinea ? 'filtro-modelos-movil' : 'filtro-modelos'} checked={filtro === f} onChange={() => setFiltro(f)} className="peer sr-only" />
              {!enLinea && (
                <span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-400 bg-white peer-checked:border-navy peer-checked:before:h-3 peer-checked:before:w-3 peer-checked:before:rounded-full peer-checked:before:bg-navy peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-kia-red" />
              )}
              <span className={enLinea ? 'text-slate-500 peer-checked:font-bold peer-checked:text-slate-700' : 'peer-checked:font-bold'}>{f}</span>
            </label>
          ))}
        </fieldset>
      </div>

      <ul className={enLinea ? 'grid grid-cols-1 gap-y-6 px-4 py-6' : 'grid grid-cols-2 gap-x-4 gap-y-8 px-4 py-8 md:grid-cols-4 md:px-20'}>
        {visibles.map((m) => (
          <li key={m.slug} className="relative flex flex-col items-center text-center">
            {NUEVOS.includes(m.slug) && <img src="/assets/iconos/nuevo.svg" alt="Nuevo" className="absolute left-0 top-0 h-5 w-auto md:left-6" />}
            {m.imagenUrl && <img src={m.imagenUrl} alt={`Kia ${m.nombre}`} loading="lazy" className="h-auto w-full max-w-[300px] pt-4" />}
            <p className="mt-3 text-lg font-bold md:text-xl">{m.nombre}</p>
            <EnlaceWhatsapp
              modelo={m}
              seccion="menu-modelos"
              onClick={onCerrar}
              className="mt-4 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-navy py-1 pl-3 pr-1 text-xs font-semibold transition hover:bg-navy hover:text-white sm:gap-3 sm:pl-4 sm:text-sm md:text-base"
            >
              Consultar precios
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy text-white">
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </span>
            </EnlaceWhatsapp>
          </li>
        ))}
      </ul>
    </div>
  )
}
