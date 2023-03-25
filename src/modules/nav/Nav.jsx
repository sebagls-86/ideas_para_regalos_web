import React from "react";
import iprLogo from "../../assets/logo_mascota_ipr.svg";
import iprLetras from "../../assets/logo_letras_ipr.svg";
import { Link } from "react-router-dom";
import styles from './nav.module.css';

function Nav() {
  return (
    <nav className={styles.navContainer}>
      <div className="container">
        <div className="d-flex justify-content-between py-3">
          <div>
            <img src={iprLogo} alt="Ideas para regalos logo" />
            <img src={iprLetras} alt="Ideas para regalos letras" />
          </div>
          <div className="d-flex gap-5 align-items-center">
            <Link to="/" className={styles.navLink}>Inicio</Link>
            <Link to="/explorar" className={styles.navLink}>Explorar</Link>
            <Link to="/eventos" className={styles.navLink}>Eventos</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
