import { DynamicHero } from "../../Container/DynamicHero"
import { Trick } from "../../posts/Trick"

export default function TrickPage() {
  return <DynamicHero
    imageUrl='https://res.cloudinary.com/djc1umong/image/upload/v1663697041/Trick_1_gawv9i.webp'
    alt='Informacion de la maquina Trick'
    seo='Trick'
  >
     <Trick />
  </DynamicHero>
}