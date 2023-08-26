import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import Nav from "../../modules/nav/Nav";
import { Col } from "react-bootstrap";
import Button from "../../components/button/Button";
import banner from "../../assets/bannerPerfil.png";
import SimplePageTitle from "../../components/simplePageTittle/SimplePageTitle";
import PageTitle from "../../components/pageTitle/PageTitle";
import styles from "./usersPage.module.css";
import Post from "../../modules/post/Post";
import ProfileNav from "../../components/profileNav/ProfileNav";

function UsersPage() {
  const [user] = useAuthState(auth);
  const { userName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  const Publicaciones = [
    {
      id: 1,
      name: "Marcos",
      userName: "@Marcos",
      userImage: "https://randomuser.me/api/portraits/men/33.jpg",
      post_title: "Regalo para mi novia en su cumpleaños",
      post_tags: ["Ropa", "Calzado", "Viajes"],
      post_description:
        "Deje de perder tiempo compilando reseñas y use nuestra lista para una compra informada. Encuentre los productos adecuados dentro de su presupuesto y necesidades. Hallar productos top. Productos top. ",
      post_images: [
        "https://random.imagecdn.app/500/500",
        "https://random.imagecdn.app/500/500",
      ],
      post_likes: 1,
      post_comments: 99,
    },
  ];

  return (
    <>
      {user && (
        <div className="d-flex flex-column gap-3 mt-3">
          <Button
            label="Salir"
            className="btn primary__button"
            onClick={() => auth.signOut()}
          />
        </div>
      )}

      <div className="contenedor">
        <div className="left__aside">{user && <Nav />}</div>
        <div className="content">
          <PageTitle title="Perfil" />
          <Col className="d-flex justify-content-center">
            <img src={banner} alt="banner" className={styles.perfil_banner} />
          </Col>
          <div className={styles.profile_picture}></div>

          <Button label="Editar" className="btn secondary__button" />
          <h4>Username</h4>
          <p>@username</p>
          <p>Biografia</p>
          <ProfileNav></ProfileNav>
         
         
        </div>

        <aside className="right__aside">
          
        </aside>
        <div className="container pt-2"></div>
      </div>
    </>
  );
}

export default UsersPage;
