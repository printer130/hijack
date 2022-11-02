import { ListOfCards } from '../Components/ListOfCards'
import { grid } from '../Layout/home.module.css'
import { LeftAside } from '../Container/Left_Aside'
import { RightAside } from '../Container/Right_Aside'
import Head from 'next/head'

export default function Home () {
  return (
    <>
      <Head>
        <title>Hijack - Pentesting Web</title>
      </Head>
      <div className={`${grid}`}>
        <LeftAside />
        <ListOfCards />
        <RightAside />
      </div>
    </>
  )
}
