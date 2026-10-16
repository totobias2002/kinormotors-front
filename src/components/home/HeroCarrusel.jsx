import { useEffect, useState } from 'react'
import EnlaceWhatsapp from '../comun/EnlaceWhatsapp'
import { HERO_SLIDES } from '../../data/heroSlides'

const INTERVALO_MS = 6000

/**
 * Banner a pantalla completa con los mismos slides que Kia. Cada boton abre WhatsApp con el modelo del slide
 * (y queda registrado para la trazabilidad). Pausa al pasar el mouse o con foco; respeta "reducir movimiento".
 */
export default function HeroCarrusel() {
  const [actual, setActual] = useState(0)
  const [pausado, setPausado] = useState(false)
  const total = HERO_SLIDES.length
  const slide = HERO_SLIDES[actual]

  useEffect(() => {
    const sinMovimiento = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (pausado || sinMovimiento) return
    const id = setInterval(() => setActual((a) => (a + 1) % total), INTERVALO_MS)
    return () => clearInterval(id)
  }, [pausado, total])

  // Precarga la imagen del slide siguiente para que el cambio no parpadee
  useEffect(() => {
    const siguiente = HERO_SLIDES[(actual + 1) % total]
    const vertical = window.matchMedia?.('(max-width: 767px)').matches
    new Image().src = vertical ? siguiente.mobile : siguiente.desktop
  }, [actual, total])

  return (
    <section
      aria-roledescription="carrusel"
      aria-label="Modelos destacados"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
      className="relative h-[100svh] min-h-[560px] overflow-hidden bg-navy text-white"
    >
      <picture key={slide.id} className="animate-aparecer">
        <source media="(min-width: 768px)" srcSet={slide.desktop} />
        <img src={slide.mobile} alt={slide.titulo ? `Kia ${slide.titulo}` : slide.boton} className="absolute inset-0 h-full w-full object-cover" />
      </picture>
      <div className={`absolute inset-0 ${slide.overlay ? 'bg-black/25' : 'bg-gradient-to-t from-black/45 via-transparent to-transparent'}`} aria-hidden="true" />

      <div key={`t-${slide.id}`} aria-live="polite" className="animate-aparecer absolute inset-x-0 bottom-[4.5rem] z-10 flex flex-col items-center px-6 text-center md:bottom-20">
        {slide.titulo && <h1 className="text-[2rem] font-extrabold leading-tight xl:text-[2.25rem] 2xl:text-[4rem]">{slide.titulo}</h1>}
        {slide.subtitulo && <p className="mt-1 text-base md:text-lg">{slide.subtitulo}</p>}
        <EnlaceWhatsapp
          modelo={slide.modelo}
          seccion="hero"
          className="mt-5 inline-block min-w-[168px] bg-white px-8 py-[1.15rem] text-base font-bold text-navy transition hover:bg-slate-200 md:mt-6"
        >
          {slide.boton}
        </EnlaceWhatsapp>
      </div>

      <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center md:bottom-6" role="group" aria-label="Elegir modelo">
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActual(i)}
            aria-label={`Ver slide ${i + 1} de ${total}`}
            aria-current={i === actual}
            className="group px-[3.5px] py-3"
          >
            <span className={`block h-[3px] w-[22px] transition-colors md:w-8 ${i === actual ? 'bg-white' : 'bg-white/45 group-hover:bg-white/80'}`} />
          </button>
        ))}
      </div>
    </section>
  )
}
