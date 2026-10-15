import test from 'node:test'
import assert from 'node:assert/strict'
import { armarLinkWhatsapp } from './whatsapp.js'

test('el link incluye el modelo en el mensaje', () => {
  const url = armarLinkWhatsapp({ modelo: 'Sportage', numero: '5491112345678' })
  assert.ok(url.startsWith('https://wa.me/5491112345678?text='))
  assert.equal(decodeURIComponent(url.split('text=')[1]), 'Hola, quiero info sobre el Kia Sportage')
})

test('sin modelo manda un mensaje general', () => {
  const url = armarLinkWhatsapp({ numero: '5491112345678' })
  assert.match(decodeURIComponent(url.split('text=')[1]), /más información/)
})

test('escapa caracteres especiales del modelo', () => {
  const url = armarLinkWhatsapp({ modelo: 'K4 Sedán & Co', numero: '1' })
  assert.ok(!url.includes(' '))
  assert.ok(url.includes('%26'))
})
