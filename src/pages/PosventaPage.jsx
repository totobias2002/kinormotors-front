import { Link } from 'react-router-dom'
import PaginaInterna from '../components/comun/PaginaInterna'
import EnlaceWhatsapp from '../components/comun/EnlaceWhatsapp'
import { registrarClick } from '../services/tracking'

// TODO: contenido definitivo de posventa (servicios, repuestos originales, asistencia) a confirmar con Javier
export default function PosventaPage() {
  return (
    <PaginaInterna titulo="Posventa" bajada="Mantené tu Kia como el primer día.">
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          to="/turnos"
          onClick={() => registrarClick({ tipoAccion: 'TURNO', seccion: 'posventa' })}
          className="rounded-xl border border-slate-200 p-6 transition hover:bg-navy hover:text-white"
        >
          <h2 className="text-xl font-black">Turnos online</h2>
          <p className="mt-1 text-sm opacity-80">Agendá tu cita de service.</p>
        </Link>
        <Link to="/garantia" className="rounded-xl border border-slate-200 p-6 transition hover:bg-navy hover:text-white">
          <h2 className="text-xl font-black">Garantía</h2>
          <p className="mt-1 text-sm opacity-80">Conocé la cobertura de tu vehículo.</p>
        </Link>
      </div>
      <EnlaceWhatsapp seccion="posventa" className="mt-8 inline-block rounded-md bg-[#25D366] px-6 py-3 font-bold text-white hover:bg-[#1ebe5b]">
        Consultar por WhatsApp
      </EnlaceWhatsapp>
    </PaginaInterna>
  )
}
