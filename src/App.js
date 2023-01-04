import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function App() {
  return (
    <Container fluid>
      <Row>
        <Col className="bg-danger p-5 m-5 text-light text-center">Ideas Para Regalos</Col>
      </Row>
    </Container>
  );
}

export default App;
