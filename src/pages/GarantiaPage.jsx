import PaginaInterna from '../components/comun/PaginaInterna'
import EnlaceWhatsapp from '../components/comun/EnlaceWhatsapp'

// Texto basado en la garantia publicada por Kia Argentina. TODO: confirmar con Javier / Kia que siga vigente.
const VENTAJAS = ['Óptima calidad', 'Tranquilidad', 'Garantía de fábrica', 'Transferible', 'Mayor valor de reventa']

export default function GarantiaPage() {
  return (
    <PaginaInterna titulo="Garantía" bajada="5 años, 5 ventajas: las ventajas de un Kia nuevo con 5 años de garantía.">
      <ul className="mb-8 flex flex-wrap gap-2">
        {VENTAJAS.map((v) => (
          <li key={v} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold">
            {v}
          </li>
        ))}
      </ul>

      <div className="space-y-4">
        <p>
          Para los vehículos de uso particular, la garantía ofrece cobertura por <strong>5 años o 100.000 km</strong>, lo
          primero que suceda.
        </p>
        <p>
          Para los utilitarios K2500, la cobertura es de <strong>3 años o 100.000 km</strong>, lo primero que suceda.
        </p>
        <p>
          La garantía cubre los gastos de cualquier reparación atribuible a un problema de producto mientras el vehículo
          esté dentro del período de cobertura, siempre que haya sido mantenido en la Red Autorizada Kia siguiendo las
          pautas de mantenimiento de la marca.
        </p>
      </div>

      <h2 className="mt-10 text-2xl font-black">La confianza que solo te da tu concesionario Kia</h2>
      <p className="mt-3">
        Los vehículos Kia incorporan tecnología y electrónica avanzadas. Por eso el servicio de inspección y mantenimiento
        requiere repuestos originales y conocimientos específicos del fabricante, que solo se aseguran en un concesionario
        Kia: su personal está calificado, se entrena de forma periódica y cuenta con las herramientas y computadoras de
        diagnóstico especiales de la marca.
      </p>

      <h2 className="mt-10 text-2xl font-black">Manual de Garantía y Mantenimiento</h2>
      <p className="mt-3">
        Se entrega junto con cada vehículo nuevo. Explica cómo y bajo qué circunstancias se aplica la garantía, qué
        elementos cubre, y detalla el plan de mantenimiento a realizar. Te recomendamos leerlo cuando recibas tu Kia.
      </p>

      <EnlaceWhatsapp seccion="garantia" className="mt-8 inline-block rounded-md bg-[#25D366] px-6 py-3 font-bold text-white hover:bg-[#1ebe5b]">
        Consultar por WhatsApp
      </EnlaceWhatsapp>
    </PaginaInterna>
  )
}
