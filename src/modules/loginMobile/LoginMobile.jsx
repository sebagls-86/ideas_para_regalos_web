import React, { useState } from "react";
import Button from "../../components/button/Button";
import ModalLogin from "../modalLogin/ModalLogin";
import styles from "./loginMobile.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";

function LoginMobile({ setOpenModal }) {

  const [user] = useAuthState(auth);

  const openModalHandler = () => {
      setOpenModal(true);
    };
  
  if (!user)
    return (
      <div className={styles.login__container}>
        <Button label="Registrarse" className="btn primary__button" />
        <Button
          label="Iniciar sesión"
          className="btn primary__button-outline"
          onClick={openModalHandler}
        />
        {<ModalLogin closeModal={setOpenModal} />}
      </div>
    );
}

export default LoginMobile;
