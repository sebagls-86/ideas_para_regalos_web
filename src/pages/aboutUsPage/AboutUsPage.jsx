import React, { useEffect, useState } from "react";
import NavBar from "../../modules/navBar/NavBar";
import styles from "./aboutUsPage.module.css";
import { useAuth0 } from "@auth0/auth0-react";

import { Col } from "react-bootstrap";

function AboutUsPage() {
  const [tokenExists, setTokenExists] = useState(false);
  const { isAuthenticated } = useAuth0();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null && token !== undefined) {
      setTokenExists(true);
    }
  }, []);

  return (
    <>
      {!isAuthenticated && !tokenExists}
      <NavBar />
      <div className={styles.banner}></div>
      <Col className={styles.col_content}>
        <h1 className={styles.page_title}>Ideas para regalos</h1>
        <h5 className={styles.sub_title}>
          Ideas únicas para regalar momentos inolvidables
        </h5>
        <p>
          Tu comunidad en línea para descubrir y compartir sugerencias de
          regalos personalizadas.
          <br />
          Desde ideas clásicas hasta las más originales, estamos para ayudarte a
          encontrar el <br /> regalo perfecto para cualquier ocasión.
        </p>
      </Col>
    </>
  );
}

export default AboutUsPage;
