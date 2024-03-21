import React, { useState, useEffect } from "react";
import UserLogoName from "../../components/userLogoName/UserLogoName";
import Search from "../../components/search/Search";
import styles from './users.module.css'

function Following() {
  const [following, setFollowing] = useState([]); // Estado para almacenar los usuarios seguidos
  const [suggestions, setSuggestions] = useState([]); // Estado para almacenar sugerencias de usuarios a seguir
  const [searchTerm, setSearchTerm] = useState("");
  
  const userId = (localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")).data.user_id) || null;
  

  useEffect(() => {
    // Obtener usuarios seguidos
    fetch(`http://localhost:8080/api/v1/relations/following/${userId}`)
      .then(response => response.json())
      .then(data => setFollowing(data.data || []))
      .catch(error => console.error("Error fetching following:", error));

    // Obtener sugerencias de usuarios a seguir
    fetch(`http://localhost:8080/api/v1/relations/suggestions/${userId}`)
      .then(response => response.json())
      .then(data => setSuggestions(data.data || []))
      .catch(error => console.error("Error fetching suggestions:", error));
  }, [userId]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  }

  return (
    <div>
      <div>
        <Search onSearch={handleSearch} />
      </div>
      {following.length > 0 ? (
        following.filter((user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.user_name.toLowerCase().includes(searchTerm.toLowerCase())
        ).map((user) => (
          <div className={styles.container} key={user.user_id}>
            <UserLogoName
              name={user.user_name}
              logo={user.avatar}
              to={`/perfil/${user.user_id}`}
            />
          </div>
        ))
      ) : (
        <div>
          <p>Todavía no estás siguiendo a nadie.</p>
          <p>Aquí te damos algunas sugerencias:</p>
          {suggestions.map((user) => (
            <div className={styles.container} key={user.user_id}>
              <UserLogoName
                name={user.user_name}
                logo={user.avatar}
                to={`/perfil/${user.user_id}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Following;
