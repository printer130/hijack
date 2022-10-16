import { DynamicHero } from "../../Container/DynamicHero"
import { Photobomb } from "../../posts/Photobomb"

export default function PhotobombPage() {
  return <DynamicHero
    imageUrl='/cap/Photobomb.webp'
    alt='Informacion de la maquina Photobomb'
  >
     <Photobomb />
  </DynamicHero>
}