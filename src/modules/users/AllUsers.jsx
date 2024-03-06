import React, { useState, useEffect } from "react";
import UserLogoName from "../../components/userLogoName/UserLogoName";
import Search from "../../components/search/Search";
import styles from './users.module.css'
import jwtDecode from "jwt-decode";

function Users() {
  const [users, setUsers] = useState([]); // Estado para almacenar los datos de los usuarios
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.user_id;

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/users/public")
      .then(response => response.json())
      .then(data => setUsers(data.data
        .filter(user => user.user_id !== userId) // Filtrar los usuarios para excluir aquellos cuyo user_id coincide con el userId
        .map(user => ({
          ...user,
          avatar: `http://localhost:8080${user.avatar}` // Agregar http://localhost:8080 a las rutas de los avatares
        }))
      ))
      .catch(error => console.error("Error fetching users:", error));
  }, [userId]); // Agregar userId como dependencia para que el efecto se ejecute cada vez que userId cambie

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.user_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  }

  return (
    <div>
      <div>
        <Search onSearch={handleSearch} />
      </div>
      {filteredUsers.map((user) => {
        return (
          <div className={styles.container} key={user.user_id}>
            <UserLogoName
              name={user.user_name}
              logo={user.avatar}
              to={`/perfil/${user.user_id}`}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Users;
