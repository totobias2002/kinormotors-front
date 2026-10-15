import PaginaInterna from '../components/comun/PaginaInterna'
import EnlaceWhatsapp from '../components/comun/EnlaceWhatsapp'

// TODO: texto oficial de garantia (plazos, kilometraje, condiciones) a confirmar con Javier / Kia
export default function GarantiaPage() {
  return (
    <PaginaInterna titulo="Garantía" bajada="Consultá las condiciones de garantía de tu Kia con nuestro equipo.">
      <p className="rounded-md bg-slate-100 p-5">
        Estamos preparando esta información. Mientras tanto, un asesor puede resolver tus dudas.
      </p>
      <EnlaceWhatsapp seccion="garantia" className="mt-6 inline-block rounded-md bg-[#25D366] px-6 py-3 font-bold text-white hover:bg-[#1ebe5b]">
        Consultar por WhatsApp
      </EnlaceWhatsapp>
    </PaginaInterna>
  )
}
