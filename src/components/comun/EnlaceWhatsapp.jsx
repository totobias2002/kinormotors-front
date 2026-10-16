import { armarLinkWhatsapp } from '../../utils/whatsapp'
import { registrarClick } from '../../services/tracking'

/**
 * Link a WhatsApp que ademas deja registrado el click (modelo + seccion) para la trazabilidad.
 * Si se pasa un modelo, el mensaje precargado lo menciona.
 */
export default function EnlaceWhatsapp({ modelo, seccion, className = '', onClick, children, ...resto }) {
  return (
    <a
      href={armarLinkWhatsapp({ modelo: modelo?.nombre })}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        registrarClick({ tipoAccion: 'WHATSAPP', modeloSlug: modelo?.slug, seccion })
        onClick?.(e)
      }}
      className={className}
      {...resto}
    >
      {children}
    </a>
  )
}
