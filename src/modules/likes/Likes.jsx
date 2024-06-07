import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import styles from './css/likes.module.css'
import MessagesLikes from "./MessagesLikes";
import ForumsLikes from "./ForumsLikes";

function Likes() {
  return (
    <div>
      <div className={styles.tabContainer}>
        <Tabs
          defaultActiveKey="foros"
          id="uncontrolled-tab-example"
          className={styles.notificacionNav}
        >
          <Tab eventKey="foros" title="Publicaciones">
           <ForumsLikes/>
          </Tab>
          <Tab eventKey="mensajes" title="Comentarios">
           <MessagesLikes/>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Likes;
