import { DynamicHero } from "../../Container/DynamicHero"
import { Trick } from "../../posts/Trick"

export default function Trick() {
  return <DynamicHero
    imageUrl='/trick.webp'
    alt='Informacion de la maquina Trick'
  >
     <Trick />
  </DynamicHero>
}