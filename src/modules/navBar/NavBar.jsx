import React from "react";
import styles from "./navBar.module.css";
import { Link } from "react-router-dom";
import logoimg from "../../assets/buttons/logo.svg";
import { useAuth0 } from "@auth0/auth0-react";

function NavBar() {
  const [tokenExists, setTokenExists] = React.useState(false);
  const { isAuthenticated } = useAuth0();
  const { loginWithRedirect } = useAuth0();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setTokenExists(true);
    } else {
      setTokenExists(false);
    }
  }, []);

 

  return (
    <nav className={styles.nav}>
      <div className={styles.nav__container}>
        <div className={styles.logo__container}>
          <Link to="/" >
          <img src={logoimg} alt="Logo ideas para regalos" />
          </Link>
        </div>
        <div className={styles.ul__container}>
          <ul className={styles.links__container}>
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
             {!tokenExists && !isAuthenticated &&(
              <li>
                   
                <Link onClick={() => loginWithRedirect({appState: {returnTo: "/"}})} className={styles.links}>
                  Iniciar sesión
                </Link>
              </li>
            )}

          </ul>
          <div className={styles.login__container}>
          
          </div>
        </div>
      </div>
     </nav>
  );
}

export default NavBar;
