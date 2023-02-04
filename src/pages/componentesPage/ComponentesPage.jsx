import React, { useState } from "react";
import styles from "./css/componentesPage.module.css";
import { Col, Container, Row } from "react-bootstrap";
import ModalLogin from "../../modules/modalLogin/ModalLogin";
import Button from "../../components/button/Button";
import NavLoggedOut from "../../modules/navLoggedOut/NavLoggedOut";
function ComponentesPage() {

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className={styles.body}>
      <h1 className="text-center text-primary-dark py-5">Componentes</h1>
      <Container>
        <Row>
          <Col>
            <h2 className={styles.subtitulo}>Botones:</h2>
            <div className="d-flex flex-column gap-2 pt-3">
              <Col sm={6}>
                <Button
                  label={"primary__button"}
                  className="btn primary__button"
                />
              </Col>
              <Col sm={6}>
                <Button
                  label={"primary__button-outline"}
                  className="btn primary__button-outline"
                />
              </Col>
              <Col sm={6}>
                <Button
                  label={"secondary__button-outline "}
                  className="btn secondary__button-outline"
                />
              </Col>
              <Col sm={6}>
                <Button
                  label={"secondary__button-outline variante "}
                  className="btn color--green"
                />
              </Col>
            </div>
          </Col>
        </Row>
        <Row className="mt-3">
          <h2 className={styles.subtitulo}>Modal:</h2>
          <Col sm={6} className="pt-3">
            <Button label="Open Modal" className="btn primary__button" onClick={() => setOpenModal(true)}/>
            {openModal && <ModalLogin closeModal={setOpenModal} />}
          </Col>
        </Row>
      </Container>


      <Row className="mt-3">
      <h2 className={styles.subtitulo}>Nav no logueado:</h2>
          <NavLoggedOut/>
        </Row>
    </div>
  );
}

export default ComponentesPage;
