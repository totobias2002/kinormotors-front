// Falla el build si el bundle carga archivos (imagenes, video, js, css, fuentes, pdf)
// desde otro dominio. Todo asset tiene que vivir en nuestro servidor (public/assets/...):
// una marca ya nos pidio que no usemos su servidor. Los links de navegacion
// (WhatsApp, redes) no cuentan: solo URLs que terminan en extension de archivo.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = fileURLToPath(new URL('../dist/', import.meta.url))
const ASSET = /https?:\/\/[^\s'"`<>)]+?\.(?:jpe?g|png|webp|gif|svg|mp4|webm|mp3|pdf|css|js|mjs|woff2?|ttf|otf)(?=[?#'"`\s)<>]|$)/gi
// Fuentes/CDNs que tampoco queremos aunque la URL no termine en extension.
const HOSTS = /https?:\/\/(?:fonts\.googleapis\.com|fonts\.gstatic\.com|cdn\.[\w.-]+|cdnjs\.cloudflare\.com|unpkg\.com|cdn\.jsdelivr\.net)[^\s'"`<>)]*/gi
// Las URLs de namespaces (xmlns de SVG) no cargan nada.
const IGNORAR = /^https?:\/\/(?:www\.)?w3\.org\//i

const files = []
const walk = (d) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name)
    if (e.isDirectory()) walk(p)
    else if (/\.(js|css|html|webmanifest|svg)$/.test(e.name)) files.push(p)
  }
}
walk(dist)

const problems = []
for (const f of files) {
  const txt = fs.readFileSync(f, 'utf8')
  for (const m of [...(txt.match(ASSET) || []), ...(txt.match(HOSTS) || [])]) {
    if (!IGNORAR.test(m)) problems.push(`${path.relative(dist, f)}: ${m}`)
  }
}

if (problems.length) {
  console.error(`\n✖ Assets externos (${problems.length}):\n` + [...new Set(problems)].slice(0, 30).map((p) => '  ' + p).join('\n'))
  console.error('\nBajalos a public/assets/ y usá la ruta /assets/... en el codigo.\n')
  process.exit(1)
}
console.log('✔ Sin assets externos en dist')
