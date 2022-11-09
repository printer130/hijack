import { DynamicHero } from '../../Container/DynamicHero'
import { EarlyAccess } from '../../posts/EarlyAccess'

export default function EarlyAccessPage () {
  return (
    <DynamicHero
      imageUrl='/earlyAccess_info.webp'
      alt='Acceso anticipado a mi juego en Hack The Box'
      seo='earlyAccess'
    >
      <EarlyAccess />
    </DynamicHero>
  )
}
