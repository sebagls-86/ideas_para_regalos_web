import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/button/Button";
import ModalLogin from "../../modules/modalLogin/ModalLogin";
import ModalRegister from "../modalRegister/ModalRegister"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import { useAuth0 } from "@auth0/auth0-react";


function AsideLogin() {
  const [openModal, setOpenModal] = useState(false);
  const [registerModal, setOpenRegisterModal] = useState(false)
  const [user] = useAuthState(auth);
  const { loginWithRedirect } = useAuth0();

  console.log("registerModal", registerModal)
  if (!user)
    return (
      <>
        <div className="d-flex flex-column gap-3 mt-3">
         <Button
            label="Registrarse"
            className="btn primary__button"
            onClick={() => loginWithRedirect()}
          />
          <Button
            label="Iniciar sesión"
            className="btn primary__button-outline"
            onClick={() => loginWithRedirect()}
          />
          {openModal && <ModalLogin closeModal={() => setOpenModal(false)} />}
          {registerModal && <ModalRegister closeModal={() => setOpenRegisterModal(false)} />}
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
