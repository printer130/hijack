import { layout } from './layout.module.css'

export function Layout({ children }) {
  return <div className={`block ${layout}`}>
    {children}
  </div>
}