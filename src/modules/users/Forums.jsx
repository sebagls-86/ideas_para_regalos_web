import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from './users.module.css';
import jwtDecode from "jwt-decode";

function Forums() {
  const [forums, setForums] = useState([]);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.user_id;

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/relations/forums-activity/${userId}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.data)) {
          setForums(data.data);
        }})
      .catch(error => console.error("Error fetching forums:", error));
  }, [userId]);

  return (
    <div>
      <div className={styles.forumsContainer}>
        {forums.length > 0 ? (
          forums.map(forum => (
            <Link to={`/forums/${forum.forum_id}`} key={forum.forum_id} className={styles.forumLink}>
              <div className={styles.forum}>
                <h3>{forum.title}</h3>
                <p>{forum.description}</p>
                <p>Creado por: {forum.user_name}</p>
                <p>Fecha de creación: {forum.created_at}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No hay foros disponibles.</p>
        )}
      </div>
    </div>
  );
}

export default Forums;
