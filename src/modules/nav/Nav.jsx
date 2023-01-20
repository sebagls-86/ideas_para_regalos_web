import React from "react";
import logoimg from "../../assets/logoIdeasParaRegalos.png"
import NavLinks from "../../components/navLinks/NavLinks";
import { AiOutlineCompass, AiOutlineBell, AiOutlineHome, AiOutlineUser, AiOutlineCalendar } from "react-icons/ai";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="pt-3">
      <Link to="/">
        <img src={logoimg} alt="Logo ideas para regalos" />
      </Link>
      <ul className="mt-3">
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
          title="Perfil"
          url="/perfil"
          icon={<AiOutlineUser className="mr-3 fw-700 fs-3" />}
        />
        <NavLinks
          title="Eventos"
          url="/eventos"
          icon={<AiOutlineCalendar className="mr-3 fw-700 fs-3" />}
        />
      </ul>
    </div>
  );
}

export default Nav;
