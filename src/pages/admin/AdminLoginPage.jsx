import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import api, { tokenAdmin } from '../../services/api'
import { leerErrores } from '../../utils/errores'
import Campo, { estiloInput } from '../../components/comun/Campo'

export default function AdminLoginPage() {
  const navegar = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  if (tokenAdmin.leer()) return <Navigate to="/admin" replace />

  const enviar = async (e) => {
    e.preventDefault()
    setError('')
    setEnviando(true)
    try {
      const { data } = await api.post('/admin/login', { email, password })
      tokenAdmin.guardar(data.token)
      navegar('/admin', { replace: true })
    } catch (err) {
      const r = leerErrores(err)
      setError(r.general || 'Revisá los datos ingresados')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gris px-4">
      <form onSubmit={enviar} className="w-full max-w-sm space-y-4 rounded-xl bg-white p-8 shadow">
        <h1 className="text-2xl font-black">Panel Kinor Motors</h1>
        <Campo id="email" etiqueta="Email">
          <input id="email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} className={estiloInput} />
        </Campo>
        <Campo id="password" etiqueta="Contraseña">
          <input id="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className={estiloInput} />
        </Campo>
        {error && (
          <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-800">
            {error}
          </p>
        )}
        <button type="submit" disabled={enviando} className="w-full rounded-md bg-navy px-6 py-3 font-bold text-white disabled:opacity-60">
          {enviando ? 'Ingresando…' : 'Ingresar'}
        </button>
      </form>
    </main>
  )
}
