import React, { useState, useEffect } from "react";
import UserLogoName from "../../components/userLogoName/UserLogoName";
import Search from "../../components/search/Search";
import styles from "./users.module.css";
import { Link } from "react-router-dom";

function Followers() {
  const [followers, setFollowers] = useState([]); // Estado para almacenar los seguidores
  const [searchTerm, setSearchTerm] = useState("");
  const userId =
    (localStorage.getItem("userInfo") &&
      JSON.parse(localStorage.getItem("userInfo")).data.user_id) ||
    null;
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/relations/followers/${userId}`)
      .then((response) => response.json())
      .then((data) => setFollowers(data.data || [])) // Manejar la posibilidad de que llegue un array vacío
      .catch((error) => console.error("Error fetching followers:", error));
  }, [userId]); // Agregar userId como dependencia para que el efecto se ejecute cada vez que userId cambie

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const filteredFollowers = followers.filter(
    (follower) =>
      follower.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      follower.user_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className={styles.search_bar}>
        <Search onSearch={handleSearch} placeholder={"Buscar usuarios"}  />
      </div>
      {filteredFollowers.length > 0 ? (
        filteredFollowers.map((follower) => (
          <Link to={`/perfil/${follower.user_id}`}>
            <div className={styles.container_wrapper}>
              <div className={styles.container} key={follower.user_id}>
                <UserLogoName
                  name={follower.name}
                  userName={follower.user_name}
                  logo={follower.avatar}
                  to={`/perfil/${follower.user_id}`}
                />
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className={styles.alert_message}>Todavía no hay seguidores</p>
      )}
    </div>
  );
}

export default Followers;
