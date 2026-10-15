import { Link } from 'react-router-dom'
import { registrarClick } from '../../services/tracking'

/** Franja superior: "Promociones" a la izquierda y "Contáctenos" a la derecha, como botones bien visibles. */
export default function TopBar() {
  return (
    <div className="relative z-30 flex items-center justify-between gap-2 bg-navy px-3 py-2 sm:px-8">
      <Link
        to="/promociones"
        onClick={() => registrarClick({ tipoAccion: 'PROMOCION', seccion: 'barra-superior' })}
        className="rounded-md bg-kia-red px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-white shadow transition hover:bg-kia-red-dark sm:px-7 sm:py-2.5 sm:text-sm"
      >
        Promociones
      </Link>
      <Link
        to="/contacto"
        onClick={() => registrarClick({ tipoAccion: 'CONTACTO', seccion: 'barra-superior' })}
        className="rounded-md bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-navy shadow transition hover:bg-slate-200 sm:px-7 sm:py-2.5 sm:text-sm"
      >
        Contáctenos
      </Link>
    </div>
  )
}
