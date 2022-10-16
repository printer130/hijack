import { DynamicHero } from "../../Container/DynamicHero"
import { Shoppy } from "../../posts/Shoppy"

export default function CapShoppy() {
  return <DynamicHero
    imageUrl='https://res.cloudinary.com/djc1umong/image/upload/v1663907495/Shoppy_1_gfaxxf.webp'
    alt='Shoppy Hack The Box | Leonardo Torrico'
    seo='shoppy'
  >
     <Shoppy />
  </DynamicHero>
}