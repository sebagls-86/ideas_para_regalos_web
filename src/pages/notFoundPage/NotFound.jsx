import React from "react";
import { Link } from "react-router-dom";
import styles from "./notFound.module.css";
import astronaut from "../../utils/images/lost-astronaut.jpeg";

const NotFoundPage = () => {
  return (
    <div className={styles["page-container"]}>
      <div className={styles.container}>
      <h1>¡Oops!</h1>
      <p className={styles.text}>¡Parece que te perdiste en el espacio sideral!</p>
      {astronaut && <img src={astronaut} alt="astronaut" className={styles.astronaut} />}
      <p className={styles.text}>¡No te preocupes, te dejaremos volver a la Tierra!</p>
      <Link to="/" className={styles.link}>Volver al inicio</Link>
    </div>
    </div>
  );
}

export default NotFoundPage;
