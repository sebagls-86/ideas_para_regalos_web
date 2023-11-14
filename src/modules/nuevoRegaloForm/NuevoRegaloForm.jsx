import Form from "react-bootstrap/Form";
import styles from "./nuevoRegaloForm.module.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import SelectEvent from "../selectEvent/SelectEvent";
import MyIcon from "../../components/myIcon/MyIcon";

function NuevoRegaloForm() {
  return (
    <>
      <style type="text/css">
        {`
     .nav-tabs {
      display: grid;display: grid;
      grid-template-columns: repeat(4, 1fr);
      width: 100%;
      min-height: 58px;
      align-items: center;
      justify-content: center;
     }   
    .navitem, .nav-tabs .nav-link{
     display: flex;
     width: 100%;
     height: 58px;
        align-items: center;
        justify-content: center;
        border-radius: 0px;
        border-right: 0.4px solid;
        border-bottom: 0.4px solid;
    }
  
    .nav-tabs .nav-link.active {
        font-weight: bold;
        background: var(--grey, #F2F4F5);
        border-right: 0.4px solid #000;
        border-bottom: 2px solid var(--primary-dark);
        
    }
    .nav-tabs .nav-link:hover{
        border-bottom: 0.4px solid #000;
        border-right: 0.4px solid #000;
    }
    .nav-tabs > li:nth-child(4) .nav-link {
      border-right: none;
      border-top-right-radius: 10px;
    }
    .nav-tabs > li:nth-child(1) .nav-link {
      border-top-left-radius: 10px;
    }
    @media only screen and (max-width: 1200px){
      .nav-tabs{
        margin-left: -20px;
        margin-right: -20px;
        width: calc(100% + 40px);
      }
    }
    

    `}
      </style>
      <div className={styles.formContainer}>
        <Tabs defaultActiveKey="publicar" id="uncontrolled-tab-example">
          <Tab
            eventKey="publicar"
            title={
              <span className={styles.span}>
                <MyIcon name="write" /> Post
              </span>
            }
          >
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  id="titulo"
                  className={styles.inputTitulo}
                  placeholder="Titulo"
                />
                <Form.Control
                  as="textarea"
                  aria-label="With textarea"
                  className={styles.inputTexto}
                  placeholder="Texto"
                />
              </Form.Group>
            </Form>
          </Tab>
          <Tab
            eventKey="calendario"
            title={
              <span className={styles.span}>
                <MyIcon name="calendar" /> Fecha
              </span>
            }
          >
            {/* <Sonnet /> */}
          </Tab>
          <Tab
            eventKey="evento"
            title={
              <span className={styles.span}>
                <MyIcon name="event" /> Evento
              </span>
            }
          >
            <SelectEvent></SelectEvent>
          </Tab>
          <Tab
            eventKey="imagen"
            title={
              <span className={styles.span}>
                <MyIcon name="image"className={styles.icon}/> Imagen
              </span>
            }
          >
            {/* <Sonnet /> */}
          </Tab>
        </Tabs>
        <div className={styles.btn_submit_cancel}>
          <Button variant="primary">Cancel</Button>
          <Button variant="primary" type="submit">
            Post
          </Button>
        </div>
      </div>
    </>
  );
}

export default NuevoRegaloForm;
