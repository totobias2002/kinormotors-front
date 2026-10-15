import PaginaInterna from '../components/comun/PaginaInterna'
import FormContacto from '../components/comun/FormContacto'
import { SITIO } from '../config/sitio'

export default function ContactoPage() {
  return (
    <PaginaInterna titulo="Contáctenos" bajada="Dejanos tu consulta y un asesor se comunica con vos.">
      <FormContacto />
      {/* TODO: dirección, horarios y teléfono (pendientes de confirmar con Javier) */}
      {(SITIO.direccion || SITIO.horarios || SITIO.telefono) && (
        <dl className="mt-10 space-y-2 text-sm">
          {SITIO.direccion && <div><dt className="font-bold">Dirección</dt><dd>{SITIO.direccion}</dd></div>}
          {SITIO.horarios && <div><dt className="font-bold">Horarios</dt><dd>{SITIO.horarios}</dd></div>}
          {SITIO.telefono && <div><dt className="font-bold">Teléfono</dt><dd>{SITIO.telefono}</dd></div>}
        </dl>
      )}
    </PaginaInterna>
  )
}
