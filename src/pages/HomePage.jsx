import Layout from '../components/layout/Layout'
import HeroCarrusel from '../components/home/HeroCarrusel'
import GrillaModelos from '../components/home/GrillaModelos'
import SeccionVideo from '../components/home/SeccionVideo'
import PantallaDividida from '../components/home/PantallaDividida'

export default function HomePage() {
  return (
    <Layout flotante>
      <HeroCarrusel />
      <GrillaModelos />
      <SeccionVideo />
      <PantallaDividida />
    </Layout>
  )
}
