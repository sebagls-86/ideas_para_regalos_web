import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importar Link de react-router-dom
import styles from './css/likes.module.css';

function MessagesLikes() {
  const [messages, setMessages] = useState([]);

  const userId = (localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")).data.user_id) || null;

  useEffect(() => {
    fetch(` http://localhost:8080/api/v1/messages/likes/${userId}`)
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
                <p>{message.message}</p>
                <p>Enviado por: {message.user_name}</p>
                <p>Fecha de creación: {message.created_at}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No hay mensajes disponibles.</p>
        )}
      </div>
    </div>
  );
}

export default MessagesLikes;
