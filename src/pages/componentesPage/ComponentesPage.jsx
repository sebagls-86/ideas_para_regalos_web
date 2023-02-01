import React, {useState} from "react";
import styles from "./css/componentesPage.module.css"
import { Col, Container, Row } from "react-bootstrap";
import Modal from "../../components/modal/Modal";

function ComponentesPage() {

  const [openModal, setOpenModal] = useState(false) 

  return (
    <div className={styles.body}>
      <h1 className="text-center text-primary-dark py-5">Componentes</h1>
      <Container>
        {/* <Row className="gap-2">
            <h2 className={styles.subtitulo}>Botones:</h2>
          <Col md={6} className="outline">
            <h3 className="text-secondary pb-3">Links:</h3>
            <div className="d-flex justify-content-around flex-column gap-3 flex-md-row">
              <Links title="Regalar" url="/componentess" type="primary"/>
              <Links title="Acceder" url="/componentes" type="secondary"/>
            </div>
          </Col>
        </Row> */}
        <Row>
          <Col>
            <button onClick={() => setOpenModal(true)}>Modal</button>
            {openModal && <Modal closeModal = {setOpenModal} />}
            
          </Col>
        </Row>
      </Container>

    </div>
  );
}

export default ComponentesPage;
