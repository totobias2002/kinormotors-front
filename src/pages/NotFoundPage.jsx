import { Link } from 'react-router-dom'
import PaginaInterna from '../components/comun/PaginaInterna'

export default function NotFoundPage() {
  return (
    <PaginaInterna titulo="Página no encontrada" bajada="La página que buscás no existe o cambió de lugar.">
      <Link to="/" className="inline-block rounded-md bg-navy px-6 py-3 font-bold text-white">
        Volver al inicio
      </Link>
    </PaginaInterna>
  )
}
