import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/button/Button";
import ModalLogin from "../../modules/modalLogin/ModalLogin";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";

function AsideLogin() {
  const [openModal, setOpenModal] = useState(false);
  const [user] = useAuthState(auth);
  if (!user)
    return (
      <>
        <div className="d-flex flex-column gap-3 mt-3">
          <Button label="Registrarse" className="btn primary__button" />
          <Button
            label="Iniciar sesión"
            className="btn primary__button-outline"
            onClick={() => {
              console.log("Abriendo modal...");
              setOpenModal(true);
            }}
          />
          {openModal && <ModalLogin closeModal={() => setOpenModal(false)} />}
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
