import React from "react";
import logoimg from "../../assets/logoIdeasParaRegalos.png";
import crearPost from "../../assets/crear__post__nav.svg";
import NavLinks from "../../components/navLinks/NavLinks";
import {
  AiOutlineCompass,
  AiOutlineBell,
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineCalendar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "./nav.module.css";

function Nav({user}) {
  return (
    <nav className={styles.nav__container}>
      <Link to="/" className={styles.nav__logo}>
        <img src={logoimg} alt="Logo ideas para regalos" />
      </Link>
      <ul className={styles.nav__ul}>
        <NavLinks url="/" icon={<AiOutlineHome className="fw-700 fs-3" />} />
        <NavLinks
          url="/explorar"
          icon={<AiOutlineCompass className="fw-700 fs-3" />}
        />
        <NavLinks
          url="/notificaciones"
          icon={<AiOutlineBell className=" fw-700 fs-3" />}
        />
        <NavLinks
          url="/eventos"
          icon={<AiOutlineCalendar className=" fw-700 fs-3" />}
        />
        <NavLinks
          url={`/perfil/@${user}`}
          icon={<AiOutlineUser className="fw-700 fs-3" />}
        />
      </ul>
      <Link to="/nuevoRegalo" className={styles.nav__publicar}>
        <img src={crearPost} alt="Crear publicación" />
      </Link>
    </nav>
  );
}

export default Nav;
