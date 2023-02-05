import React from "react";
import Button from "../../components/button/Button";

function Login() {
  return (
    <>
      <div className="d-flex flex-column gap-3 mt-3">
        <Button label="Registrarse" className="btn primary__button"/>
        <Button label="Iniciar sesión" className="btn primary__button-outline"/>
      </div>
    </>
  );
}

export default Login;
