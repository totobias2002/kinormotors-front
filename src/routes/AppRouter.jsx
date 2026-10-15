import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import PromocionesPage from '../pages/PromocionesPage'
import ContactoPage from '../pages/ContactoPage'
import TurnosPage from '../pages/TurnosPage'
import PosventaPage from '../pages/PosventaPage'
import GarantiaPage from '../pages/GarantiaPage'
import NotFoundPage from '../pages/NotFoundPage'

// El panel se carga aparte: los visitantes de la web no descargan su codigo
const AdminLoginPage = lazy(() => import('../pages/admin/AdminLoginPage'))
const AdminPanelPage = lazy(() => import('../pages/admin/AdminPanelPage'))

export default function AppRouter() {
  return (
    <Suspense fallback={<p className="p-6">Cargando…</p>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/promociones" element={<PromocionesPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/turnos" element={<TurnosPage />} />
        <Route path="/posventa" element={<PosventaPage />} />
        <Route path="/garantia" element={<GarantiaPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminPanelPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
