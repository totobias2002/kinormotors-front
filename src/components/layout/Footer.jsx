import { Facebook, Instagram, Music2, Youtube } from 'lucide-react'
import Logo from '../comun/Logo'
import BotonVolverArriba from '../comun/BotonVolverArriba'
import { Link } from 'react-router-dom'
import { useModelos } from '../../context/ModelosContext'
import { SITIO } from '../../config/sitio'

const REDES = [
  { clave: 'instagram', nombre: 'Instagram', Icono: Instagram },
  { clave: 'facebook', nombre: 'Facebook', Icono: Facebook },
  { clave: 'youtube', nombre: 'YouTube', Icono: Youtube },
  { clave: 'tiktok', nombre: 'TikTok', Icono: Music2 },
]

const estiloRed =
  'flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white transition'

export default function Footer() {
  const { modelos } = useModelos()

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-12 sm:px-8 md:grid-cols-2">
        <div className="space-y-6">
          <Logo claro className="h-8" />
          {/* Las redes se muestran siempre; sin URL cargada en config/sitio.js quedan sin link */}
          <ul className="flex gap-3" aria-label="Redes sociales">
            {REDES.map(({ clave, nombre, Icono }) => {
              const url = SITIO.redes[clave]
              return (
                <li key={clave}>
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={nombre}
                      className={`${estiloRed} hover:bg-white hover:text-navy`}
                    >
                      <Icono aria-hidden="true" className="h-5 w-5" />
                    </a>
                  ) : (
                    <button type="button" aria-label={`${nombre} (próximamente)`} className={`${estiloRed} cursor-default opacity-80`}>
                      <Icono aria-hidden="true" className="h-5 w-5" />
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        <nav aria-label="Modelos">
          <p className="mb-4 text-xs font-extrabold uppercase tracking-widest text-white/60">Modelos</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
            {modelos.map((m) => (
              <li key={m.slug}>
                <Link to={`/#modelo-${m.slug}`} className="text-sm hover:underline">
                  {m.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-4 px-6 py-6 text-sm text-white/80 sm:flex-row sm:items-center sm:px-8">
          <p>© Todos los derechos reservados – {SITIO.nombre}</p>
          <BotonVolverArriba />
        </div>
      </div>
    </footer>
  )
}
