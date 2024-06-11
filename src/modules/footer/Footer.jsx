import React from "react";
import styles from "./footer.module.css";
import { Link } from "react-router-dom";

function Footer({ style }) {
  const email = "contacto.ideaspararegalos@gmail.com";
  const subject = encodeURIComponent("Consulta");
  const body = encodeURIComponent(
    "¡Hola Ideas para Regalos! Me gustaría saber más sobre ..."
  );

  return (
    <div className={styles.content}>
      <Link to="terminos" className={styles.link}>
        Términos y <span className={styles.break}>condiciones</span>
      </Link>

      <Link to="privacidad-politica" className={styles.link}>
        Políticas de
        <span className={styles.break}> Privacidad</span>
      </Link>
      <div>
        <a
          className={styles.link}
          href={`mailto:${email}?subject=${subject}&body=${body}`}
        >
          Contacto
        </a>
      </div>
    </div>
  );
}
export default Footer;
