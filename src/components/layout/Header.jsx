import { useEffect, useState } from 'react'
import TopBar from './TopBar'
import Navbar from './Navbar'

/**
 * Franja superior + navegacion. En la home (`flotante`) queda fija sobre el hero con la navegacion
 * transparente; al bajar la navegacion se vuelve blanca. En el resto del sitio es sticky y blanca.
 */
export default function Header({ flotante = false }) {
  const [bajo, setBajo] = useState(false)

  useEffect(() => {
    if (!flotante) return
    const alScroll = () => setBajo(window.scrollY > 40)
    alScroll()
    window.addEventListener('scroll', alScroll, { passive: true })
    return () => window.removeEventListener('scroll', alScroll)
  }, [flotante])

  return (
    <header className={`${flotante ? 'fixed inset-x-0 top-0' : 'sticky top-0'} z-40`}>
      <TopBar />
      <Navbar sobreHero={flotante && !bajo} />
    </header>
  )
}
