import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importar Link de react-router-dom
import styles from './users.module.css';

function Messages() {
  const [messages, setMessages] = useState([]);
  const userId = (localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")).data.user_id) || null;
  const API_URL = process.env.REACT_APP_API_URL;
  
  useEffect(() => {
    fetch(`${API_URL}/relations/messages-activity/${userId}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.data)) {
          setMessages(data.data);
        }})
      .catch(error => console.error("Error fetching messages:", error));
  }, [userId]);

  return (
    <div>
      <div className={styles.messagesContainer}>
        {messages.length > 0 ? (
          messages.map(message => (
            <Link to={`/forums/${message.forum_id}`} key={message.message_id} className={styles.messageLink}>
              <div className={styles.message}>
              <img src={message.avatar} alt={"avatar"} width="300" height="200"/>
                <p>{message.message}</p>
                <p>Enviado por: {message.user_name}</p>
                <p>Fecha de creación: {message.created_at}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className={styles.alert_message} >No hay mensajes disponibles.</p>
        )}
      </div>
    </div>
  );
}

export default Messages;
