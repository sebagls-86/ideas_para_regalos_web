import React, { useState, useEffect } from "react";
import UserLogoName from "../../components/userLogoName/UserLogoName";
import Search from "../../components/search/Search";
import styles from "./users.module.css";
import { Link } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const userId =
    (localStorage.getItem("userInfo") &&
      JSON.parse(localStorage.getItem("userInfo")).data.user_id) ||
    null;
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/users/public`)
      .then((response) => response.json())
      .then((data) =>
        setUsers(
          data.data
            .filter((user) => user.user_id !== userId)
            .map((user) => ({
              ...user,
            }))
        )
      )
      .catch((error) => console.error("Error fetching users:", error));
  }, [userId]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.user_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div>
      <div className={styles.search_bar}>
        <Search onSearch={handleSearch} />
      </div>
      {filteredUsers.map((user) => {
        return (
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
        );
      })}
    </div>
  );
}

export default Users;
