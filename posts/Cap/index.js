import { Highlighter } from "../../utils/SyntaxHighlighter"
import { Paragraph } from "../../Components/Paragraph"
import { ContentBlock } from "../../Layout/ContentBlock"
import { SubTitle } from "../../Components/SubTitle"
import Image from 'next/image'

export function Cap() {
    return <>
      <ContentBlock>
        <SubTitle>Escaneo de puertos</SubTitle>
        <Paragraph> 
          Empezamos escaneando los puertos
        </Paragraph>
        <Highlighter
          text='nmap -p- -sS --min-rate 5000 --open -vvv -n -Pn 10.10.10.245 -oG puertosAbiertos'
        />
        <Highlighter
          text="Host discovery disabled (-Pn). All addresses will be marked 'up' and scan times may be slower.
          Starting Nmap 7.92 ( https://nmap.org ) at 2022-08-07 10:35 WEST
          Initiating SYN Stealth Scan at 10:35
          Scanning 10.10.10.245 [65535 ports]
          Discovered open port 21/tcp on 10.10.10.245
          Discovered open port 80/tcp on 10.10.10.245
          Discovered open port 22/tcp on 10.10.10.245
          Completed SYN Stealth Scan at 10:35, 13.13s elapsed (65535 total ports)
          Nmap scan report for 10.10.10.245
          Host is up, received user-set (0.058s latency).
          Scanned at 2022-08-07 10:35 WEST for 7s
          Not shown: 65335 closed tcp ports (reset)
          PORT STATE SERVICE REASON
          21/tcp open ftp syn-ack ttl 63
          22/tcp open ssh syn-ack ttl 63
          80/tcp open http syn-ack ttl 63
          
          Read data files from: /usr/bin/../share/nmap
          Nmap done: 1 IP address (1 host up) scanned in 12.23 seconds
            Raw packets sent: 65535 (2.884MB) | Rcvd: 65535 (2.622MB)"
        />
        <Paragraph>
          ahora vemos qué servicios corren en los puertos descubiertos
        </Paragraph>
        <Highlighter
          text='nmap -sSV -p21,22,80 10.10.10.245 -oN objetivo'
        />
        <Image
          src='/cap/cap_main_page.webp'
          layout="responsive"
          width={815}
          height={160}
      />
      </ContentBlock>
    </>
  }