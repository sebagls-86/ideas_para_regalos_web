import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/button/Button";
import { useAuth0 } from "@auth0/auth0-react";
import config from "../../auth_config.json";

function AsideLogin() {
  const [registerModal, setOpenRegisterModal] = useState(false);
  const { user, loginWithRedirect, getAccessTokenWithPopup } = useAuth0();
  const domain = config.domain;
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (user) {
      console.log("Realizando verificación...");
      verifyToken();
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      await loginWithRedirect({ appState: { returnTo: "/" } });
     } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const verifyToken = async () => {
    try {
      const accessToken = await getAccessTokenWithPopup({
        audience: `https://${domain}/api/v2/`,
        scope: "read:current_user",
      });

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({}),
      };

      const response = await fetch(
        `${API_URL}/verify`,
        requestOptions
      );

      if (response.ok) {
        console.log("Verificación exitosa");
      } else {
        console.error(
          "Error al realizar la verificación:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error al realizar la verificación:", error);
    }
  };

  if (!user)
    return (
      <>
        <div className="d-flex flex-column gap-3 mt-3">
          <Button
            label="Registrarse"
            className="btn primary__button"
            onClick={() => setOpenRegisterModal(true)}
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
