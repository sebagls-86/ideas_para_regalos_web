import React from "react";
import Links from "../../components/link/Links";
import styles from "./css/componentesPage.module.css"
import { Col, Container, Row } from "react-bootstrap";

function ComponentesPage(props) {
  return (
    <div className={styles.body}>
      <h1 className="text-center text-primary-dark py-5">Componentes</h1>
      <Container>
        <Row className="gap-2">
            <h2 className={styles.subtitulo}>Botones:</h2>
          <Col md={6} className="outline">
            <h3 className="text-secondary pb-3">Links:</h3>
            <div className="d-flex justify-content-around flex-column gap-3 flex-md-row">
              <Links title="Regalar" url="/componentess" type="primary"/>
              <Links title="Acceder" url="/componentes" type="secondary"/>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ComponentesPage;
