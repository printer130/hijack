import { Profile } from '../Components/Profile'
import { left_aside } from '../Layout/home.module.css'

export function LeftAside() {
  return <aside className={`${left_aside}`}>
    <Profile />
  </aside>
}