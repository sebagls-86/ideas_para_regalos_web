import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./users.module.css";

function Forums() {
  const [forums, setForums] = useState([]);
  const userId =
    (localStorage.getItem("userInfo") &&
      JSON.parse(localStorage.getItem("userInfo")).data.user_id) ||
    null;
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/relations/forums-activity/${userId}`)
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
        {forums.length > 0 ? (
          forums.map((forum) => (
            <Link
              to={`/forums/${forum.forum_id}`}
              key={forum.forum_id}
              className={styles.forumLink}
            >
              <div className={styles.forum}>
                <div className={styles.forum_user_info}>
                  <div>
                    <img
                      src={forum.avatar}
                      alt={"avatar"}
                      width="54"
                      height="54"
                    />
                  </div>
                  <div>
                    <p className={styles.name}> {forum.name}</p>
                    <p> @{forum.user_name}</p>
                  </div>
                </div>
                <div  className={styles.forum_text }>
                  <p>{forum.title}</p>
                  <p>{forum.description}</p>

                  <p>Fecha de creación: {forum.created_at}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className={styles.alert_message}>No hay foros disponibles.</p>
        )}
      </div>
    </div>
  );
}

export default Forums;
