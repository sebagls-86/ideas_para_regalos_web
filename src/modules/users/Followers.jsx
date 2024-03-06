import React, { useState, useEffect } from "react";
import UserLogoName from "../../components/userLogoName/UserLogoName";
import Search from "../../components/search/Search";
import styles from './users.module.css'
import jwtDecode from "jwt-decode";

function Followers() {
  const [followers, setFollowers] = useState([]); // Estado para almacenar los seguidores
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.user_id;

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/relations/followers/${userId}`)
      .then(response => response.json())
      .then(data => setFollowers(data.data || [])) // Manejar la posibilidad de que llegue un array vacío
      .catch(error => console.error("Error fetching followers:", error));
  }, [userId]); // Agregar userId como dependencia para que el efecto se ejecute cada vez que userId cambie

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  }

  const filteredFollowers = followers.filter((follower) =>
    follower.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    follower.user_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div>
        <Search onSearch={handleSearch} />
      </div>
      {filteredFollowers.length > 0 ? (
        filteredFollowers.map((follower) => (
          <div className={styles.container} key={follower.user_id}>
            <UserLogoName
              name={follower.user_name}
              logo={follower.avatar}
              to={`/perfil/${follower.user_id}`}
            />
          </div>
        ))
      ) : (
        <p>Todavía no hay seguidores</p>
      )}
    </div>
  );
}

export default Followers;
