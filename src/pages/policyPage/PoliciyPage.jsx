import React from "react";
import NavBar from "../../modules/navBar/NavBar";
import styles from "./policyPage.module.css";

function PolicyPage() {
  const email = "contacto.ideaspararegalos@gmail.com";
  const subject = encodeURIComponent("Consulta");
  const body = encodeURIComponent("¡Hola Ideas para Regalos! Me gustaría saber más sobre ...");
  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <h1 className={styles.page_title}>Políticas de Privacidad</h1>
        <h5 className={styles.date_info}>
          Fecha de publicación: 8 de junio de 2024.
        </h5>
        <h5 className={styles.date_info}>
          Fecha de última actualización: 8 de junio de 2024.
        </h5>

        <p className={styles.description}>
          Nos comprometemos a proteger su privacidad. Estas Políticas de
          Privacidad explican cómo recopilamos, usamos, divulgamos y protegemos
          su información personal cuando visita nuestra página web.
        </p>

        <h4 className={styles.titulo_}>1. Información que Recopilamos</h4>
        <ul className="mb-2">
          Recopilamos los siguientes datos personales para mejorar su
          experiencia en nuestro sitio:
          <li className={styles.lista}>
            Nombre: Para personalizar nuestros servicios y dirigirnos a usted de
            manera más adecuada.
          </li>
          <li className={styles.lista}>
            Correo electrónico: Para enviar actualizaciones, ofertas y
            comunicaciones importantes relacionadas con su cuenta.
          </li>
          <li className={styles.lista}>
            Foto de perfil: Para que puedas personalizar su cuenta y facilitar
            su identificación en la plataforma.
          </li>
        </ul>

        <h4 className={styles.titulo_}>2. Métodos de Recopilación</h4>
        <p className="mb-2">
          La información se recopila a través del registro de usuario en nuestro
          sitio web. Al registrarse, nos proporciona voluntariamente esta
          información para poder acceder y utilizar nuestros servicios.
        </p>

        <h4 className={styles.titulo_}>
          3. Propósito de la Recopilación de Información
        </h4>
        <p className="mb-2">
          La información que recopilamos tiene diversos propósitos, entre ellos
          la personalización del servicio. Utilizamos estos datos para mejorar y
          adaptar nuestros servicios de acuerdo con sus preferencias
          individuales y necesidades específicas. Esta personalización nos
          permite ofrecerle una experiencia más relevante y satisfactoria,
          asegurándonos de que reciba contenido, recomendaciones y
          funcionalidades que sean útiles y pertinentes para usted.
        </p>

        <h4 className={styles.titulo_}>
          4. No Compartimos Información con Terceros
        </h4>

        <p className="mb-2">
          Nos comprometemos a no compartir su información personal con terceros
          bajo ninguna circunstancia, salvo que sea requerido por ley.
        </p>

        <h4 className={styles.titulo_}>5. Derechos de los Usuarios</h4>
        <ul className="mb-2">
          Tiene derecho a todos los derechos previstos en la ley Argentina, que
          incluyen:
          <li className={styles.lista}>
            Derecho de acceso: Puede solicitar información sobre los datos
            personales que tenemos sobre usted.
          </li>
          <li className={styles.lista}>
            Derecho de rectificación: Tiene la facultad de solicitar la
            corrección de cualquier dato inexacto o incompleto.
          </li>
          <li className={styles.lista}>
            Derecho de eliminación: Tiene la posibilidad de solicitar la
            eliminación de sus datos personales.
          </li>
        </ul>

        <h4 className={styles.titulo_}>6. Medidas de Seguridad</h4>
        <p className="mb-2">
          La información personal se almacena en bases de datos protegidas con
          contraseñas. Solo los administradores de la página tienen acceso a
          estas bases de datos, garantizando la seguridad y confidencialidad de
          su información.
        </p>

        <h4 className={styles.titulo_}>7. Política de Cookies</h4>
        <p className="mb-2">
          Nuestro sitio web no utiliza cookies para recopilar información.
        </p>

        <h4 className={styles.titulo_}>8. Enlaces a Otros Sitios</h4>
        <p className="mb-2">
          No proporcionamos enlaces a otros sitios web. Su navegación se limita
          exclusivamente a nuestro sitio.
        </p>

        <h4 className={styles.titulo_}>
          9. Actualizaciones de la Política de Privacidad
        </h4>
        <p className="mb-2">
          Revisamos y actualizamos nuestras políticas de privacidad cada seis
          meses para asegurarnos de que cumplen con las normativas vigentes y
          proteger mejor su información.
        </p>

        <h4 className={styles.titulo_}>10. Restricciones de Uso</h4>
        <p className="mb-2">
          No hay restricciones de edad ni de otro tipo para el uso de nuestro
          sitio web.
        </p>

        <h4 className={styles.titulo_}>11. Contacto</h4>
        <p className="mb-2">
          Si tiene alguna pregunta sobre nuestras políticas de privacidad o
          desea ejercer alguno de sus derechos, por favor contáctenos en: Ideas
          para Regalos Correo electrónico:
          <a  className={styles.mail} href={`mailto:${email}?subject=${subject}&body=${body}`}>
            ideaspararegalos@gmail.com
          </a>
        </p>

        <p className="mb-4">
          Agradecemos su confianza y aseguramos que su privacidad es de máxima
          importancia para nosotros.
        </p>
      </div>
    </>
  );
}

export default PolicyPage;
