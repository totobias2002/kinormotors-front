import { useEffect, useState } from 'react'
import EnlaceWhatsapp from '../comun/EnlaceWhatsapp'
import { HERO_SLIDES } from '../../data/heroSlides'

const INTERVALO_MS = 7000
const PUNTO_ESCRITORIO = 1024 // igual que Kia: foto de celular hasta 1023 px, de escritorio desde 1024 px

/**
 * Banner con los mismos slides, tamanos y breakpoints que el de Kia. Cada boton abre WhatsApp con el modelo del slide
 * (y queda registrado para la trazabilidad). Pausa al pasar el mouse o con foco; respeta "reducir movimiento".
 *
 * En celular y tablet el banner empieza DEBAJO del menu (el menu queda sobre un fondo liso) para que el menu nunca
 * tape ni toque el auto de la foto; en escritorio el menu flota sobre la foto, como en Kia.
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
    const escritorio = window.matchMedia?.(`(min-width: ${PUNTO_ESCRITORIO}px)`).matches
    new Image().src = escritorio ? siguiente.desktop : siguiente.mobile
  }, [actual, total])

  return (
    <section
      aria-roledescription="carrusel"
      aria-label="Modelos destacados"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
      className="h-[100svh] min-h-[560px] overflow-hidden bg-navy pt-[55px] text-white md:pt-[89px] lg:pt-0"
    >
      <div className="relative h-full w-full">
        <picture key={slide.id} className="animate-aparecer">
          <source media={`(min-width: ${PUNTO_ESCRITORIO}px)`} srcSet={slide.desktop} />
          <img src={slide.mobile} alt={slide.titulo ? `Kia ${slide.titulo}` : slide.boton} className="absolute inset-0 h-full w-full object-cover" />
        </picture>
        <div className={`absolute inset-0 ${slide.overlay ? 'bg-black/30' : 'bg-gradient-to-t from-black/45 via-transparent to-transparent'}`} aria-hidden="true" />

        <div key={`t-${slide.id}`} aria-live="polite" className="animate-aparecer absolute inset-0 z-10 flex flex-col items-center justify-end px-1 pb-3">
          {slide.titulo && <h1 className="text-[2rem] font-bold xl:text-[2.25rem] 2xl:text-[4rem]">{slide.titulo}</h1>}
          {slide.subtitulo && <p className="py-1 text-base xl:text-2xl 2xl:py-3 2xl:text-[2.5rem]">{slide.subtitulo}</p>}
          <EnlaceWhatsapp
            modelo={slide.modelo}
            seccion="hero"
            className="mb-10 mt-5 inline-block bg-white px-10 py-5 text-[0.875rem] font-bold text-navy transition hover:bg-[#37434C] hover:text-white lg:mb-6 lg:mt-3 xl:mb-10 xl:mt-5"
          >
            {slide.boton}
          </EnlaceWhatsapp>
        </div>

        <div className="absolute inset-x-0 bottom-1 z-10 flex justify-center" role="group" aria-label="Elegir modelo">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActual(i)}
              aria-label={`Ver slide ${i + 1} de ${total}`}
              aria-current={i === actual}
              className="group px-[3.5px] py-3 md:px-1"
            >
              <span className={`block h-[3px] w-[22px] transition-colors md:w-8 ${i === actual ? 'bg-white' : 'bg-white/45 group-hover:bg-white/80'}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
