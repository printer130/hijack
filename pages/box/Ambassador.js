import { DynamicHero } from '../../Container/DynamicHero'
import { Ambassador } from '../../posts/Ambassador'

export default function AmbassadorPage () {
  return (
    <DynamicHero
      imageUrl='https://res.cloudinary.com/djc1umong/image/upload/v1667435625/Ambassador_ufms7x.webp'
      alt='Informacion de la maquina Ambassador'
      seo='Ambassador'
    >
      <Ambassador />
    </DynamicHero>
  )
}
