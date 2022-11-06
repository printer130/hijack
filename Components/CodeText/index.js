import { code_text_sub, code_text, code_span } from './code_text.module.css'

export function CodeText ({ maper }) {
  return (
    <div className={`${code_text}`}>
      <div className={`${code_text_sub}`}>
        {
      maper.map((map, i) => {
        return (
          <span
            className={`${code_span}`}
            key={i}
          >{map}
          </span>
        )
      })
    }
      </div>
    </div>
  )
}
