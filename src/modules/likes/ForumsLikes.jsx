import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./css/likes.module.css";

function ForumsLikes() {
  const [forums, setForums] = useState([]);
  const userId =
    (localStorage.getItem("userInfo") &&
      JSON.parse(localStorage.getItem("userInfo")).data.user_id) ||
    null;
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/forums/likes/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setForums(data.data);
        }
      })
      .catch((error) => console.error("Error fetching forums:", error));
  }, [userId]);

  return (
    <div>
      <div className={styles.forumsContainer}>
        {forums === null || forums.length === 0 ? (
          <p>No hay foros disponibles.</p>
        ) : (
          forums.map((forum) => (
            <Link
              to={`/forums/${forum.forum_id}`}
              key={forum.forum_id}
              className={styles.forumLink}
            >
              <div className={styles.forum}>
                <div className={styles.forum_user_info}>
                  <img
                    src={forum.avatar}
                    alt={"avatar"}
                    width="54"
                    height="54"
                  />
               
                <div>
                  <p>@{forum.user_owner}</p>
                </div>
                </div>
                <div  className={styles.forum_text }>
                <h3>{forum.title}</h3>
                <p>{forum.description}</p>

                <p>Fecha de creación: {forum.created_at}</p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default ForumsLikes;
