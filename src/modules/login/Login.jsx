import React from "react";

function Login() {
  return (
    <>
      <h2 className="fz-15 fw-600 mt-2">Ingresá a tu cuenta</h2>
      <div className="d-flex flex-column flex-xl-row gap-2 mt-3">
        <button className="btn secondary__button">Registrarse</button>
        <button className="btn primary__button">Iniciar sesión</button>
      </div>
    </>
  );
}

export default Login;
