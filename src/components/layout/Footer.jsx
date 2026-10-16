import { Link } from 'react-router-dom'
import { Minus, Plus } from 'lucide-react'
import Logo from '../comun/Logo'
import BotonVolverArriba from '../comun/BotonVolverArriba'
import EnlaceWhatsapp from '../comun/EnlaceWhatsapp'
import { useModelos } from '../../context/ModelosContext'
import { SITIO } from '../../config/sitio'

const REDES = [
  { clave: 'facebook', nombre: 'Facebook', icono: 'facebook' },
  { clave: 'youtube', nombre: 'YouTube', icono: 'youtube' },
  { clave: 'instagram', nombre: 'Instagram', icono: 'instagram' },
  { clave: 'x', nombre: 'X', icono: 'x' },
]

const POSVENTA = [
  { a: '/turnos', texto: 'Agendá tu cita' },
  { a: '/contacto', texto: 'Contactá a tu asesor' },
  { a: '/posventa', texto: 'Post Venta' },
  { a: '/garantia', texto: 'Garantía' },
]

const titulo = 'mb-4 text-sm font-bold text-white'
const enlace = 'text-sm text-white/50 transition hover:text-white'

/**
 * Pie como el de Kia: logo y redes a la izquierda, luego Modelos y Post Venta.
 * Se quitaron las columnas "Concesionarios" y "Nueva Kia" (pedido de la agencia).
 */
export default function Footer() {
  const { categorias } = useModelos()

  const listaModelos = categorias.map((c) => (
    <div key={c.nombre}>
      <p className="mb-2 text-sm font-bold text-white/50">{c.nombre}</p>
      <ul className="space-y-2">
        {c.modelos.map((m) => (
          <li key={m.slug}>
            <EnlaceWhatsapp modelo={m} seccion="footer-modelos" className={enlace} title={`Consultar por el ${m.nombre}`}>
              {m.nombre}
            </EnlaceWhatsapp>
          </li>
        ))}
      </ul>
    </div>
  ))

  const listaPosventa = (
    <ul className="space-y-3">
      {POSVENTA.map((p) => (
        <li key={p.a}>
          <Link to={p.a} className={enlace}>
            {p.texto}
          </Link>
        </li>
      ))}
    </ul>
  )

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-[1469px] gap-10 px-6 py-12 md:grid-cols-[2fr_1fr_1fr] md:px-20">
        <div className="space-y-6">
          <Logo claro className="h-9" />
          {/* Las redes se muestran siempre; sin URL cargada en config/sitio.js quedan sin link */}
          <ul className="-ml-3 flex gap-1.5" aria-label="Redes sociales">
            {REDES.map(({ clave, nombre, icono }) => {
              const url = SITIO.redes[clave]
              const imagen = <img src={`/assets/iconos/${icono}.svg`} alt="" className="h-16 w-16" />
              return (
                <li key={clave}>
                  {url ? (
                    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={nombre} className="block transition hover:opacity-80">
                      {imagen}
                    </a>
                  ) : (
                    <button type="button" aria-label={`${nombre} (próximamente)`} className="block cursor-default">
                      {imagen}
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        {/* Celular: acordeon como el de Kia. Escritorio: columnas. */}
        <div className="border-t border-white/30 md:hidden">
          <details className="group border-b border-white/30">
            <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-bold">
              Modelos
              <Plus aria-hidden="true" className="h-4 w-4 group-open:hidden" />
              <Minus aria-hidden="true" className="hidden h-4 w-4 group-open:block" />
            </summary>
            <div className="space-y-5 pb-5">{listaModelos}</div>
          </details>
          <details className="group border-b border-white/30">
            <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-bold">
              Post Venta
              <Plus aria-hidden="true" className="h-4 w-4 group-open:hidden" />
              <Minus aria-hidden="true" className="hidden h-4 w-4 group-open:block" />
            </summary>
            <div className="pb-5">{listaPosventa}</div>
          </details>
        </div>

        <nav aria-label="Modelos" className="hidden md:block">
          <p className={titulo}>Modelos</p>
          <div className="space-y-5">{listaModelos}</div>
        </nav>

        <nav aria-label="Post Venta" className="hidden md:block">
          <p className={titulo}>Post Venta</p>
          {listaPosventa}
        </nav>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-[1469px] flex-col items-start justify-between gap-4 px-6 pb-24 pt-6 text-sm text-white/80 sm:flex-row sm:items-center sm:pb-6 sm:pr-56 md:px-20 md:pr-64">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link to="/" className="hover:underline">Home</Link>
            <p>© Todos los derechos reservados – {SITIO.nombre}</p>
          </div>
          <BotonVolverArriba />
        </div>
      </div>
    </footer>
  )
}
