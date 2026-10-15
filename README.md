# kinormotors-front

Sitio web de **Kinor Motors S.A.** (concesionaria oficial Kia): réplica de la home de Kia Argentina adaptada a la
agencia, con botón de WhatsApp como elemento central, formularios y panel admin. El backend está en
[`kinormotors-back`](https://github.com/totobias2002/kinormotors-back).

Stack: React 18 · Vite · Tailwind 4 · React Router 7 · Axios. Deploy en Vercel.

## Correr en local

```bash
npm install
cp .env.example .env   # opcional; sin VITE_API_URL el sitio usa src/data/modelos.json
npm run dev            # http://localhost:5173
npm run lint
npm test
npm run build
```

> Con `VITE_API_URL` apuntando al back se registran los clicks y funcionan los formularios y el panel
> (`/admin/login`). Para probar sin tocar producción, levantá el back local (ver su README).

## Estructura

```
src/
  components/
    layout/   Header (franja superior + navegación), TopBar, Navbar, Footer, Layout
    home/     HeroCarrusel, GrillaModelos, SeccionVideo, PantallaDividida
    comun/    Botón flotante de WhatsApp, EnlaceWhatsapp, formularios, Logo, ModeloImagen
    admin/    Paneles del admin: leads (filtros + CSV), formularios, modelos y financiación
  config/     sitio.js: número de WhatsApp, redes, dirección… (todo lo pendiente está marcado con TODO)
  context/    ModelosContext: única fuente de modelos (API, con data/modelos.json de respaldo)
  data/       modelos.json: respaldo si la API no responde
  pages/      Home, Promociones, Contacto, Turnos, Posventa, Garantía y pages/admin
  routes/     AppRouter (el panel admin se carga aparte, con lazy)
  services/   api.js (axios + token admin) y tracking.js (origen de la visita y registro de clicks)
  utils/      whatsapp.js (arma el link wa.me) y errores.js
public/assets/  logo-kinor-motors.svg (placeholder)
```

## Cómo se configura lo pendiente

| Qué | Dónde |
|---|---|
| Número de WhatsApp | `VITE_WHATSAPP_NUMERO` (o `config/sitio.js`) |
| Redes sociales | `config/sitio.js` → `redes` (vacías = botón sin link) |
| Dirección, horarios, teléfono | `config/sitio.js` |
| Logo | reemplazar `public/assets/logo-kinor-motors.svg` (mismo nombre) |
| Video de la sección "Dominá tu movimiento" | `VITE_VIDEO_HOME_URL` |
| Imágenes de modelos | `imagenUrl` / `imagenHeroUrl` del modelo (admin o JSON); no se enlaza a kia.com.ar |
| Financiación / precios | Oculta. Se muestra solo con el interruptor general + el del modelo (panel admin) |

## Trazabilidad

`services/tracking.js` guarda de dónde llegó el visitante (UTM y referrer) la primera vez de la sesión y lo manda
con cada click (WhatsApp, Contáctenos, Promociones, turnos) y cada formulario, junto con el modelo y la sección
donde se hizo el click. El mensaje de WhatsApp incluye el modelo cuando el botón está en una tarjeta de modelo.

## Deploy (Vercel)

Variables: `VITE_API_URL` (URL pública del back + `/api`), `VITE_WHATSAPP_NUMERO`, `VITE_VIDEO_HOME_URL`.
`vercel.json` reenvía las rutas al `index.html` (SPA). En el back, `APP_CORS_ALLOWED_ORIGINS` tiene que
incluir el dominio de Vercel.
