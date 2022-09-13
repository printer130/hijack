import { DynamicHero } from "../../Container/DynamicHero"
import { Cap } from "../../posts/Cap"

export default function CapPage() {
  return <DynamicHero
    imageUrl='/cap/Cap.png'
    alt='Informacion de la maquina Late'
  >
     <Cap />
  </DynamicHero>
}