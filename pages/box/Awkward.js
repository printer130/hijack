import { DynamicHero } from '../../Container/DynamicHero'
import { Awkward } from '../../posts/Awkward'

export default function AmbassadorPage () {
  return (
    <DynamicHero
      imageUrl='https://res.cloudinary.com/djc1umong/image/upload/v1667435496/Awkward_fbwwdn.webp'
      alt='Informacion de la maquina Awkward'
      seo='Awkward'
    >
      <Awkward />
    </DynamicHero>
  )
}
