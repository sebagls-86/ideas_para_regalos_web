// import React, { useState } from "react";
// import Button from "../../components/button/Button";
// import ModalLogin from "../modalLogin/ModalLogin";
// import ModalRegister from "../modalRegister/ModalRegister";
// import styles from "./loginMobile.module.css";


// function LoginMobile() {
//   const [openModal, setOpenModal] = useState(false);
//   const [openRegisterModal, setOpenRegisterModal] = useState(false);
  
//   const openModalHandler = () => {
//     setOpenModal(true);
//     setOpenRegisterModal(false); // Asegurarse de que el modal de registro esté cerrado al abrir el de inicio de sesión
//   };

//   const openModalRegisterHandler = () => {
//     setOpenRegisterModal(true);
//     setOpenModal(false);
//   };

//   return (
//     <div className={styles.login__container}>
//       <Button
//         label="Registrarse"
//         className="btn primary__button"
//         onClick={openModalRegisterHandler}
//       />
//       <Button
//         label="Iniciar sesión"
//         className="btn primary__button-outline"
//         onClick={openModalHandler}
//       />
//       {openModal && <ModalLogin closeModal={() => setOpenModal(false)} />}
//       {openRegisterModal && (
//         <ModalRegister closeModal={() => setOpenRegisterModal(false)} />
//       )}
//     </div>
//   );
// }

// export default LoginMobile;


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