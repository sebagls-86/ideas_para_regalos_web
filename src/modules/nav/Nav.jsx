import React from "react";
import logoimg from "../../assets/logoIdeasParaRegalos.png"
import NavLinks from "../../components/navLinks/NavLinks";
import { AiOutlineCompass, AiOutlineBell, AiOutlineHome, AiOutlineUser, AiOutlineCalendar } from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "./css/nav.module.css"

function Nav() {
  return (
    <nav className={styles.nav__container}>
      <Link to="/" className={styles.nav__logo}>
        <img src={logoimg} alt="Logo ideas para regalos" />
      </Link>
      <ul className={styles.nav__ul}>
        <NavLinks
          title="Inicio"
          url="/"
          icon={<AiOutlineHome className="mr-3 fw-700 fs-3" />}
        />
        <NavLinks
          title="Explorar"
          url="/explorar"
          icon={<AiOutlineCompass className="mr-3 fw-700 fs-3" />}
        />
        <NavLinks
          title="Notificaciones"
          url="/notificaciones"
          icon={<AiOutlineBell className="mr-3 fw-700 fs-3" />}
        />
        <NavLinks
          title="Eventos"
          url="/eventos"
          icon={<AiOutlineCalendar className="mr-3 fw-700 fs-3" />}
        />
         <NavLinks
          title="Perfil"
          url="/perfil"
          icon={<AiOutlineUser className="mr-3 fw-700 fs-3" />}
        />
      </ul>
    </nav>
  );
}

export default Nav;
