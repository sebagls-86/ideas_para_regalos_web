import React, { useState, useEffect } from "react";
import styles from "./css/post.module.css";
import { AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Post() {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/forums");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        if (response.ok && data.data === null) {
          setLoading(false);
        }
        const processedData = data.data.map((post) => ({ ...post }));
        setPostData(processedData);
        setLoading(false);

        if (response.status === 400) {
          navigate("/");
          setLoading(false);
          console.log("Error 400");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    {postData === null ? (
      <p>Todavía no hay publicaciones</p>
    ) : (
      postData.map((post) => (
        <div className={styles.post__container} key={post.forum_id}>
          <div className={styles.container__image}>
            <img
              src={`http://localhost:8080${post.avatar}`}
              alt="imagen perfil usuario"
              width={"54px"}
              height={"54px"}
            />
          </div>
          <div className={styles.post__content}>
            <div className={styles.user__container}>
              <div className={styles.content__user}>
                <p className={styles.user__username}>{post.name}</p>
                <Link
                  to={`/perfil/${parseInt(post.user_id)}`}
                  className={styles.user__tagname}
                >
                  {post.user_name}
                </Link>
                <p className={styles.user__timepost}>5h</p>
              </div>
            </div>
            <Link
            to={`/forums/${parseInt(post.forum_id)}`}>
            <h2 className={styles.post__title}>{post.title}</h2>
            <div className={styles.content__tags}>
              {post.event && (
                <span className={styles.post_tags}>{post.event}</span>
              )}
            </div>
            <div>
              <p className={styles.post__text}>{post.description}</p>
             </div>
            <div className={styles.post__actions}>
              <div className={styles.actions__content}>
                <AiOutlineHeart />
                <span className={styles.post_tags}>{post.likes}</span>
              </div>
              <div className={styles.actions__content}>
                <FiMessageSquare />
                <span className={styles.post_tags}>{post.messages.length}</span>
              </div>
            </div>
            </Link>
          </div>
        </div>
        ))
    )}
    </div>
  );
}

export default Post;
