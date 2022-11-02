import Head from 'next/head'
import { grid } from '../Layout/home.module.css'
import { ListOfScripts } from '../Components/ListOfScripts'

import { LeftAside } from '../Container/Left_Aside'
import { RightAside } from '../Container/Right_Aside'
export default function Scripts () {
  return (
    <>
      <Head>
        <title>Tratamiento de la TTY | STTY</title>
      </Head>
      <div className={`${grid}`}>
        <LeftAside />
        <ListOfScripts />
        <RightAside />
      </div>
    </>
  )
}
