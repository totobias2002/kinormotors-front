import { useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { SITIO } from '../../config/sitio'

/**
 * Seccion de video ("Dominá tu movimiento…").
 * TODO: confirmar el texto exacto y cargar el video (VITE_VIDEO_HOME_URL). Sin video se muestra un fondo.
 */
export default function SeccionVideo() {
  const video = useRef(null)
  const [reproduciendo, setReproduciendo] = useState(true)

  const alternar = () => {
    if (!video.current) return
    if (video.current.paused) {
      video.current.play()
      setReproduciendo(true)
    } else {
      video.current.pause()
      setReproduciendo(false)
    }
  }

  return (
    <section aria-labelledby="titulo-video" className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-navy to-navy-soft text-white">
      {SITIO.videoHomeUrl && (
        <video ref={video} src={SITIO.videoHomeUrl} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
      )}
      <div className="absolute inset-0 bg-navy/50" aria-hidden="true" />
      <div className="relative z-10 px-6 text-center">
        <h2 id="titulo-video" className="text-4xl font-black leading-tight sm:text-6xl">
          Dominá tu movimiento
        </h2>
      </div>
      {SITIO.videoHomeUrl && (
        <button
          type="button"
          onClick={alternar}
          aria-label={reproduciendo ? 'Pausar video' : 'Reproducir video'}
          className="absolute bottom-5 right-5 z-10 rounded-full bg-white/20 p-3 transition hover:bg-white/40"
        >
          {reproduciendo ? <Pause aria-hidden="true" className="h-5 w-5" /> : <Play aria-hidden="true" className="h-5 w-5" />}
        </button>
      )}
    </section>
  )
}
