import React from "react";
import styles from "./css/post.module.css";
import { AiOutlineHeart, AiOutlineEllipsis } from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";

function Post() {
  return (
    <div className={styles.post__container}>
      <div className={styles.container__image}>
        <img
          src={"https://randomuser.me/api/portraits/women/1.jpg"}
          alt="imagen perfil usuario"
          width={"54px"}
          heingt={"54px"}
        />
      </div>
      <div className={styles.post__content}>
        <div className={styles.user__container}>
          <div className={styles.content__user}>
            <p className={styles.user__username}>Username</p>
            <p className={styles.user__tagname}>@Username</p>
            <p className={styles.user__timepost}>5h</p>
          </div>
          <div className={styles.more__actions}>
            <AiOutlineEllipsis />
          </div>
        </div>
        <h2 className={styles.post__title}>Regalo de navidad para Mica</h2>
        <div className={styles.content__tags}>
          <span className={styles.post_tags}>cerámica</span>{" "}
          <span className={styles.post_tags}>minimalista</span>{" "}
          <span className={styles.post_tags}>café</span>
        </div>
        <div >
          <p className={styles.post__text}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo nisi
            ullam inventore veritatis facere. Nemo, odit! Eligendi ullam
            praesentium, atque, optio totam libero assumenda qui explicabo nemo
            eum est perspiciatis?
          </p>
          <div className={styles.post__images}>

          <img
            src={"https://random.imagecdn.app/500/500"}
            alt="Producto referencia"
            width={'500px'}
            height={'500px'}
          />
          <img
            src={"https://random.imagecdn.app/500/500"}
            alt="Producto referencia"
            width={'500px'}
            height={'500px'}
          />
          </div>
        </div>
        <div className={styles.post__actions}>
          <div className={styles.actions__content}>
            <AiOutlineHeart />
            <span className={styles.post_tags}>9</span>
          </div>
          <div className={styles.actions__content}>
            <FiMessageSquare />
            <span className={styles.post_tags}>33</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
