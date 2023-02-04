import React from "react";
import styles from "./googleLogin.module.css";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../../utils/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function GoogleLogin() {
  const googleProvider = new GoogleAuthProvider();

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button onClick={googleLogin} className={styles.google__button}>
      <FcGoogle className={styles.google__logo} />
      <h3 className={styles.google__text}>Continuar con Google</h3>
    </button>
  );
}

export default GoogleLogin;
