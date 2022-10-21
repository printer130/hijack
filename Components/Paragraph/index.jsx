import { paragraph } from './paragraph.module.css'

export function Paragraph ({ children }) {
  return (
    <p className={`is-size-5 block ${paragraph}`}>
      {children}
    </p>
  )
}
