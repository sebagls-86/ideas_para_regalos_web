import React from 'react'
import styles from './css/navLoggedOut.module.css'
import { Link } from "react-router-dom";
import Login from '../login/Login';
import logoimg from "../../assets/logoIdeasParaRegalos.png"

function NavLoggedOut() {
  return (
    <nav className={styles.nav__container}>
    
      <ul className={styles.nav__ul}>
        <div className={styles.container__logo}><Link to="/" className={styles.nav__logo}>
        <img src={logoimg} alt="Logo ideas para regalos" />
      </Link></div>
      
      <div className={styles.container__links}>
        <Link to= "/">
          Inicio
          </Link>
          <Link to= "/">
          Explorar
          </Link>
          <Link to= "/">
          Eventos
          </Link>
          <button className="btn secondary__button">Registrarse</button>
        <button className="btn primary__button">Iniciar Sesión</button>
        </div>
      </ul>
    </nav>
    
  )
}

export default NavLoggedOut