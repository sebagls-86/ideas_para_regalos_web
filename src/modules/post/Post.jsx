import React, { useState, useEffect } from "react";
import styles from "./css/post.module.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import CommentIcon from "../../assets/comment-icon.svg";

function Post({ searchTerm }) {
  const [postData, setPostData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [likesData, setLikesData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId =
    (localStorage.getItem("userInfo") &&
      JSON.parse(localStorage.getItem("userInfo")).data.user_id) ||
    null;
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/forums`);
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
        }

        const likesResponse = await fetch(`${API_URL}/forums/likes/${userId}`);
        if (!likesResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const likesData = await likesResponse.json();
        setLikesData(likesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId, navigate]);

  const handleLike = async (postId) => {
    if (isLoggedIn) {
      try {
        const updatedLikesData = await fetch(
          `${API_URL}/forums/${postId}/like`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (updatedLikesData.ok) {
          const updatedLikesResponse = await updatedLikesData.json();
          const updatedUserLikesResponse = await fetch(
            `${API_URL}/forums/likes/${userId}`
          );
          if (!updatedUserLikesResponse.ok) {
            throw new Error("Network response was not ok");
          }
          const updatedUserLikesData = await updatedUserLikesResponse.json();

          setLikesData(updatedUserLikesData);

          setPostData((prevPostData) =>
            prevPostData.map((post) => {
              if (post.forum_id === postId) {
                const likesCount = updatedLikesResponse.data.likes || 0;
                return { ...post, likes: likesCount };
              }
              return post;
            })
          );
        } else {
          console.error("Failed to like post");
        }
      } catch (error) {
        console.error("Error liking post:", error);
      }
    } else {
      setOpenModal(true);
    }
  };

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredData = searchTerm
    ? postData.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : postData;

  return (
    <div>
      {!filteredData || filteredData.length === 0 ? (
        <p className={styles.notfound_msg}>No se encontraron publicaciones con los términos de búsqueda.</p>
      ) : (
        filteredData.map((post) => (
          <div className={`${styles.post__container} ${!isAuthenticated && !isLoggedIn ? styles.post__container_loggedout : ''}`} key={post.forum_id}>
            <div className={styles.container__image}>
              <img
                src={post.avatar}
                alt="imagen perfil usuario"
                width={"54px"}
                height={"54px"}
              />
            </div>
            <div className={styles.post__content}>
              <div className={styles.user__container}>
                <div className={styles.content__user}>
                  <p className="user__name">{post.name}</p>
                  {isAuthenticated ? (
                    <Link
                      to={`/perfil/${parseInt(post.user_id)}`}
                      className="user__tagname"
                    >
                      @{post.user_name}
                    </Link>
                  ) : (
                    <Link
                      to="/"
                      className="user__tagname"
                      onClick={() => loginWithRedirect()}
                    >
                      {post.user_name}
                    </Link>
                  )}
                </div>
              </div>
              <Link to={`/forums/${parseInt(post.forum_id)}`}>
                <h2 className={styles.post__title}>{post.title}</h2>
                <div className={styles.content__tags}>
                  {post.event && (
                    <span className={styles.post_tags}>{post.event}</span>
                  )}
                </div>
                <div>
                  <p className={styles.post__text}>{post.description}</p>
                </div>
              </Link>
              <div className={styles.post__actions}>
                <div
                  className={styles.actions__content}
                  onClick={() => handleLike(post.forum_id)}
                >
                  {likesData &&
                  likesData.data &&
                  likesData.data.some(
                    (like) => like.forum_id === post.forum_id
                  ) ? (
                    <FaHeart fill="red" className={styles.heart_icon} />
                  ) : (
                    <FaRegHeart
                      fill="#536571"
                      className={styles.heart_icon}
                    />
                  )}
                  <span
                    className={`${styles.post_tags} ${
                      likesData &&
                      likesData.data &&
                      likesData.data.some(
                        (like) => like.forum_id === post.forum_id
                      ) &&
                      styles.liked
                    }`}
                  >
                    {post.likes}
                  </span>
                </div>
                <div className={styles.actions__content}>
                  <img src={CommentIcon} alt="Comment Icon" />
                  <span className={styles.post_tags}>
                    {post.messages ? post.messages.length : 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Post;
