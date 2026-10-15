import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AppRouter from './routes/AppRouter'

/** Al cambiar de pagina vuelve arriba, salvo que la URL traiga un ancla (#modelos). */
function ScrollAlCambiar() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <ScrollAlCambiar />
      <AppRouter />
    </>
  )
}
