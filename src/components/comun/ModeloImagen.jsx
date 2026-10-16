/**
 * Imagen del modelo. Mientras no haya foto cargada (imagenUrl) muestra un placeholder con el nombre.
 * Las imagenes viven en public/assets/modelos/ (o se cargan desde el admin); nada de hotlinking a kia.com.ar.
 * Hoy son miniaturas de 304x88: TODO pedir las fotos en alta a Kia / Javier.
 */
export default function ModeloImagen({ modelo, className = '' }) {
  if (modelo.imagenUrl) {
    return <img src={modelo.imagenUrl} alt={`Kia ${modelo.nombre}`} loading="lazy" className={`bg-white object-contain p-4 ${className}`} />
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
