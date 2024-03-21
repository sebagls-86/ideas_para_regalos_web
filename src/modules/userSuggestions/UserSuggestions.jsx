import React, { useState, useEffect } from "react";
import styles from "./userSuggestions.module.css";
import UserLogoName from "../../components/userLogoName/UserLogoName";
import Button from "../../components/button/Button";
import { getCookie } from "../api/api";

function UserSuggestions({userInfo}) {
  const [users, setUsers] = useState(null);
  const [following, setFollowing] = useState({});

  const userId = userInfo?.user_id || (localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")).data.user_id) || null;

  useEffect(() => {
    const fetchData = async () => {
      let url = `http://localhost:8080/api/v1/relations/suggestions/${userId}`;
      const response = await fetch(url);
      const responseData = await response.json();
      if (responseData && responseData.data && responseData.data.length > 0) {
        const usersWithFixedAvatarURL = responseData.data.map(user => ({
          ...user,
        }));
        setUsers(usersWithFixedAvatarURL);
      } else {
        setUsers([]); 
      }
    };

    fetchData();
  }, [userInfo]);

  const handleFollow = async (relationId) => {
    const token = localStorage.getItem("token");
    if (token) {
      const url = "http://localhost:8080/api/v1/relations";
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id: userInfo.user_id, relation_id: relationId }),
      };
      const response = await fetch(url, requestOptions);
      if (response.ok) {
        setFollowing((prevState) => ({
          ...prevState,
          [relationId]: true,
        }));
      }
    }
  };

  return (
    <div className={styles.container}>
      <h6 className={styles.title}>Sugerencias</h6>
      <div className={styles.content}>
        {users === null ? (
          <p>No hay sugerencias por el momento</p>
        ) : users.length === 0 ? (
          <p>No hay sugerencias por el momento</p>
        ) : (
          users.map((user) => (
            <div className={styles.content_element} key={user.id}>
              <UserLogoName
                name={user.name}
                logo={user.avatar}
                to={`/perfil/${user.user_id}`}
              />
              <Button
                label={following[user.user_id] ? "Siguiendo" : "Seguir"}
                className="btn primary__button-outline"
                disabled={following[user.user_id]}
                onClick={() => handleFollow(user.user_id)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserSuggestions;
