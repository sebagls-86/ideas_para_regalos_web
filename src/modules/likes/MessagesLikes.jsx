import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importar Link de react-router-dom
import styles from "./css/likes.module.css";

function MessagesLikes() {
  const [messages, setMessages] = useState([]);
  const userId =
    (localStorage.getItem("userInfo") &&
      JSON.parse(localStorage.getItem("userInfo")).data.user_id) ||
    null;
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(` ${API_URL}/messages/likes/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setMessages(data.data);
        }
      })
      .catch((error) => console.error("Error fetching messages:", error));
  }, [userId]);

  return (
    <div>
      <div className={styles.messagesContainer}>
        {messages.length > 0 ? (
          messages.map((message) => (
            <Link
              to={`/forums/${message.forum_id}`}
              key={message.message_id}
              className={styles.messageLink}
            >
              <div className={styles.message}>
                <div className={styles.forum_user_info}>
                  <img
                    src={message.avatar}
                    alt={"avatar"}
                    width="54"
                    height="54"
                  />
                  <div>
                    <p className="user__name">{message.name}</p>
                    <p className="user__tagname">@{message.user_owner}</p>
                  </div>
                </div>

                <div className={styles.forum_text}>
                  <p>{message.message}</p>

                  <p className={styles.post_date}>{message.created_at}</p>
                </div>
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
