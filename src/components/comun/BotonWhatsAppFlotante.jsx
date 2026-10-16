import { MessageCircle } from 'lucide-react'
import EnlaceWhatsapp from './EnlaceWhatsapp'

/** Boton flotante "Hablá con nosotros", visible en todo el sitio. */
export default function BotonWhatsAppFlotante({ modelo }) {
  return (
    <EnlaceWhatsapp
      modelo={modelo}
      seccion="boton-flotante"
      aria-label="Hablá con nosotros por WhatsApp"
      className="animate-aro-suave fixed bottom-20 right-4 z-50 sm:bottom-6 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#1ebe5b] sm:right-6 sm:px-5 sm:py-3.5 sm:text-base"
    >
      <MessageCircle aria-hidden="true" className="h-6 w-6" />
      <span className="hidden sm:inline">Hablá con nosotros</span>
    </EnlaceWhatsapp>
  )
}
