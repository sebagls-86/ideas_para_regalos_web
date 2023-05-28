import React from "react";
import AsideLogin from "../../modules/asideLogin/AsideLogin";
import { Col } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import Search from "../../components/search/Search";
import Nav from "../../modules/nav/Nav";
import Post from "../../modules/post/Post";
import NavLoggedOut from "../../modules/navLoggedOut/NavLoggedOut";
import LoginMobile from "../../modules/loginMobile/LoginMobile";
import EventSnipet from "../../modules/eventSnipet/EventSnipet";
import UserSuggestions from "../../modules/userSuggestions/UserSuggestions";
import Links from "../../components/link/Links";

function HomePage(props) {
  const [user] = useAuthState(auth);

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
    {
      id: 2,
      name: "Ani",
      userName: "@AniBK",
      userImage: "https://randomuser.me/api/portraits/women/10.jpg",
      post_title: "Regalo para mi novio",
      post_tags: ["Lectura", "Instrumentos", "Fotografía"],
      post_description:
        "Ideas regalos originales Regalos originales, Regalos originales para hombres, Regalos originales para mujeres, Regalos originales para parejas, Regalos ..5",
      post_images: [
        "https://random.imagecdn.app/500/500",
        "https://random.imagecdn.app/500/500",
      ],
      post_likes: 16,
      post_comments: 12,
    },
    {
      id: 3,
      name: "Horacio",
      userName: "@Horacito",
      userImage: "https://randomuser.me/api/portraits/men/22.jpg",
      post_title: "No se que regalar cumple de 15",
      post_tags: ["senderismo", "Deportes", "Baile"],
      post_description:
        "Que este San Valentín Vibre alto, Chau desayunos , flores y cenas, Sorprendx placer. Regala una nueva experiencia, que esta no se limita a disfrutarse por una única vez. Atención personalizada. Seguridad y discreción. Envíos Sin Cargo.",
      post_images: [
        "https://random.imagecdn.app/500/500",
        "https://random.imagecdn.app/500/500",
      ],
      post_likes: 22,
      post_comments: 55,
    },
    {
      id: 4,
      name: "seba",
      userName: "@seba",
      userImage: "https://randomuser.me/api/portraits/men/99.jpg",
      post_title: "Ayuda!",
      post_tags: ["arte pop", "calzado", "Fotografía"],
      post_description:
        "Fanbag Fin de año. Regala una experiencia para navidad. Cenas, Aventuras, Día de Spa, Teatro y más. Regalá Físico o Digital y Envía al Instante. Más de 3.000 Experiencias.5",
      post_images: [
        "https://random.imagecdn.app/500/500",
        "https://random.imagecdn.app/500/500",
      ],
      post_likes: 125,
      post_comments: 15,
    },
  ];
  const categorias = [
    {
      id: 1,
      name: "Electrónica",
      img: "https://random.imagecdn.app/500/500",
    },
    {
      id: 2,
      name: "Belleza",
      img: "https://random.imagecdn.app/500/500",
    },
    {
      id: 3,
      name: "Moda",
      img: "https://random.imagecdn.app/500/500",
    },
    {
      id: 4,
      name: "Fitness",
      img: "https://random.imagecdn.app/500/500",
    },
    {
      id: 5,
      name: "Salud",
      img: "https://random.imagecdn.app/500/500",
    },
    {
      id: 6,
      name: "Autos",
      img: "https://random.imagecdn.app/500/500",
    },
  ];
  const eventos = [
    {
      id: 1,
      name: "Electrónica",
      img: "https://random.imagecdn.app/500/500",
    },
    {
      id: 2,
      name: "Belleza",
      img: "https://random.imagecdn.app/500/500",
    },
    {
      id: 3,
      name: "Moda",
      img: "https://random.imagecdn.app/500/500",
    },
    {
      id: 4,
      name: "Fitness",
      img: "https://random.imagecdn.app/500/500",
    },
    {
      id: 5,
      name: "Salud",
      img: "https://random.imagecdn.app/500/500",
    },
    {
      id: 6,
      name: "Autos",
      img: "https://random.imagecdn.app/500/500",
    },
  ];
  const destacados = [
    {
      id: 1,
      name: "AirPods Max",
      img: "https://random.imagecdn.app/500/500",
    },
    {
      id: 2,
      name: "Secadora de pelo",
      img: "https://random.imagecdn.app/500/500",
    },
    {
      id: 3,
      name: "Cámara de fotos",
      img: "https://random.imagecdn.app/500/500",
    },
  ];
  return (
    <>
      {!user && <NavLoggedOut />}
      <div className="contenedor">
        <div className="left__aside">{user && <Nav />}</div>
        <div className="content">
          <Col>
            <LoginMobile />
          </Col>
          <div className="mt-3 p-3 bordes-y">
            {Publicaciones.map((post, index) => {
              return (
                <Post
                  key={index}
                  id={post.id}
                  name={post.name}
                  userName={post.userName}
                  userImage={post.userImage}
                  post_title={post.post_title}
                  post_tags={post.post_tags}
                  post_description={post.post_description}
                  post_images={post.post_images}
                  post_likes={post.post_likes}
                  post_comments={post.post_comments}
                />
              );
            })}
          </div>
        </div>
        <aside className="right__aside">
          <div className="container pt-2">
          {user && (
              <Search />
          )}
            <AsideLogin />
            {user && (
              <div>
                <EventSnipet />
                <UserSuggestions />
                <div className="mt-5 d-flex justify-content-center ">
                  <Links
                    title="Post nuevo regalo"
                    url="/nuevoRegalo"
                    type={"primary"}
                  />
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}

export default HomePage;
