/**
 * Imagen del modelo. Mientras no haya foto cargada (imagenUrl) muestra un placeholder con el nombre.
 * TODO: cargar las imagenes reales (en public/assets/modelos/ o desde el admin); nada de hotlinking a kia.com.ar.
 */
export default function ModeloImagen({ modelo, className = '' }) {
  if (modelo.imagenUrl) {
    return <img src={modelo.imagenUrl} alt={`Kia ${modelo.nombre}`} loading="lazy" className={`object-cover ${className}`} />
  }
  return (
    <div
      role="img"
      aria-label={`Kia ${modelo.nombre} (imagen pendiente)`}
      className={`flex items-center justify-center bg-gradient-to-br from-slate-200 via-slate-100 to-white text-center ${className}`}
    >
      <span className="px-4 text-2xl font-black uppercase tracking-wide text-navy/25 sm:text-3xl">{modelo.nombre}</span>
    </div>
  )
}
