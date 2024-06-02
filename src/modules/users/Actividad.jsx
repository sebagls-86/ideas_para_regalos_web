import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import styles from './users.module.css'
import Messages from "./Messages";
import Forums from "./Forums";

function Actividad() {
  return (
    <div>
      <div className={styles.tabContainer}>
        <Tabs
          defaultActiveKey="foros"
          id="uncontrolled-tab-example"
          className={styles.tabContainer}
        >
          <Tab eventKey="foros" title="Publicaciones">
           <Forums/>
          </Tab>
          <Tab eventKey="mensajes" title="Comentarios">
           <Messages/>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Actividad;
