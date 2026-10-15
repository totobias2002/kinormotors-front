import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import api, { hayApi } from '../services/api'
import modelosLocales from '../data/modelos.json'
import { FINANCIACION_POR_DEFECTO } from '../config/sitio'

const ModelosContext = createContext(null)

const ORDEN_CATEGORIAS = ['Autos', 'SUV', 'Pick-ups', 'Utilitarios']

/** Una sola fuente de datos de modelos: la API; si no responde, el JSON local. */
export function ModelosProvider({ children }) {
  const [modelos, setModelos] = useState(modelosLocales)
  const [cargando, setCargando] = useState(hayApi)

  useEffect(() => {
    if (!hayApi) return
    let activo = true
    api
      .get('/modelos')
      .then((r) => {
        if (activo && Array.isArray(r.data) && r.data.length) setModelos(r.data)
      })
      .catch(() => {})
      .finally(() => activo && setCargando(false))
    return () => {
      activo = false
    }
  }, [])

  const valor = useMemo(() => {
    const activos = [...modelos].filter((m) => m.activo !== false).sort((a, b) => a.orden - b.orden)
    const categorias = ORDEN_CATEGORIAS.map((nombre) => ({
      nombre,
      modelos: activos.filter((m) => m.categoria === nombre),
    })).filter((c) => c.modelos.length)
    // El carrusel muestra los destacados; si no hay ninguno, los primeros modelos
    const destacados = activos.filter((m) => m.destacadoHero)
    return {
      modelos: activos,
      categorias,
      slidesHero: destacados.length ? destacados : activos.slice(0, 5),
      financiacionPorDefecto: FINANCIACION_POR_DEFECTO,
      cargando,
    }
  }, [modelos, cargando])

  return <ModelosContext.Provider value={valor}>{children}</ModelosContext.Provider>
}

export function useModelos() {
  const ctx = useContext(ModelosContext)
  if (!ctx) throw new Error('useModelos debe usarse dentro de ModelosProvider')
  return ctx
}
