import React from "react";
import styles from "./footer.module.css";
import { Link } from "react-router-dom";

function Footer({ style }) {
  return (
    <div className={styles.content}>
      <Link to="terminos" className={styles.link}>
        Términos y condiciones
      </Link>

      <Link to="privacidad-politica" className={styles.link}>
        Políticas de Privacidad
      </Link>
    </div>
  );
}
export default Footer;
