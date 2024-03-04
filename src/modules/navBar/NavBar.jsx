import React from "react";
import styles from "./navBar.module.css";
import { Link } from "react-router-dom";
import logoimg from "../../assets/logo_mascota_ipr.svg";
import logotext from "../../assets/logo_letras_ipr.svg";
import LoginMobile from "../loginMobile/LoginMobile";
import ModalLogin from "../modalLogin/ModalLogin";

function NavBar() {
  const [openModal, setOpenModal] = React.useState(false);
  const [tokenExists, setTokenExists] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setTokenExists(true);
    } else {
      setTokenExists(false);
    }
  }, []);

  const openModalHandler = () => {
    setOpenModal(true);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.nav__container}>
        <div className={styles.logo__container}>
          <Link to="/" >
          <img src={logoimg} alt="Logo ideas para regalos" />
          <img src={logotext} alt="Logo ideas para regalos" />
          </Link>
        </div>
        <div className={styles.ul__container}>
          <ul className={styles.links__container}>
            <li className={styles.li_items}>
              <Link to="/eventos" className={styles.links}>
                Eventos
              </Link>
            </li>
            <li>
              <Link to="/preguntasFrecuentes" className={styles.links}>
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/nosotros" className={styles.links}>
                Nosotros
              </Link>
            </li>
            {!tokenExists && (
              <li>
                <Link onClick={openModalHandler} className={styles.links}>
                  Iniciar sesión
                </Link>
              </li>
            )}

          </ul>
          <div className={styles.login__container}>
            {!tokenExists && <LoginMobile setOpenModal={setOpenModal} />}
          </div>
        </div>
      </div>
      {openModal && <ModalLogin closeModal={() => setOpenModal(false)} />}
    </nav>
  );
}

export default NavBar;
