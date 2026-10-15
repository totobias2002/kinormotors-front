import PaginaInterna from '../components/comun/PaginaInterna'
import FormTurno from '../components/comun/FormTurno'

export default function TurnosPage() {
  return (
    <PaginaInterna titulo="Turnos online" bajada="Pedí tu turno de posventa y te contactamos para confirmarlo.">
      <FormTurno />
    </PaginaInterna>
  )
}
