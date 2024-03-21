import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Button from "../../components/button/Button";

const LoginMobile = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button
          label="Iniciar sesión"
          className="btn primary__button-outline"
          onClick={() => loginWithRedirect()}
        />

};

export default LoginMobile;