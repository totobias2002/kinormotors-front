import { Link } from 'react-router-dom'
import { registrarClick } from '../../services/tracking'

const enlace = 'text-[0.65rem] font-semibold uppercase tracking-wide text-white hover:underline sm:text-[0.7rem]'

/** Franja negra superior (solo escritorio; en celular Kia la mete en el menu de hamburguesa), fina como la de Kia: "Promociones" a la izquierda y "Contáctenos" a la derecha. */
export default function TopBar() {
  return (
    <div className="relative z-30 hidden items-center justify-between bg-navy px-20 py-1 md:flex">
      <Link to="/promociones" onClick={() => registrarClick({ tipoAccion: 'PROMOCION', seccion: 'barra-superior' })} className={enlace}>
        Promociones
      </Link>
      <Link to="/contacto" onClick={() => registrarClick({ tipoAccion: 'CONTACTO', seccion: 'barra-superior' })} className={enlace}>
        Contáctenos
      </Link>
    </div>
  )
}
