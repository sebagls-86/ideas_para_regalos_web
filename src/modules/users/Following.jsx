import React, { useState, useEffect } from "react";
import UserLogoName from "../../components/userLogoName/UserLogoName";
import Search from "../../components/search/Search";
import { Link } from "react-router-dom";
import styles from "./users.module.css"

function Following() {
  const [following, setFollowing] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const userId =
    (localStorage.getItem("userInfo") &&
      JSON.parse(localStorage.getItem("userInfo")).data.user_id) ||
    null;
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // Obtener usuarios seguidos
    fetch(`${API_URL}/relations/following/${userId}`)
      .then((response) => response.json())
      .then((data) => setFollowing(data.data || []))
      .catch((error) => console.error("Error fetching following:", error));

    // Obtener sugerencias de usuarios a seguir
    fetch(`${API_URL}/relations/suggestions/${userId}`)
      .then((response) => response.json())
      .then((data) => setSuggestions(data.data || []))
      .catch((error) => console.error("Error fetching suggestions:", error));
  }, [userId]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div>
      <div className={styles.search_bar}>
        <Search onSearch={handleSearch} />
      </div>
      {following.length > 0 ? (
        following
          .filter(
            (user) =>
              user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.user_name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((user) => (
            <Link to={`/perfil/${user.user_id}`}>
            <div className={styles.container_wrapper}>
              <div className={styles.container} key={user.user_id}>
                <UserLogoName
                  name={user.name}
                  userName={user.user_name}
                  logo={user.avatar}
                  to={`/perfil/${user.user_id}`}
                />
              </div>
            </div>
          </Link>
          ))
      ) : (
        <div>
          <p className={styles.alert_message}>
            Todavía no estás siguiendo a nadie.
          </p>
          <p className={styles.alert_message}>
            Aquí te damos algunas sugerencias:
          </p>
          {suggestions.map((user) => (
            <Link to={`/perfil/${user.user_id}`}>
              <div className={styles.container_wrapper}>
                <div className={styles.container} key={user.user_id}>
                  <UserLogoName
                    name={user.name}
                    userName={user.user_name}
                    logo={user.avatar}
                    to={`/perfil/${user.user_id}`}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Following;
