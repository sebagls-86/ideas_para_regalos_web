import React from "react";
import UserLogoName from "../../components/userLogoName/UserLogoName";
import styles from './notificationAll.module.css'
//TODO: haer logica de ideas para regalos notificaciones
function NotificationAll() {
  const notifications = [
    {
      id: 1,
      name: "Marcos",
      userName: "@Marcos",
      userImage: "https://randomuser.me/api/portraits/men/33.jpg",
      notification: "¡Contanos cómo fue tu regalo!",
      time: "1h"
    },
    {
      id: 2,
      name: "Ani",
      userName: "@Ani",
      userImage: "https://randomuser.me/api/portraits/women/33.jpg",
      notification: "¡Contanos cómo fue tu regalo!",
      time: "1h"
    },
    {
      id: 3,
      name: "Horacio",
      userName: "@Horacio",
      userImage: "https://randomuser.me/api/portraits/men/32.jpg",
      notification: "¡Contanos cómo fue tu regalo!",
      time: "1h"
    }
  ];
  return (
    <div>
      {notifications.map((notification) => {
        return (
          <div className={styles.container}>
            <UserLogoName
              key={notification.id}
              name={notification.userName}
              logo={notification.userImage}
              to={`/perfil/${notification.userName}`}
            />
            <p>{notification.notification}</p>
            <span className={styles.time}>{notification.time}</span>
          </div>
        );
      })}
      <UserLogoName />
    </div>
  );
}

export default NotificationAll;
