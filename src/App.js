import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function App() {
  return (
    <Container fluid >
    <h1>Test colores</h1>
      <Row>
        <Col className="p-5 m-5 text-light text-center">
        <a href="#" className="btn btn-primary-dark px-5">Boton 1</a>
        </Col>
        <Col className=" p-5 m-5 text-light text-center">
        <a href="#" className="btn btn-primary-dark px-5">Boton 2 con </a>
        </Col>
        <Col className=" p-5 m-5 text-light text-center">
        <a href="#" className="btn btn-outline-dark px-5">Boton 2 con </a>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
