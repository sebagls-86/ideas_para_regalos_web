import React from "react";
import NavBar from "../../modules/navBar/NavBar";
import styles from "./policyPage.module.css";

function PolicyPage() {
  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <h1 className={styles.page_title}>Políticas de Privacidad</h1>
        <p className={styles.sub_title}>
          Nos comprometemos a proteger tu privacidad. Estas Políticas de
          Privacidad explican cómo recopilamos, usamos, divulgamos y protegemos
          tu información personal cuando visitas nuestra página web.
        </p>
        <h5 className={styles.date_info}>
          Fecha de publicación: 8 de junio de 2024.
        </h5>
        <h5 className={styles.date_info}>
          Fecha de última actualización: 8 de junio de 2024.
        </h5>

        <h4 className={styles.titulo_}>1. Información que Recopilamos</h4>
        <p className="mb-2">
          Recopilamos los siguientes datos personales: Nombre Correo electrónico
          Foto de perfil
          
          <h4 className={styles.titulo_}>2. Métodos de Recopilación</h4>
          La información se recopila a través del registro de usuario en nuestro
          sitio web. Al registrarse, usted nos proporciona voluntariamente esta
          información para poder acceder y utilizar nuestros servicios.

          <h4 className={styles.titulo_}>
            3. Propósito de la Recopilación de Información
          </h4>
          La información recopilada se utiliza para: Personalización del
          servicio: Mejorar y adaptar nuestros servicios según sus preferencias
          y necesidades.

          <h4 className={styles.titulo_}>
            4. No Compartimos Información con Terceros
          </h4>

          Nos comprometemos a no compartir su información personal con terceros
          bajo ninguna circunstancia, salvo que sea requerido por ley.

          <h4 className={styles.titulo_}>5. Derechos de los Usuarios</h4>
          Usted cuenta con todos los derechos previstos en la ley Argentina,
          incluyendo: Derecho de acceso: Puede solicitar información sobre los
          datos personales que tenemos sobre usted. Derecho de rectificación:
          Puede solicitar la corrección de cualquier dato inexacto o incompleto.
          Derecho de eliminación: Puede solicitar la eliminación de sus datos
          personales. Para ejercer estos derechos, puede contactarnos a través
          de ideaspararegalos@gmail.com.

          <h4 className={styles.titulo_}>6. Medidas de Seguridad</h4>
          La información personal se almacena en bases de datos protegidas con
          contraseñas. Solo los administradores de la página tienen acceso a
          estas bases de datos, garantizando la seguridad y confidencialidad de
          su información.

          <h4 className={styles.titulo_}>7. Política de Cookies</h4>
          Nuestro sitio web no utiliza cookies para recopilar información.

          <h4 className={styles.titulo_}>8. Enlaces a Otros Sitios</h4>
          No proporcionamos enlaces a otros sitios web. Su navegación se limita
          exclusivamente a nuestro sitio.

          <h4 className={styles.titulo_}>
            9. Actualizaciones de la Política de Privacidad
          </h4>
          Revisamos y actualizamos nuestras políticas de privacidad cada seis
          meses para asegurarnos de que cumplen con las normativas vigentes y
          proteger mejor su información.

          <h4 className={styles.titulo_}>10. Restricciones de Uso</h4>
          No hay restricciones de edad ni de otro tipo para el uso de nuestro
          sitio web.

          <h4 className={styles.titulo_}>11. Contacto</h4>
          Si tiene alguna pregunta sobre nuestras políticas de privacidad o
          desea ejercer alguno de sus derechos, por favor contáctenos en: Ideas
          para Regalos Correo electrónico: ideaspararegalos@gmail.com
        </p>

        <p>Agradecemos su confianza y le aseguramos que su privacidad es de máxima importancia para nosotros.</p>
      </div>
    </>
  );
}

export default PolicyPage;
