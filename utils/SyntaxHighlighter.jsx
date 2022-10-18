import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/shadesOfPurple'

export const Highlighter = ({ text, children }) => (
  <Highlight 
    {...defaultProps}
    theme={theme} 
    code={text ? text.trim() : children}
    language='python'
  >
    {
      ({ className, style, tokens, getLineProps, getTokenProps }) =>
        (
          <>
            <pre className={className} style={style}>
              {tokens.map((line, i) => (
                <section key={i+1} {...getLineProps({ line, key: i })}>
                  <div>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                </section>
              ))}
            </pre>
            <style jsx>{`
                pre {
                  max-width: 600px;
                  width: 92vw;
                  text-align: left;
                  margin: 1rem 0;
                  padding: .5em;
                  border-radius: 7px;
                  overflow: auto;
                }
                section {
                  overflow: auto;
                  display: table-row;
                }
                strong {
                  display: table-cell;
                  text-align: right;
                  padding-right: 1em;
                  user-select: none;
                }
                span {
                  display: table-cell;
                }
              `}
            </style>
          </>
        )
    }
  </Highlight>
)