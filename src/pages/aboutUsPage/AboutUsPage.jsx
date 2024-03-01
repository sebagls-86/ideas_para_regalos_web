import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import NavLoggedOut from "../../modules/navLoggedOut/NavLoggedOut";
import styles from "./aboutUsPage.module.css";

import { Col } from "react-bootstrap";

function AboutUsPage() {
  const [user] = useAuthState(auth);
  const [tokenExists, setTokenExists] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null && token !== undefined) {
      setTokenExists(true);
    }
  }, []);

  return (
    <>
      {!user && !tokenExists && <NavLoggedOut />}
      <div className={styles.banner}></div>
      <Col className={styles.col_content }>
        <h1 className={styles.page_title } >Ideas para regalos</h1>
        <h5  className={styles.sub_title } >Ideas únicas para regalar momentos inolvidables</h5>
        <p>
          Tu comunidad en línea para descubrir y compartir sugerencias de
          regalos personalizadas.<br/>
          Desde ideas clásicas hasta las más originales,
          estamos para ayudarte a encontrar el <br/> regalo perfecto para
          cualquier ocasión.
        </p>
      </Col>
    </>
  );
}

export default AboutUsPage;
