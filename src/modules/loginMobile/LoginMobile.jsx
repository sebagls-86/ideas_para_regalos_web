import React, { useState } from "react";
import Button from "../../components/button/Button";
import ModalLogin from "../modalLogin/ModalLogin";
import styles from "./loginMobile.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";

function LoginMobile() {
  const [openModal, setOpenModal] = useState(false);
  const [user] = useAuthState(auth);
  if (!user)
    return (
      <div className={styles.login__container}>
        <Button label="Registrarse" className="btn primary__button" />
        <Button
          label="Iniciar sesión"
          className="btn primary__button-outline"
          onClick={() => setOpenModal(true)}
        />
        {openModal && <ModalLogin closeModal={setOpenModal} />}
      </div>
    );
}

export default LoginMobile;
