import { Highlighter } from "../../utils/SyntaxHighlighter"
import { SubTitle } from "../../Components/SubTitle"
import { ContentBlock } from "../../Layout/ContentBlock"

export function ListOfScripts() {
  return <div className='px-4 mt-4'>
    <ContentBlock>
      <SubTitle>
        Obtener una Bash | TTY
      </SubTitle>
      <Highlighter
        text={`
$ script /dev/null -c bash
Script started, file is /dev/null

$ ^Z

my_host$ stty raw -echo; fg
                      reset
reset: unknown terminal type unknown
Terminal type? xterm

$ export TERM=xterm
$ export SHELL=bash
        `}
      />
    </ContentBlock>
  </div>
}