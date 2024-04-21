import React, { useState, useEffect } from "react";
import styles from "./css/post.module.css";
import { AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import EditPostModal from "./EditPostModal";
import { SlOptions } from "react-icons/sl";
import DeleteIcon from "../../assets/buttons/delete-icon.svg"
import { CgTrash } from "react-icons/cg";
import { MdOutlineModeEditOutline } from "react-icons/md";

function PostByUser() {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteOption, setShowDeleteOption] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [originalPost, setOriginalPost] = useState(null);
  const { user_id } = useParams();
  const userId = parseInt(user_id);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const tokenUserId =
    (localStorage.getItem("userInfo") &&
      JSON.parse(localStorage.getItem("userInfo")).data.user_id) ||
    null;
  const API_URL = process.env.REACT_APP_API_URL;

  console.log(userId)
  console.log(tokenUserId)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/forums/user/${userId}`);
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userId, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleButtonClick = (postId) => {

    setSelectedPostId(postId);
    setShowDeleteOption(!showDeleteOption);
  };

  const handleDelete = async (post) => {
    try {
      const response = await fetch(`${API_URL}/forums/${post.forum_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Error al eliminar");
      }
    } catch (error) {
      console.error("Error al enviar solicitud de eliminación:", error);
    }
  };

  const handleEdit = async (post) => {
    try {
      const response = await fetch(`${API_URL}/forums/${post.forum_id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const postData = await response.json();
      setSelectedPost(postData);
      setOriginalPost(post);
      setShowEditModal(true);
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedPost(null);
    setOriginalPost(null);
  };


  return (
    <div>
      <EditPostModal
        show={showEditModal}
        onHide={handleCloseModal}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
        originalPost={originalPost}
        handleCloseModal={handleCloseModal}
      />

      {!postData || postData.length === 0 ? (
        <p>Todavía no hay publicaciones</p>
      ) : (
        postData.map((post) => (
          <div key={post.forum_id} className={styles.post__container}>
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
                  <Link
                    to={`/forums/${parseInt(post.forum_id)}`}
                    className={styles.user__username}
                  >
                    {post.name}
                  </Link>
                  <Link
                    to={`/perfil/${parseInt(post.user_id)}`}
                    className={styles.user__tagname}
                  >
                    @{post.user_name}
                  </Link>
                 
                </div>
                {userId === tokenUserId && (
                  <div className={styles.more__actions}>
                  <Button variant="link" onClick={() => handleButtonClick(post.forum_id)}>
                      <SlOptions />
                    </Button>
                    {showDeleteOption && selectedPostId === post.forum_id && ( 
                      <>
                      <div className={styles.post__actions_options}>
                        <Button variant="link" onClick={() => handleEdit(post)}>
                        <MdOutlineModeEditOutline />Editar
                        </Button>
                        <Button
                          variant="link"
                          onClick={() => handleDelete(post)}
                          className={styles.delete_post_btn}
                        >
                        <CgTrash/>Eliminar
                        </Button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
              <Link
                to={`/forums/${parseInt(post.forum_id)}`}
                className={styles.post__title}
              >
                <p>{post.title}</p>
                {/*
                <div className={styles.content__tags}>
                  {post.event && (
                    <span className={styles.post_tags}>{post.event}</span>
                  )}
                </div>*/}
                <div>
                  <p className={styles.post__text}>{post.description}</p>
                </div>
              </Link>
              <div className={styles.post__actions}>
                <div>
                <div className={styles.actions__content}>
                  <AiOutlineHeart />
                  <span className={styles.post_tags}>{post.likes}</span>
                </div>
                </div>

                <div>
                <div className={styles.actions__content}>
                  <FiMessageSquare />
                  <span className={styles.post_tags}>
                    {post.messages ? post.messages.length : 0}
                  </span>
                </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default PostByUser;
