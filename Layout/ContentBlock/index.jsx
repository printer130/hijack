import { content } from './content_block.module.css'

export function ContentBlock({ children }) {
  return <div className={`content block ${content}`}>
    {children}
  </div>
}