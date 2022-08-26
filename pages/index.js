import { ListOfCards } from '../Components/ListOfCards'
import { grid } from '../Layout/home.module.css'
import { LeftAside } from '../Container/Left_Aside'
import { RightAside } from '../Container/Right_Aside'

export default function Home() {
  return <div className={`${grid}`}>
    < LeftAside />
    <ListOfCards />
    <RightAside />
  </div >
}