export const MACHINES = [
  [
    "Late", {
    name: 'Late',
    description: 'Ganamos acceso por SSTI (Server Side Template Injection) y escalaremos privilegios manipulando un archivo que se ejecuta en intervalos.',
    posted: '10-08-2022',
    src: '/late_info.webp',
    alt: 'Late Hack The Box',
    release: '23 Apr 2022',
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
    release: '23 Apr 2022',
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
    src: 'https://res.cloudinary.com/djc1umong/image/upload/v1663697041/Trick_1_gawv9i.webp',
    alt: 'Máquina Trick',
    release: '23 Apr 2022',
    chips: ['Cracking zip files', 'SMB Enumeration via ipv6', 'RPC Enumeration','Windows defender Evasion', 'Abusing kerberos - kerbrute (valid user enumeration)'],
    tags: ['OSCP', 'OSEP', 'Active Directory']
    }
  ]
]