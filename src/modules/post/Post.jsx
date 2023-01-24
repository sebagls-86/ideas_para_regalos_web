import React from "react";
import styles from "./css/post.module.css";
import { AiOutlineHeart, AiOutlineEllipsis } from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";
import { Link } from "react-router-dom";

function Post({
  id,
  name,
  userName,
  userImage,
  post_title,
  post_tags,
  post_description,
  post_images,
  post_likes,
  post_comments,
}) {
  console.log(post_likes);
  return (
    <div className={styles.post__container} key={id}>
      <div className={styles.container__image}>
        <img
          src={userImage}
          alt="imagen perfil usuario"
          width={"54px"}
          heingt={"54px"}
        />
      </div>
      <div className={styles.post__content}>
        <div className={styles.user__container}>
          <div className={styles.content__user}>
            <p className={styles.user__username}>{name}</p>
            <Link to={`/perfil/${userName}`} className={styles.user__tagname}>
              {userName}
            </Link>
            <p className={styles.user__timepost}>5h</p>
          </div>
          <div className={styles.more__actions}>
            <AiOutlineEllipsis />
          </div>
        </div>
        <h2 className={styles.post__title}>{post_title}</h2>
        <div className={styles.content__tags}>
          {post_tags.map((tag, index) => {
            return (
              <span className={styles.post_tags} key={index}>
                {tag}
              </span>
            );
          })}
        </div>
        <div>
          <p className={styles.post__text}>{post_description}</p>
          <div className={styles.post__images}>
            {post_images.map((img, index) => {
              return (
                <img
                  key={index}
                  src={img}
                  alt="Producto referencia"
                  width={"500px"}
                  height={"500px"}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.post__actions}>
          <div className={styles.actions__content}>
            <AiOutlineHeart />
            <span className={styles.post_tags}>{post_likes}</span>
          </div>
          <div className={styles.actions__content}>
            <FiMessageSquare />
            <span className={styles.post_tags}>{post_comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
