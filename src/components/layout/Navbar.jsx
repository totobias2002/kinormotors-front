import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import Logo from '../comun/Logo'
import { useModelos } from '../../context/ModelosContext'

/**
 * Navegacion principal: Modelos · [logo] · Posventa.
 * Con `transparente` flota sobre el hero (texto blanco); al bajar o en otras paginas es blanca.
 */
export default function Navbar({ sobreHero = false }) {
  const { categorias } = useModelos()
  const [abierto, setAbierto] = useState(false)
  const caja = useRef(null)

  useEffect(() => {
    if (!abierto) return
    const cerrar = (e) => {
      if (e.type === 'keydown' && e.key !== 'Escape') return
      if (e.type === 'mousedown' && caja.current?.contains(e.target)) return
      setAbierto(false)
    }
    document.addEventListener('mousedown', cerrar)
    document.addEventListener('keydown', cerrar)
    return () => {
      document.removeEventListener('mousedown', cerrar)
      document.removeEventListener('keydown', cerrar)
    }
  }, [abierto])

  const colores = sobreHero ? 'text-white' : 'bg-white text-navy shadow-sm'

  return (
    <nav aria-label="Principal" className={`transition-colors duration-300 ${colores}`}>
      <div className="mx-auto grid max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-3 sm:px-8 sm:py-4">
        <div ref={caja} className="relative justify-self-start">
          <button
            type="button"
            aria-expanded={abierto}
            aria-haspopup="true"
            onClick={() => setAbierto((v) => !v)}
            className="inline-flex items-center gap-1 text-base font-semibold sm:text-lg"
          >
            Modelos
            <ChevronDown aria-hidden="true" className={`h-4 w-4 transition ${abierto ? 'rotate-180' : ''}`} />
          </button>
          {abierto && (
            <div className="absolute left-0 top-full mt-3 max-h-[70vh] w-[min(92vw,640px)] overflow-auto rounded-lg bg-white p-5 text-navy shadow-2xl">
              <div className="grid gap-5 sm:grid-cols-2">
                {categorias.map((c) => (
                  <div key={c.nombre}>
                    <p className="mb-2 text-xs font-extrabold uppercase tracking-widest text-slate-500">{c.nombre}</p>
                    <ul className="space-y-1">
                      {c.modelos.map((m) => (
                        <li key={m.slug}>
                          <Link
                            to={`/#modelo-${m.slug}`}
                            onClick={() => setAbierto(false)}
                            className="block rounded px-2 py-1.5 text-base font-semibold hover:bg-slate-100"
                          >
                            {m.nombre}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Logo claro={sobreHero} className="h-5 sm:h-7" />

        <Link to="/posventa" className="justify-self-end text-base font-semibold sm:text-lg">
          Posventa
        </Link>
      </div>
    </nav>
  )
}
