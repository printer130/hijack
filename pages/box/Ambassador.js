import { DynamicHero } from "../../Container/DynamicHero"
import { Ambassador } from "../../posts/Ambassador"

export default function AmbassadorPage() {
  return <DynamicHero
    imageUrl='/late_info.webp'
    alt='Informacion de la maquina Ambassador'
    seo='Ambassador'
  >
     <Ambassador />
  </DynamicHero>
}