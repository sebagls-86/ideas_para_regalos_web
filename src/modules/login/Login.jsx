import React from "react";
import Links from "../../components/link/Links";

function Login() {
  return (
    <>
      <h2 className="fz-15 fw-600 mt-2">Ingresá a tu cuenta</h2>
      <div className="d-flex flex-column flex-xl-row gap-2 mt-3">
        <Links title="Registrarse" url="/componentess" type="primary" />
        <Links title="Iniciar sesión" url="/componentes" type="secondary" />
      </div>
    </>
  );
}

export default Login;
