import React from "react";
import NavLinks from "../../components/navLinks/NavLinks";
import styles from "./profileNav.module.css";
import Post from "../../modules/post/Post";
import { Link } from "react-router-dom";
import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function ProfileNav({}) {
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
  const [toggleState, setToggleState] = useState();

  return (
    <>
      <div className={styles.profileContent}>
        <Tabs
          defaultActiveKey="publicaciones"
          id="uncontrolled-tab-example"
          className={styles.profileNav}
        >
          <Tab eventKey="publicaciones" title="Publicaciones">
            <div className="p-3">
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
          </Tab>
          <Tab eventKey="wishlist" title="Lista de deseados">
            {/* <Sonnet /> */}
          </Tab>
          <Tab eventKey="profiles" title="Mis perfiles">
            {/* <Sonnet /> */}
          </Tab>
        </Tabs>
      </div>
      <div className={styles.profileContentMobile}>
        <Tabs
          defaultActiveKey="publicaciones"
          id="uncontrolled-tab-example"
          className={styles.profileNav}
        >
          <Tab eventKey="publicaciones" title="Publicaciones">
            <div className="p-3">
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
          </Tab>
          <Tab eventKey="wishlist" title="Lista">
           <div className=""> hola</div>
          </Tab>
          <Tab eventKey="profiles" title="Perfiles">
            {/* <Sonnet /> */}
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

export default ProfileNav;
