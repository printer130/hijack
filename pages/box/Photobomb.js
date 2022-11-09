import { DynamicHero } from '../../Container/DynamicHero'
import { Photobomb } from '../../posts/Photobomb'

export default function PhotobombPage () {
  return (
    <DynamicHero
      imageUrl='https://res.cloudinary.com/djc1umong/image/upload/v1665956516/Photobomb_znmv8y.webp'
      alt='Informacion de la maquina Photobomb'
      seo='Photobomb'
    >
      <Photobomb />
    </DynamicHero>
  )
}
