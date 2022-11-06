import { Highlighter } from '../../utils/SyntaxHighlighter'
import { Paragraph } from '../../Components/Paragraph'
import { ContentBlock } from '../../Layout/ContentBlock'
import { SubTitle } from '../../Components/SubTitle'
import { Anchor } from '../../Components/Anchor'

export function Awkward () {
  return (
    <ContentBlock>
      <SubTitle>Awkward</SubTitle>
      <Paragraph>
        Empezamos con nuestro escaneo...
      </Paragraph>
      <Highlighter
        text={`
$ rustscan -a 10.10.11.185 -g -- -A -sS -n
10.10.11.185 -> [22,80]
        `}
      />
      <Highlighter
        text={`
$ rustscan -a 10.10.11.185  -- -A -sCV -n
Host is up, received syn-ack (0.22s latency).

PORT   STATE SERVICE REASON  VERSION
22/tcp open  ssh     syn-ack OpenSSH 8.9p1 Ubuntu 3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   256 72:54:af:ba:f6:e2:83:59:41:b7:cd:61:1c:2f:41:8b (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBCMaN1wQtPg5uk2w3xD0d0ND6JQgzw40PoqCSBDGB7Q0/f5lQSGU2eSTw4uCdL99hdM/+Uv84ffp2tNkCXyV8l8=
|   256 59:36:5b:ba:3c:78:21:e3:26:b3:7d:23:60:5a:ec:38 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIFsq9sSC1uhq5CBWylh+yiC7jz4tuegMj/4FVTp6bzZy
80/tcp open  http    syn-ack nginx 1.18.0 (Ubuntu)
| http-methods: 
|_  Supported Methods: GET HEAD
|_http-server-header: nginx/1.18.0 (Ubuntu)
|_http-title: Site doesn't have a title (text/html).
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
        `}
      />
      <Paragraph>
        Inspeccionando el código de la App vemos un archivo <i>router</i> y unos paths a: <i>/hr /dashboard /api/all-leave /api/staff-details /leave y /api/store-status?url="http://localhost/FUZZ"</i> .
      </Paragraph>
      <Paragraph>
        El endpoint <i>/api/staff-details</i> suena interesante ingresando nos pide un jwt, inspeccionando nuestas cookies vemos que tenemos una con el valor: <i>guest</i> ¿Qué pasa si la borramos?, ahora vemos credenciales en texto plano.
      </Paragraph>
      <Paragraph>
        Sacamos nuestra herramienta: hashcat, jhon o crackstation y obtenemos unas credenciales de <i>"christopher.jones"</i>.
      </Paragraph>
      <Paragraph>
        Estando dentro con el usuario christopher tenemos una cookie válida que intentaremos romperla con un script de python <Anchor src='https://github.com/Sjord/jwtcrack/blob/master/jwt2john.py'>jwt2jhon.py</Anchor> y <i>rockyou.txt</i>.
      </Paragraph>
      <Paragraph>
        En el endpoint <i>/api/store-status?url=""</i> con fuff vemos una API expuesta en el puerto <i>3002</i>.
      </Paragraph>
    </ContentBlock>
  )
}
