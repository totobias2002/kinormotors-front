import { Link } from 'react-router-dom'

// TODO: reemplazar public/assets/logo-kinor-motors.svg por el logo oficial (mismo nombre de archivo).
export default function Logo({ claro = false, className = 'h-7' }) {
  return (
    <Link to="/" aria-label="Kinor Motors S.A. - Inicio" className="inline-block">
      <img
        src="/assets/logo-kinor-motors.svg"
        alt="Kinor Motors S.A."
        className={`${className} w-auto ${claro ? 'brightness-0 invert' : ''}`}
      />
    </Link>
  )
}
