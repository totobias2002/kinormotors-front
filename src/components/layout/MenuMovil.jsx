import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { ChevronRight, Minus, Plus, X } from 'lucide-react'
import Logo from '../comun/Logo'
import MenuModelos from './MenuModelos'
import { registrarClick } from '../../services/tracking'

const fila = 'flex w-full items-center justify-between border-b border-slate-300 px-5 py-3.5 text-left text-lg font-bold'

/**
 * Menu de hamburguesa (celular), como el de Kia: panel blanco a pantalla completa con filas desplegables.
 * "Modelos" se abre en el lugar; "Post Venta" es un link; abajo van Promociones y Contáctenos.
 */
export default function MenuMovil({ onCerrar }) {
  const [modelosAbierto, setModelosAbierto] = useState(false)

  useEffect(() => {
    const previo = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const alTeclear = (e) => e.key === 'Escape' && onCerrar()
    document.addEventListener('keydown', alTeclear)
    return () => {
      document.body.style.overflow = previo
      document.removeEventListener('keydown', alTeclear)
    }
  }, [onCerrar])

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label="Menú" className="fixed inset-0 z-[60] overflow-y-auto bg-white text-navy md:hidden">
      <div className="flex h-[55px] items-center border-b border-slate-300 px-4">
        <div className="flex flex-1 justify-center">
          <Logo className="h-6" />
        </div>
        <button type="button" onClick={onCerrar} aria-label="Cerrar menú" className="-mr-2 p-2">
          <X aria-hidden="true" className="h-6 w-6" />
        </button>
      </div>

      <div className={modelosAbierto ? 'bg-navy text-white' : ''}>
        <button type="button" aria-expanded={modelosAbierto} onClick={() => setModelosAbierto((v) => !v)} className={fila}>
          Modelos
          <span className={`flex h-7 w-7 items-center justify-center rounded-full ${modelosAbierto ? 'bg-white text-navy' : 'bg-slate-300'}`}>
            {modelosAbierto ? <Minus aria-hidden="true" className="h-4 w-4" /> : <Plus aria-hidden="true" className="h-4 w-4" />}
          </span>
        </button>
      </div>
      {modelosAbierto && <MenuModelos enLinea onCerrar={onCerrar} />}

      <Link to="/posventa" onClick={onCerrar} className={fila}>
        Post Venta
      </Link>

      <div className="grid grid-cols-2 bg-gris text-[0.7rem] font-semibold uppercase tracking-wide text-slate-600">
        <Link
          to="/promociones"
          onClick={() => {
            registrarClick({ tipoAccion: 'PROMOCION', seccion: 'menu-movil' })
            onCerrar()
          }}
          className="flex items-center gap-3 border-r border-slate-200 px-4 py-4"
        >
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
          Promociones
        </Link>
        <Link
          to="/contacto"
          onClick={() => {
            registrarClick({ tipoAccion: 'CONTACTO', seccion: 'menu-movil' })
            onCerrar()
          }}
          className="flex items-center gap-3 px-4 py-4"
        >
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
          Contáctenos
        </Link>
      </div>
    </div>,
    document.body,
  )
}
