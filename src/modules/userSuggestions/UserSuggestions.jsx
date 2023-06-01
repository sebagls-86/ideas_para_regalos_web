import React from "react";
import styles from "./userSuggestions.module.css";
import UserLogoName from "../../components/userLogoName/UserLogoName";
import WordsEdge from '../../components/wordsEdges/WordsEdges'

function UserSuggestions() {
  const users = [
    {
      id: 1,
      name: "Marcos",
      userName: "@Marcos",
      userImage: "https://randomuser.me/api/portraits/men/33.jpg",
    },
    {
      id: 2,
      name: "Ani",
      userName: "@Ani",
      userImage: "https://randomuser.me/api/portraits/women/33.jpg",
    },
    {
      id: 3,
      name: "Horacio",
      userName: "@Horacio",
      userImage: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  ];

  return (
    <div className={styles.container}>
      <h6 className={styles.title}>Sugerencias</h6>
      <div className={styles.content}>
        {users.map((user) => {
          return (
            <div className={styles.content_element}>
              <UserLogoName
                key={user.id}
                name={user.userName}
                logo={user.userImage}
                to={`/perfil/${user.userName}`}
              />
             <WordsEdge to={`/perfil/${user.userName}`} label="Seguir"/>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserSuggestions;
