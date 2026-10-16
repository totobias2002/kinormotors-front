import { Link } from 'react-router-dom'
import { registrarClick } from '../../services/tracking'

/** Tarjetas de la derecha. Se quitaron "Concesionarios" (pedido de la agencia): quedan Turno Online, Post Venta y Garantía. */
const TARJETAS = [
  { a: '/turnos', texto: 'Turno Online', icono: 'turno', fondo: 'bg-[#37434c]', ancho: 'col-span-2', tipo: 'TURNO', seccion: 'split-turnos' },
  { a: '/posventa', texto: 'Post Venta', icono: 'postventa', fondo: 'bg-[#aab3b9]', seccion: 'split-posventa' },
  { a: '/garantia', texto: 'Garantía', icono: 'garantia', fondo: 'bg-[#848c94]', seccion: 'split-garantia' },
]

/** Pantalla dividida: promociones a la izquierda, accesos rapidos a la derecha (en celular van uno debajo del otro). */
export default function PantallaDividida() {
  return (
    <section aria-label="Promociones y servicios" className="grid md:h-[695px] md:grid-cols-2">
      <Link
        to="/promociones"
        onClick={() => registrarClick({ tipoAccion: 'PROMOCION', seccion: 'split-promociones' })}
        className="group relative flex h-[420px] items-end overflow-hidden md:h-full"
      >
        <img src="/assets/modelos/promociones.webp" alt="SUV Kia en camino rural" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" aria-hidden="true" />
        <div className="relative z-10 p-6 text-white md:p-12">
          <h2 className="text-3xl font-bold md:text-4xl">Promociones</h2>
          <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold">
            <span aria-hidden="true" className="text-xl leading-none">+</span>
            <span className="group-hover:underline">Saber más</span>
          </span>
        </div>
      </Link>

      <div className="grid grid-cols-2 md:grid-rows-2">
        {TARJETAS.map((t) => (
          <Link
            key={t.a}
            to={t.a}
            onClick={() => t.tipo && registrarClick({ tipoAccion: t.tipo, seccion: t.seccion })}
            className={`${t.ancho ?? ''} ${t.fondo} flex flex-col items-center justify-center gap-3 text-white transition hover:brightness-110 md:min-h-[170px] ${t.ancho ? 'h-[195px]' : 'aspect-square md:aspect-auto'}`}
          >
            <img src={`/assets/iconos/${t.icono}.svg`} alt="" className="h-12 w-12" />
            <span className="text-lg font-bold">{t.texto}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
