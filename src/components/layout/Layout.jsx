import Header from './Header'
import Footer from './Footer'
import BotonWhatsAppFlotante from '../comun/BotonWhatsAppFlotante'

/** Estructura comun de las paginas publicas: cabecera, contenido, pie y boton de WhatsApp. */
export default function Layout({ children, flotante = false }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[60] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-navy"
      >
        Saltar al contenido
      </a>
      <Header flotante={flotante} />
      <main id="contenido" className="flex-1">
        {children}
      </main>
      <Footer />
      <BotonWhatsAppFlotante />
    </div>
  )
}
