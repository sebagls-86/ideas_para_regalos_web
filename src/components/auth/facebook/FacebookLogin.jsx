import React from "react";
import styles from './facebookLogin.module.css'
import { BsFacebook } from "react-icons/bs";
import { signInWithPopup, FacebookAuthProvider, updateProfile } from "firebase/auth";
import { auth } from "../../../utils/firebase";

function FacebookLogin() {
  const facebookProvider = new FacebookAuthProvider();
  const facebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const credential = await FacebookAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      let photoUrl = result.user.photoURL + '?height=500&access_token=' + token
      console.log(photoUrl)
      await updateProfile(auth.currentUser, {photoURL: photoUrl })
      console.log(result.user);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button onClick={facebookLogin} className={styles.facebook__button}>
      <BsFacebook className={styles.facebook__logo} />
      <h3 className={styles.facebook__text}>Continuar con Facebook</h3>
      {/* <img src={userProfile.photoURL} alt="" /> */}
    </button>
  );
}

export default FacebookLogin;
