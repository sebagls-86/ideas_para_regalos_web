import React from "react";
import NavBar from "../../modules/navBar/NavBar";
import styles from "./termsPage.module.css";
import { Link } from "react-router-dom";

function TermsPage() {
  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <h1 className={styles.page_title}>Términos y Condiciones</h1>
        <h5 className={styles.date_info}>
          Fecha de publicación: 8 de junio de 2024.
        </h5>
        <h5 className={styles.date_info}>
          Fecha de última actualización: 8 de junio de 2024.
        </h5>
        <p className={styles.description}>
          Bienvenido a Ideas para Regalos. Al acceder a tu cuenta, te
          comprometés a seguir nuestras políticas y normas, que están destinadas
          a proteger tanto tus derechos como los de otros usuarios. Te
          recomendamos que leas detenidamente nuestros Términos y Condiciones
          para que estés plenamente informado sobre tus obligaciones y derechos
          al utilizar nuestra plataforma.
        </p>
       
        <div className={styles.titulo_}>1. Aceptación de los Términos</div>
        <p className="mb-2">
          Al acceder a nuestro sitio web, aceptás estar sujeto a estos Términos
          de Uso y a todas las leyes y regulaciones aplicables. Si no estás de
          acuerdo con alguno de estos términos, tenés prohibido usar o acceder a
          este sitio.
        </p>
        <div className={styles.titulo_}>2. Modificaciones de los Términos</div>
        <p className="mb-2">
          Nos reservamos el derecho de revisar y actualizar estos Términos de
          Uso en cualquier momento. Las modificaciones serán efectivas desde el
          momento de su publicación en el sitio web. Es su responsabilidad como
          usuario revisar estos términos periódicamente para estar informado de
          cualquier cambio.
        </p>

        <div className={styles.titulo_}>3. Registro de Usuario</div>
        <p className="mb-2">
          Para utilizar ciertos servicios de nuestro sitio web, es posible que
          debas registrarte y crear una cuenta. Te comprometés a proporcionar
          información precisa y completa durante el proceso de registro y a
          actualizar dicha información según sea necesario.
        </p>
        <div className={styles.titulo_}>4. Privacidad</div>
        <p className="mb-2">
          El uso de tu información personal está regulado por nuestra
          <Link to="" className={styles.link}>
            Política de Privacidad
          </Link>
          . Esta política describe cómo recopilamos, utilizamos y protegemos tus
          datos. Al utilizar nuestro sitio web, aceptás los términos y
          condiciones establecidos, que tiene como objetivo garantizar la
          seguridad y confidencialidad de tu información. Te recomendamos leerla
          detenidamente para comprender cómo manejamos tus datos y cuáles son
          tus derechos en relación a la protección de la privacidad.
        </p>
        <div className={styles.titulo_}>5. Uso Aceptable</div>
        <p className="mb-2">
         Te comprometés a utilizar nuestro sitio web de manera legal y
          respetuosa. No podrás utilizar el sitio web para: Publicar o transmitir
          contenido ilegal, ofensivo, difamatorio o que infrinja derechos de
          terceros. Hacer uso no autorizado de los sistemas o redes de nuestro
          sitio web. Realizar actividades que puedan interferir con el
          funcionamiento del sitio web.
        </p>
        <div className={styles.titulo_}>6. Propiedad Intelectual</div>
        <p className="mb-2">
          Todo el contenido, características y funcionalidad del sitio web,
          incluyendo, pero no limitándose a, texto, gráficos, logotipos, iconos
          de botones, imágenes, clips de audio, descargas digitales y
          compilaciones de datos, son propiedad de Ideas para Regalos o de sus
          licenciantes y están protegidos por las leyes de derechos de autor.
        </p>
        <div className={styles.titulo_}>7. Limitación de Responsabilidad</div>
        <p className="mb-2">
          En la medida permitida por la ley, Ideas para Regalos no será
          responsable por cualquier daño indirecto, incidental, especial,
          consecuente o punitivo, ni por la pérdida de beneficios o ingresos, ya
          sea incurridos directa o indirectamente, ni por cualquier pérdida de
          datos, uso, fondo de comercio u otras pérdidas intangibles resultantes
          de: Su acceso o uso o incapacidad para acceder o usar el sitio web.
          Cualquier conducta o contenido de cualquier tercero en el sitio web.
          Cualquier contenido obtenido del sitio web. El acceso no autorizado,
          uso o alteración de tus transmisiones o contenido.
        </p>
        <div className={styles.titulo_}>8. Indemnización</div>
        <p className="mb-2">
          Aceptás indemnizar y mantener indemne a Ideas para Regalos y
          a sus afiliados, empleados, agentes, socios y licenciantes, de
          cualquier reclamo o demanda, incluyendo honorarios razonables de
          abogados, realizados por cualquier tercero debido a o como resultado
          de su violación de estos Términos de Uso o su violación de cualquier
          ley o derecho de un tercero.
        </p>
        <div className={styles.titulo_}>9. Terminación</div>
        <p className="mb-2">
          Nos reservamos el derecho de terminar o suspender tu cuenta y acceso
          al sitio web en cualquier momento, sin previo aviso, por cualquier
          razón, incluyendo, pero no limitándose a, la violación de estos
          Términos de Uso.
        </p>
        <div className={styles.titulo_}>10. Ley Aplicable</div>
        <p className="mb-2">
          Estos Términos de Uso se regirán e interpretarán de acuerdo con las
          leyes de Argentina, sin considerar sus conflictos de principios
          legales.
        </p>
        <div className={styles.titulo_}>11. Contacto</div>
        <p className="mb-2">
          Si tenés alguna pregunta sobre estos Términos de Uso, por favor
          contactanos en: Ideas para Regalos
          <br/>Correo electrónico:
          ideaspararegalos@gmail.com
        </p>
        <p className="mb-4">
          Si no estás de acuerdo con estos términos, por favor, no utilices
          nuestro sitio web. Gracias por usar nuestro sitio web. Esperamos que
          tengas una experiencia positiva y enriquecedora.
        </p>
      </div>
    </>
  );
}

export default TermsPage;
