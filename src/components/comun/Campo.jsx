/** Campo de formulario con etiqueta y mensaje de error accesibles. */
export default function Campo({ id, etiqueta, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-semibold">
        {etiqueta}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-kia-red">
          {error}
        </p>
      )}
    </div>
  )
}

export const estiloInput =
  'w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-base focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/30'
