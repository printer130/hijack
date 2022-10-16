import { Highlighter } from "../../utils/SyntaxHighlighter"
import { Paragraph } from "../../Components/Paragraph"
import { ContentBlock } from "../../Layout/ContentBlock"
import { SubTitle } from "../../Components/SubTitle"
import { Anchor } from "../../Components/Anchor"
import Image from "next/image"

export function Photobomb() {
  return <>
    <ContentBlock>
      <SubTitle>
        Enumerando la web
      </SubTitle>
      <Paragraph>
        Nos metemos a la URL, sin antes cambiar el archivo <i>/etc/hosts</i>.
      </Paragraph>
      <Image
         src='https://res.cloudinary.com/djc1umong/image/upload/v1665957627/bomb_page_ff29w1.webp'
         layout="responsive"
         width={635}
         height={424}
         style={{ paddingBottom:18 }}
      />
      <Paragraph>
        Vemos un login sencillo al hacer clic en <i>clic here!</i>, pero no contamos con credenciales.
      </Paragraph>
      <Paragraph>
        Inspeccionamos el código fuente, y encontramos un archivo <i>photobomb.js</i>, y unos credenciales ahí por si acaso.
      </Paragraph>
      <Image
         src='https://res.cloudinary.com/djc1umong/image/upload/v1665958090/bomb_view_source_cut_dongsv.webp'
         layout="responsive"
         width={427}
         height={129}
      />
      <Image
        src='https://res.cloudinary.com/djc1umong/image/upload/v1665963151/bomb_creds_cut_wqchuw.webp'
        layout="responsive"
        width={638}
        height={118}
      />
      <Paragraph>
        Nos encontramos con una <i>impresora de fotos</i>, nos permite descargar con diferentes tamaños de resolucion en formato jpg y png.
      </Paragraph>
      <Paragraph>
        Es hora de sacar el <Anchor src='https://portswigger.net/burp'>BurpSuite</Anchor> y ver a fondo que ocurre con esta petición al descargarnos fotos.
      </Paragraph>
      <Image
        src='https://res.cloudinary.com/djc1umong/image/upload/v1665964126/bomb_burp_cut_jqy1g9.webp'
        layout="responsive"
        width={1074}
        height={680}
      />
      <Paragraph>
        Haciendo pruebas con la herramienta, notamos que el parametro <i>filetype</i> se lo come con patatas, aca podemos ingresar una Reverse Shell y nos ponemos en escucha.
      </Paragraph>
      <Highlighter
        text={`
          $ nc -nlvp 4443
        `}
      />
    </ContentBlock>
  </>
  }