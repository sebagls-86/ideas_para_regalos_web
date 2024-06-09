import React from "react";
import NavBar from "../../modules/navBar/NavBar";
import styles from "./policyPage.module.css";

function PolicyPage() {
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
          Nos comprometemos a proteger tu privacidad. Estas Políticas de
          Privacidad explican cómo recopilamos, usamos, divulgamos y protegemos
          tu información personal cuando visitas nuestra página web.
        </p>

        <h4 className={styles.titulo_}>1. Información que Recopilamos</h4>
        <ul className="mb-2">
          Recopilamos los siguientes datos personales para mejorar tu
          experiencia en nuestro sitio:
          <li className={styles.lista}>
            Nombre: Para personalizar nuestros servicios y dirigirnos a ti de
            manera más adecuada.
          </li>
          <li className={styles.lista}>
            Correo electrónico: Para enviarte actualizaciones, ofertas y
            comunicaciones importantes relacionadas con tu cuenta.
          </li>
          <li className={styles.lista}>
            Foto de perfil: Para que puedas personalizar tu cuenta y facilitar
            tu identificación en la plataforma.
          </li>
        </ul>

        <h4 className={styles.titulo_}>2. Métodos de Recopilación</h4>
        <p className="mb-2">
          La información se recopila a través del registro de usuario en nuestro
          sitio web. Al registrarte, nos proporcionás voluntariamente esta
          información para poder acceder y utilizar nuestros servicios.
        </p>

        <h4 className={styles.titulo_}>
          3. Propósito de la Recopilación de Información
        </h4>
        <p className="mb-2">
          La información que recopilamos tiene diversos propósitos, entre ellos
          la personalización del servicio. Utilizamos estos datos para mejorar y
          adaptar nuestros servicios de acuerdo con tus preferencias
          individuales y necesidades específicas. Esta personalización nos
          permite ofrecerte una experiencia más relevante y satisfactoria,
          asegurándonos de que recibas contenido, recomendaciones y
          funcionalidades que sean útiles y pertinentes para vos.
        </p>

        <h4 className={styles.titulo_}>
          4. No Compartimos Información con Terceros
        </h4>

        <p className="mb-2">
          Nos comprometemos a no compartir tu información personal con terceros
          bajo ninguna circunstancia, salvo que sea requerido por ley.
        </p>

        <h4 className={styles.titulo_}>5. Derechos de los Usuarios</h4>
        <ul className="mb-2">
          Tenés derecho a todos los derechos previstos en la ley Argentina, que
          incluyen:
          <li className={styles.lista}>
            Derecho de acceso: Podés solicitar información sobre los datos
            personales que tenemos sobre vos.
          </li>
          <li className={styles.lista}>
            Derecho de rectificación: Tenés la facultad de solicitar la
            corrección de cualquier dato inexacto o incompleto.
          </li>
          <li className={styles.lista}>
            Derecho de eliminación: Tenés la posibilidad de solicitar la
            eliminación de tus datos personales.
          </li>
        </ul>

        <h4 className={styles.titulo_}>6. Medidas de Seguridad</h4>
        <p className="mb-2">
          La información personal se almacena en bases de datos protegidas con
          contraseñas. Solo los administradores de la página tienen acceso a
          estas bases de datos, garantizando la seguridad y confidencialidad de
          tu información.
        </p>

        <h4 className={styles.titulo_}>7. Política de Cookies</h4>
        <p className="mb-2">
          Nuestro sitio web no utiliza cookies para recopilar información.
        </p>

        <h4 className={styles.titulo_}>8. Enlaces a Otros Sitios</h4>
        <p className="mb-2">
          No proporcionamos enlaces a otros sitios web. Tu navegación se limita
          exclusivamente a nuestro sitio.
        </p>

        <h4 className={styles.titulo_}>
          9. Actualizaciones de la Política de Privacidad
        </h4>
        <p className="mb-2">
          Revisamos y actualizamos nuestras políticas de privacidad cada seis
          meses para asegurarnos de que cumplen con las normativas vigentes y
          proteger mejor tu información.
        </p>

        <h4 className={styles.titulo_}>10. Restricciones de Uso</h4>
        <p className="mb-2">
          No hay restricciones de edad ni de otro tipo para el uso de nuestro
          sitio web.
        </p>

        <h4 className={styles.titulo_}>11. Contacto</h4>
        <p className="mb-2">
          Si tenés alguna pregunta sobre nuestras políticas de privacidad o
          desea ejercer alguno de sus derechos, por favor contáctenos en: Ideas
          para Regalos Correo electrónico: ideaspararegalos@gmail.com
        </p>

        <p className="mb-4">
          Agradecemos tu confianza y aseguramos que tu privacidad es de
          máxima importancia para nosotros.
        </p>
      </div>
    </>
  );
}

export default PolicyPage;
