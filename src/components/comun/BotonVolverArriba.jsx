import { ArrowUp } from 'lucide-react'

export default function BotonVolverArriba({ className = '' }) {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-navy ${className}`}
    >
      <ArrowUp aria-hidden="true" className="h-4 w-4" />
      Volver arriba
    </button>
  )
}
