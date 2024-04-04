import React from "react";
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

function Nav({ userData}) {

  const navigate = useNavigate();
  const { logout } = useAuth0();
  const user_id = userData?.user_id || (localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")).data.user_id) || null;


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo")
    navigate("/");
    window.location.reload();
  };
  
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
          url={`/perfil/${user_id}`}
          icon={<AiOutlineUser className="fw-700 fs-3" />}
        />
      </ul>
      <Link to="/nuevoRegalo" className={styles.nav__publicar}>
        <img src={crearPost} alt="Crear publicación" />
      </Link>
      <div className={styles.logout_icon}>
        <icon onClick={() => {
          handleLogout();
          logout({ logoutParams: { returnTo: window.location.origin } });
        }} className="fw-700 fs-3" cursor="pointer">
          <AiOutlineLogout className="fw-700 fs-3" />
        </icon>
      </div>
    </nav>
  );
}

export default Nav;
