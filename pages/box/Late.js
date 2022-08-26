import { DynamicHero } from "../../Container/DynamicHero"
import { Late } from "../../posts/Late"

export default function LatePage() {
  return <DynamicHero
    imageUrl='/late_info.webp'
    alt='Informacion de la maquina Late'
  >
     <Late />
  </DynamicHero>
}