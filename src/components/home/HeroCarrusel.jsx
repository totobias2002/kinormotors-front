import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useModelos } from '../../context/ModelosContext'
import EnlaceWhatsapp from '../comun/EnlaceWhatsapp'
import { registrarClick } from '../../services/tracking'

const INTERVALO_MS = 6500

/**
 * Banner rotativo con los modelos destacados. El texto de financiacion/precio solo aparece si el back
 * lo habilita (interruptor general + el del modelo); mientras tanto no se muestra.
 */
export default function HeroCarrusel() {
  const { slidesHero } = useModelos()
  const [actual, setActual] = useState(0)
  const [pausado, setPausado] = useState(false)

  const total = slidesHero.length
  const ir = useCallback((i) => setActual(((i % total) + total) % total), [total])

  useEffect(() => {
    const sinMovimiento = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (pausado || total < 2 || sinMovimiento) return
    const id = setInterval(() => setActual((a) => (a + 1) % total), INTERVALO_MS)
    return () => clearInterval(id)
  }, [pausado, total])

  if (!total) return null
  const slide = slidesHero[actual % total]

  return (
    <section
      aria-roledescription="carrusel"
      aria-label="Modelos destacados"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-gradient-to-br from-navy via-navy-soft to-slate-700 text-white"
    >
      {slide.imagenHeroUrl && (
        <img src={slide.imagenHeroUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" aria-hidden="true" />

      <div key={slide.slug} aria-live="polite" className="animate-aparecer relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-44 pt-40 sm:px-8 sm:pb-32">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-white/70">Kia</p>
        <h1 className="text-5xl font-black leading-none sm:text-7xl">{slide.nombre}</h1>
        {slide.tagline && <p className="mt-4 max-w-xl text-xl text-white/90 sm:text-2xl">{slide.tagline}</p>}
        {slide.mostrarFinanciacion && slide.textoFinanciacion && (
          <p className="mt-3 inline-block rounded bg-kia-red px-3 py-1.5 text-base font-bold sm:text-lg">
            {slide.textoFinanciacion}
          </p>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to={`/#modelo-${slide.slug}`}
            onClick={() => registrarClick({ tipoAccion: 'PROMOCION', modeloSlug: slide.slug, seccion: 'hero-conocer-mas' })}
            className="rounded-md bg-white px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-navy transition hover:bg-slate-200"
          >
            Conocer más
          </Link>
          <EnlaceWhatsapp
            modelo={slide}
            seccion="hero"
            className="rounded-md border-2 border-white px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-white hover:text-navy"
          >
            {slide.slug === 'tasman' ? `Quiero mi ${slide.nombre}` : 'Consultar por WhatsApp'}
          </EnlaceWhatsapp>
        </div>
      </div>

      {total > 1 && (
        <div className="absolute inset-x-0 bottom-24 z-10 flex items-center justify-center gap-4 sm:bottom-8">
          <button type="button" onClick={() => ir(actual - 1)} aria-label="Modelo anterior" className="rounded-full bg-white/15 p-2 transition hover:bg-white/30">
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {slidesHero.map((s, i) => (
              <button
                key={s.slug}
                type="button"
                onClick={() => ir(i)}
                aria-label={`Ver ${s.nombre}`}
                aria-current={i === actual}
                className={`h-2.5 rounded-full transition-all ${i === actual ? 'w-8 bg-white' : 'w-2.5 bg-white/50'}`}
              />
            ))}
          </div>
          <button type="button" onClick={() => ir(actual + 1)} aria-label="Modelo siguiente" className="rounded-full bg-white/15 p-2 transition hover:bg-white/30">
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      )}
    </section>
  )
}
