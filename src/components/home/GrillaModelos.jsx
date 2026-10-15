import { useModelos } from '../../context/ModelosContext'
import ModeloImagen from '../comun/ModeloImagen'
import EnlaceWhatsapp from '../comun/EnlaceWhatsapp'
import { registrarClick } from '../../services/tracking'

/** Todos los modelos, agrupados por categoria, todos con los mismos botones. */
export default function GrillaModelos() {
  const { categorias } = useModelos()

  return (
    <section id="modelos" aria-labelledby="titulo-modelos" className="scroll-mt-28 bg-white px-6 py-16 sm:px-8">
      <div className="mx-auto max-w-[1400px]">
        <h2 id="titulo-modelos" className="mb-10 text-3xl font-black sm:text-4xl">
          Modelos
        </h2>
        {categorias.map((cat) => (
          <div key={cat.nombre} className="mb-12">
            <h3 className="mb-5 border-b border-slate-200 pb-2 text-sm font-extrabold uppercase tracking-widest text-slate-500">
              {cat.nombre}
            </h3>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cat.modelos.map((m) => (
                <li key={m.slug} id={`modelo-${m.slug}`} className="scroll-mt-28 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <ModeloImagen modelo={m} className="h-48 w-full sm:h-56" />
                  <div className="space-y-4 p-5">
                    <div>
                      <h4 className="text-xl font-black">{m.nombre}</h4>
                      {m.tagline && <p className="mt-1 text-sm text-slate-600">{m.tagline}</p>}
                      {m.mostrarFinanciacion && m.textoFinanciacion && (
                        <p className="mt-2 text-sm font-bold text-kia-red">{m.textoFinanciacion}</p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {m.linkOficial ? (
                        <a
                          href={m.linkOficial}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => registrarClick({ tipoAccion: 'PROMOCION', modeloSlug: m.slug, seccion: 'modelos-conocer-mas' })}
                          className="rounded-md bg-navy px-4 py-2.5 text-sm font-bold text-white transition hover:bg-navy-soft"
                        >
                          Conocer más
                        </a>
                      ) : (
                        // TODO: link oficial / pagina interna del modelo (a confirmar con Javier)
                        <button type="button" disabled title="Próximamente" className="cursor-not-allowed rounded-md bg-slate-200 px-4 py-2.5 text-sm font-bold text-slate-500">
                          Conocer más
                        </button>
                      )}
                      <EnlaceWhatsapp
                        modelo={m}
                        seccion="modelos"
                        className="rounded-md bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#1ebe5b]"
                      >
                        Consultar por WhatsApp
                      </EnlaceWhatsapp>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
