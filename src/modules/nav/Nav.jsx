import React, { useState, useEffect } from "react";
import logoimg from "../../assets/logoIdeasParaRegalos.png";
import crearPost from "../../assets/crear__post__nav.svg";
import NavLinks from "../../components/navLinks/NavLinks";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  AiOutlineCompass,
  AiOutlineUsergroupAdd,
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineCalendar,
  AiOutlineLogout,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "./nav.module.css";
import jwtDecode from "jwt-decode";

function Nav() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth0();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserData(decoded);
    }
  }, []);

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
          url="/users"
          icon={<AiOutlineUsergroupAdd className=" fw-700 fs-3" />}
        />
        <NavLinks
          url="/eventos"
          icon={<AiOutlineCalendar className=" fw-700 fs-3" />}
        />
        <NavLinks
          url={`/perfil/${userData?.user_id}`}
          icon={<AiOutlineUser className="fw-700 fs-3" />}
        />
      </ul>
      <Link to="/nuevoRegalo" className={styles.nav__publicar}>
        <img src={crearPost} alt="Crear publicación" />
      </Link>
      <div className={styles.logout_icon}>
        <icon onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} className="fw-700 fs-3" cursor="pointer">
          <AiOutlineLogout className="fw-700 fs-3" />
        </icon>
      </div>
    </nav>
  );
}

export default Nav;
