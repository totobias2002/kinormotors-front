import Layout from '../layout/Layout'

/** Envoltorio de las paginas internas: titulo, bajada y contenido. */
export default function PaginaInterna({ titulo, bajada, children }) {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8 sm:py-16">
        <h1 className="text-4xl font-black sm:text-5xl">{titulo}</h1>
        {bajada && <p className="mt-3 text-lg text-slate-600">{bajada}</p>}
        <div className="mt-8">{children}</div>
      </div>
    </Layout>
  )
}
