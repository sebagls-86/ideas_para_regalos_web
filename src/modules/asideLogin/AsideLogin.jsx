import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/button/Button";
import { useAuth0 } from "@auth0/auth0-react";
import config from "../../auth_config.json";

function AsideLogin() {
  const { user, loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    try {
      await loginWithRedirect({ appState: { returnTo: "/" } });
     } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const handleRegister = async () => {
    try {
      await loginWithRedirect({ appState: { returnTo: "/" }, authorizationParams:{screen_hint: "signup"} });
     } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  if (!user)
    return (
      <>
        <div className="d-flex flex-column gap-3 mt-3">
          <Button
            label="Registrarse"
            className="btn primary__button"
            onClick={() => handleRegister()}
          />
          <Button
            label="Iniciar sesión"
            className="btn primary__button-outline"
            onClick={() => handleLogin()}
          />
         </div>
        <div className="d-flex justify-content-center align-items-center gap-5 flex-column flex-xl-row mt-5">
          <Link to="/ayuda" className="fz-17">
            Ayuda
          </Link>
          <Link to="/contacto" className="fz-17">
            Contacto
          </Link>
          <Link to="/nosotros" className="fz-17">
            Nosotros
          </Link>
        </div>
      </>
    );
}

export default AsideLogin;
