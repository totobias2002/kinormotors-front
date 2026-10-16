import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'
import Logo from '../comun/Logo'
import MenuModelos from './MenuModelos'
import MenuMovil from './MenuMovil'

/**
 * Navegacion principal.
 * Escritorio: Modelos · [logo] · Post Venta (con panel desplegable de modelos).
 * Celular: hamburguesa a la derecha y logo en el medio del espacio restante, con el menu en pantalla completa.
 * Con `sobreHero` flota transparente sobre el banner (texto blanco); al bajar, al abrir el menu o en otras paginas es blanca.
 */
export default function Navbar({ sobreHero = false }) {
  const [abierto, setAbierto] = useState(false)
  const [movilAbierto, setMovilAbierto] = useState(false)
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

  const transparente = sobreHero && !abierto
  const colores = transparente ? 'text-white' : 'bg-white text-navy shadow-sm'

  return (
    <nav ref={caja} aria-label="Principal" className={`relative transition-colors duration-300 ${colores}`}>
      {/* Celular: hamburguesa a la derecha (al alcance del pulgar derecho) y el logo en el medio del espacio que queda a su izquierda */}
      <div className={`flex h-[55px] items-center border-b px-4 md:hidden ${transparente ? 'border-white/40' : 'border-transparent'}`}>
        <div className="flex flex-1 justify-center">
          <Logo claro={transparente} className="h-6" />
        </div>
        <button type="button" onClick={() => setMovilAbierto(true)} aria-label="Abrir menú" aria-haspopup="dialog" className="-mr-2 p-2">
          <Menu aria-hidden="true" className="h-6 w-6" />
        </button>
      </div>
      {movilAbierto && <MenuMovil onCerrar={() => setMovilAbierto(false)} />}

      {/* Escritorio */}
      <div className="hidden grid-cols-[1fr_auto_1fr] items-center gap-2 px-20 py-4 md:grid">
        <button
          type="button"
          aria-expanded={abierto}
          aria-haspopup="true"
          onClick={() => setAbierto((v) => !v)}
          className={`justify-self-start text-base font-bold ${abierto ? 'underline underline-offset-4' : 'hover:underline hover:underline-offset-4'}`}
        >
          Modelos
        </button>

        <Logo claro={transparente} className="h-8" />

        <Link to="/posventa" onClick={() => setAbierto(false)} className="justify-self-end text-base font-bold hover:underline hover:underline-offset-4">
          Post Venta
        </Link>
      </div>
      {abierto && (
        <div className="hidden md:block">
          <MenuModelos onCerrar={() => setAbierto(false)} />
        </div>
      )}
    </nav>
  )
}
