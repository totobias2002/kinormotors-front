import { Link } from 'react-router-dom'

// Logo oficial (PNG blanco con transparencia): public/assets/logo-kinor-motors.png.
// `claro` lo muestra blanco (sobre fondos oscuros); sin `claro` se oscurece por CSS.
export default function Logo({ claro = false, className = 'h-8' }) {
  return (
    <Link to="/" aria-label="Kinor Motors S.A. - Inicio" className="inline-block">
      <img
        src="/assets/logo-kinor-motors.png"
        alt="Kinor Motors S.A."
        className={`${className} w-auto ${claro ? '' : 'brightness-0'}`}
      />
    </Link>
  )
}
