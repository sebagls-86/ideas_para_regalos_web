import React from "react";
import PrimaryButton from "../../components/primaryButton/PrimaryButton";
import SecondaryButton from "../../components/secondaryButton/SecondaryButton";
import PropTypes from "prop-types";
import { Col, Container, Row } from "react-bootstrap";

function ComponentesPage(props) {
  return (
    <div>
      <h1 className="text-center text-primary mt-5">Componentes</h1>
      <Container>
        <Row className="gap-2">
          <Col className="outline">
            <h2 className="text-secondary">PrimaryButton</h2>
            <div className="d-flex justify-content-around flex-column gap-3 flex-md-row">
              <PrimaryButton titulo="Regalar" url={"/componentes"} />
              <PrimaryButton titulo="Acceder" url={"/componentes"} />
            </div>
          </Col>
          <Col className="outline">
            <h2 className="text-secondary">SecondaryButton</h2>
            <div className="d-flex justify-content-around flex-column gap-3 flex-md-row">
              <SecondaryButton titulo="Regalar" url={"/componentes"} />
              <SecondaryButton titulo="Acceder" url={"/componentes"} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

ComponentesPage.propTypes = {};

export default ComponentesPage;
