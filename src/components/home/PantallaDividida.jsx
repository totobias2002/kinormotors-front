import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { registrarClick } from '../../services/tracking'

const ACCESOS = [
  { a: '/turnos', texto: 'Turnos online', seccion: 'split-turnos', tipo: 'TURNO' },
  { a: '/posventa', texto: 'Posventa', seccion: 'split-posventa' },
  { a: '/garantia', texto: 'Garantía', seccion: 'split-garantia' },
]

/** Pantalla dividida: promociones a la izquierda, accesos rapidos a la derecha. */
export default function PantallaDividida() {
  return (
    <section aria-label="Promociones y servicios" className="grid md:grid-cols-2">
      <Link
        to="/promociones"
        onClick={() => registrarClick({ tipoAccion: 'PROMOCION', seccion: 'split-promociones' })}
        className="group relative flex min-h-[420px] items-end overflow-hidden bg-gradient-to-br from-slate-700 via-slate-600 to-slate-500 p-8 text-white md:min-h-[560px]"
      >
        {/* TODO: reemplazar el fondo por la imagen del vehiculo con promociones */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" aria-hidden="true" />
        <div className="relative z-10">
          <h2 className="text-4xl font-black sm:text-5xl">Promociones</h2>
          <span className="mt-5 inline-flex translate-y-2 items-center gap-2 rounded-md bg-kia-red px-6 py-3 text-sm font-extrabold uppercase tracking-wide opacity-100 shadow-lg transition group-hover:translate-y-0 group-hover:bg-kia-red-dark md:opacity-90 md:group-hover:opacity-100">
            Saber más
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </span>
        </div>
      </Link>

      <div className="flex flex-col bg-gris">
        {ACCESOS.map((item) => (
          <Link
            key={item.a}
            to={item.a}
            onClick={() => item.tipo && registrarClick({ tipoAccion: item.tipo, seccion: item.seccion })}
            className="group flex flex-1 items-center justify-between border-b border-slate-300 px-8 py-10 text-2xl font-black transition last:border-b-0 hover:bg-navy hover:text-white sm:text-3xl md:py-0"
          >
            {item.texto}
            <ArrowRight aria-hidden="true" className="h-6 w-6 transition group-hover:translate-x-2" />
          </Link>
        ))}
      </div>
    </section>
  )
}
