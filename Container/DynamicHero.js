import { grid, feed, posts } from '../Layout/home.module.css'
import { LeftAside } from "../Container/Left_Aside"
import { RightAside } from "../Container/Right_Aside"
import Image from "next/image"

export function DynamicHero({
    imageUrl = '/late_info.webp',
     alt,
     children
    }) {
  return <div className={`${grid}`}>
    <LeftAside />
    <div className={`${posts}`}>
      <figure className={`image 5by4 block`}>
        <Image
          priority
          layout="responsive"
          width={602}
          height={379}
          src={imageUrl}
          alt={alt}
        />
      </figure>
      <div className={`${feed}`}>
        {children}
      </div>
    </div>
    <RightAside />
  </div >
}