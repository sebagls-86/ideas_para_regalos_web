import React from "react";
import logoimg from "../../../src/assets/buttons/logo.svg";
import NavLinks from "../../components/navLinks/NavLinks";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import styles from "./nav.module.css";
import ExploreIcon from "../../../src/assets/buttons/explore-icon.svg";
import EventIcon from "../../../src/assets/buttons/calendar-icon.svg";
import ActivityIcon from "../../../src/assets/buttons/activity-icon.svg";
import FaqIcon from "../../../src/assets/buttons/faq-icon.svg";
import AboutUsIcon from "../../../src/assets/buttons/about-icon.svg";
import Profile from "../../../src/assets/buttons/profile-icon.svg";
import SignOutIcon from "../../../src/assets/buttons/signout-icon.svg";

function Nav({ userData }) {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth0();
  const user_id =
    userData?.user_id ||
    (localStorage.getItem("userInfo") &&
      JSON.parse(localStorage.getItem("userInfo")).data.user_id) ||
    null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className={styles.nav__container}>
      <Link to="/" className={styles.nav__logo}>
        <img src={logoimg} alt="Logo ideas para regalos" />
      </Link>
      <ul className={styles.nav__ul}>
        <NavLinks
          url="/explorar"
          icon={
            <img src={ExploreIcon} alt="Explorar" className="fw-700 fs-3" />
          }
        />

        <NavLinks
          url="/eventos"
          icon={<img src={EventIcon} alt="Eventos" className="fw-700 fs-3" />}
        />
        {isAuthenticated && (
          <NavLinks
            url="/users"
            icon={
              <img src={ActivityIcon} alt="Actividad" className="fw-700 fs-3" />
            }
          />
        )}
        <NavLinks
          url="/preguntasFrecuentes"
          icon={
            <img
              src={FaqIcon}
              alt="Preguntas Frecuentes"
              className="fw-700 fs-3"
            />
          }
        />
        <NavLinks
          url="/nosotros"
          icon={
            <img src={AboutUsIcon} alt="Nosotros" className="fw-700 fs-3" />
          }
        />

        {isAuthenticated && (
          <NavLinks
            url={`/perfil/${user_id}`}
            icon={<img src={Profile} alt="Perfil" className="fw-700 fs-3" />}
          />
        )}
      </ul>

      <div className={styles.logout_icon}>
        {isAuthenticated ? (
          <img
            src={SignOutIcon}
            alt="Sign Out"
            onClick={() => {
              handleLogout();
              logout({ logoutParams: { returnTo: window.location.origin } });
            }}
            className="fw-700 fs-3"
            cursor="pointer"
          />
        ) : (
          <div className={styles.faux_logout} />
        )}
      </div>
    </nav>
  );
}

export default Nav;
