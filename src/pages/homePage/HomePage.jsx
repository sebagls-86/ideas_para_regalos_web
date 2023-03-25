import React from "react";
import { Col } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import Nav from "../../modules/nav/Nav";
import { Link } from "react-router-dom";
import Foros from "../../modules/foros/Foros";

function HomePage(props) {
  const [user] = useAuthState(auth);

  return (
    <>
      <div>
        <Nav />
      </div>
      <Link to={"/"}>
        <img
          src={require("../../assets/homeBanner.png")}
          alt=""
          className="img-fluid"
        />
      </Link>
      <div className="d-flex">
        <Col xs="1" className="d-none d-lg-flex blue">
          nav logueado
        </Col>
        <Col xs="12" lg="8" className="mt-2">
          <div className="container mt-3">
            <h1 className="fz-28 fw-700 mb-4">Ideas Populares</h1>
            <Foros/>
          </div>
        </Col>
        <Col xs="3" className="d-none d-lg-flex green">
          aside
        </Col>
      </div>
    </>
  );
}

export default HomePage;
