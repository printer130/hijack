export const MACHINES = [
  [
    "Late", {
    name: 'Late',
    description: 'Empezamos por SSTI (Server Side Template Injection) y escalaremos privilegios manipulando un archivo que se ejecuta en intervalos de tiempo.',
    name: 'Late',
    description: 'Máquina sencilla.',
    posted: '10-08-2022',
    src: '/late_info.webp',
    alt: 'Late Hack The Box',
    chips: ['Cracking zip files', 'SMB Enumeration via ipv6', 'RPC Enumeration','Windows defender Evasion', 'Abusing kerberos - kerbrute (valid user enumeration)'],
    tags: ['OSCP', 'OSEP', 'Active Directory']
    }
  ],
  [
    "EarlyAccess", {
    name: 'EarlyAccess',
    description: 'Una de mis máquinas favoritas.',
    posted: '17-08-2022',
    src: '/earlyAccess_info.webp',
    alt: 'Máquina Late en Hack The Box una de las mas faciles',
    chips: ['Cracking zip files', 'SMB Enumeration via ipv6', 'RPC Enumeration','Windows defender Evasion', 'Abusing kerberos - kerbrute (valid user enumeration)'],
    tags: ['OSCP', 'OSEP', 'Active Directory']
    }
  ],
  [
    "Cap", {
    name: 'Cap',
    description: 'Abusaremos de la capability SET-SUID para ser root sin antes usar tshark.',
    posted: "24-08-2022",
    src: '/cap/Cap.webp',
    alt: 'Máquina Cap Hack The Box',
    name: 'Cap - guía',
    description: 'Máquina corta que abusaremos de la capability SET-SUID en python.',
    posted: new Date().toLocaleDateString(),
    src: '/cap/Cap.png',
    alt: 'Máquina Cap',
    release: '23 Apr 2022',
    chips: ['Cracking zip files', 'SMB Enumeration via ipv6', 'RPC Enumeration','Windows defender Evasion', 'Abusing kerberos - kerbrute (valid user enumeration)'],
    tags: ['OSCP', 'OSEP', 'Active Directory']
    }
  ],
  [
    "Trick", {
    name: 'Trick',
    description: 'Atacaremos el servicio SMTP con dig, buscaremos subdominios con ffuf y utilizaremos sqlmap, escalaremos privilegios mediante fail2ban.',
    posted: "31-08-2022",
    description: 'Atacaremos Smtp con dig, fuzzing, y sqlmap para escalar privilegio abusaremos fail2ban .',
    posted: new Date().toLocaleDateString(),
    src: 'https://res.cloudinary.com/djc1umong/image/upload/v1663697041/Trick_1_gawv9i.webp',
    alt: 'Máquina Trick',
    chips: ['Cracking zip files', 'SMB Enumeration via ipv6', 'RPC Enumeration','Windows defender Evasion', 'Abusing kerberos - kerbrute (valid user enumeration)'],
    tags: ['OSCP', 'OSEP', 'Active Directory']
    }
  ],
  [
    "Shoppy", {
    name: 'Shoppy',
    description: 'Montaremos con Docker pero antes Fuzzing e inyectaremos SQL.',
    posted: "22-09-2022",
    src: 'https://res.cloudinary.com/djc1umong/image/upload/v1663907495/Shoppy_1_gfaxxf.webp',
    alt: 'Máquina Shoppy',
    chips: ['Cracking zip files', 'SMB Enumeration via ipv6', 'RPC Enumeration','Windows defender Evasion', 'Abusing kerberos - kerbrute (valid user enumeration)'],
    tags: ['OSCP', 'OSEP', 'Active Directory']
    }
  ],
  [
    "Photobomb", {
    name: 'Photobomb',
    description: 'Un poco de Burpsuite :).',
    posted: new Date().toLocaleDateString(),
    src: 'https://res.cloudinary.com/djc1umong/image/upload/v1665956516/Photobomb_znmv8y.webp',
    alt: 'Photobomb',
    release: '23 Apr 2022',
    chips: ['Cracking zip files', 'SMB Enumeration via ipv6', 'RPC Enumeration','Windows defender Evasion', 'Abusing kerberos - kerbrute (valid user enumeration)'],
    tags: ['OSCP', 'OSEP', 'Active Directory']
    }
  ]
]
