import React from "react";
import logoimg from "../../assets/logoIdeasParaRegalos.png";
import styles from "./css/post.module.css";

function Post() {
  return (
    <div className={styles.post__container}>
      <div className={styles.container__logo}>
        <img src={logoimg} alt="Logo ideas para regalos" />
      </div>
      <div className={styles.post__content}>
        <div className={styles.user__container}>
          <div className={styles.content__user}>
            <p className={styles.user__username}>Username</p>
            <p className={styles.user__tagname}>@Username</p>
            <p className={styles.user__timepost}>5h</p>
          </div>
          <div className={styles.more__actions}>. . .</div>
        </div>
      </div>
    </div>
  );
}

export default Post;
