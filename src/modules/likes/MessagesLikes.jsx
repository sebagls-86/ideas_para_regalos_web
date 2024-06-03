import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"; // Importar Link de react-router-dom
import styles from "./css/likes.module.css";

function MessagesLikes() {
  const [messages, setMessages] = useState([]);
  const { user_id } = useParams();
  const userId = parseInt(user_id);
  const tokenUserId =
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

  const formatDate = (date) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(date).toLocaleDateString("es-ES", options);
  };

  const calculateTimeDifference = (created_at) => {
    const createdDate = new Date(created_at);
    const currentDate = new Date();
    const timeDifference = (currentDate - createdDate) / (1000 * 60 * 60); // Diferencia en horas

    if (timeDifference < 24) {
      const hours = Math.round(timeDifference);
      return `Creado hace ${hours} hora${hours !== 1 ? "s" : ""}`;
    } else {
      return `Creado el: ${formatDate(created_at)}`;
    }
  };


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
            <p className={styles.post_date}>
              {calculateTimeDifference(message.created_at)}
            </p>
          </div>
        </div>
      </Link>
    ))
  ) : (
    tokenUserId === userId ? (
      <p className="m-4">Todavía no diste 'me gusta' a ningún comentario.</p>
    ) : (
      <p className="m-4">Este usuario todavía no le dio 'me gusta' a ningún comentario.</p>
    )
  )}
</div>
    </div>
  );
}

export default MessagesLikes;
