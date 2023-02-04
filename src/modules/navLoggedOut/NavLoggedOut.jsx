import React from "react";
import styles from "./navLoggedOut.module.css";
import { Link } from "react-router-dom";
import logoimg from "../../assets/logo_mascota_ipr.svg";
import logotext from "../../assets/logo_letras_ipr.svg";

function NavLoggedOut() {
  return (
    <nav className={styles.nav}>
      <div className={styles.nav__container}>
        <div className={styles.logo__container}>
          <img src={logoimg} alt="Logo ideas para regalos" />
          <img src={logotext} alt="Logo ideas para regalos" />
        </div>
        <div className={styles.ul__container}>
          <ul className={styles.links__container}>
            <li className={styles.li_items}>
              <Link to="/" className={styles.links}>Inicio</Link>
            </li>
            <li>
              <Link to="/explorar" className={styles.links}>Explorar</Link>
            </li>
            <li>
              <Link to="/eventos" className={styles.links}>Eventos</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavLoggedOut;
