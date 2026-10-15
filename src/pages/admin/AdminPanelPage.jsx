import { useCallback, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import api, { tokenAdmin } from '../../services/api'
import PanelLeads from '../../components/admin/PanelLeads'
import PanelFormularios from '../../components/admin/PanelFormularios'
import PanelModelos from '../../components/admin/PanelModelos'

const TABS = [
  { id: 'leads', nombre: 'Leads' },
  { id: 'contactos', nombre: 'Contactos' },
  { id: 'turnos', nombre: 'Turnos' },
  { id: 'modelos', nombre: 'Modelos y financiación' },
]

export default function AdminPanelPage() {
  const navegar = useNavigate()
  const [tab, setTab] = useState('leads')
  const [modelos, setModelos] = useState([])

  const cargarModelos = useCallback(() => {
    api.get('/admin/modelos').then((r) => setModelos(r.data)).catch(() => {})
  }, [])

  useEffect(() => {
    if (tokenAdmin.leer()) cargarModelos()
  }, [cargarModelos])

  if (!tokenAdmin.leer()) return <Navigate to="/admin/login" replace />

  const salir = () => {
    tokenAdmin.borrar()
    navegar('/admin/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gris">
      <header className="bg-navy text-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 sm:px-8">
          <h1 className="text-lg font-black">Panel Kinor Motors</h1>
          <button type="button" onClick={salir} className="inline-flex items-center gap-2 text-sm font-semibold">
            <LogOut aria-hidden="true" className="h-4 w-4" />
            Salir
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-8">
        <div role="tablist" aria-label="Secciones del panel" className="mb-6 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button key={t.id} type="button" role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)} className={`rounded-full px-4 py-2 text-sm font-bold ${tab === t.id ? 'bg-navy text-white' : 'bg-white'}`}>
              {t.nombre}
            </button>
          ))}
        </div>
        <div role="tabpanel">
          {tab === 'leads' && <PanelLeads modelos={modelos} />}
          {tab === 'contactos' && <PanelFormularios tipo="contactos" />}
          {tab === 'turnos' && <PanelFormularios tipo="turnos" />}
          {tab === 'modelos' && <PanelModelos modelos={modelos} onCambio={cargarModelos} />}
        </div>
      </main>
    </div>
  )
}
