import React from 'react'
import Nav from '../../modules/nav/Nav';
import { auth } from "../../utils/firebase";
import { Col } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import Search from "../../components/search/Search";
import banner from '../../assets/bannerExplorar.png'
import styles from "./explorarPage.module.css";
import SectionCategory from '../../modules/sectionCategory/SectionCategory';
import SectionEvents from '../../modules/sectionEvents/SectionEvents';
import LoginMobile from '../../modules/loginMobile/LoginMobile';
import NavLoggedOut from '../../modules/navLoggedOut/NavLoggedOut';
import AsideLogin from '../../modules/asideLogin/AsideLogin';
import SectionFeatured from '../../modules/sectionFeatured/SectionFeatured';
import EventSnipet from '../../modules/eventSnipet/EventSnipet';
import UserSuggestions from '../../modules/userSuggestions/UserSuggestions'

function ExplorarPage() {
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
    }
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
    }
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
  const [user] = useAuthState(auth);
  return (
    <>
    {!user && <NavLoggedOut />}
      <div className="contenedor">
        <div className="left__aside">{user && <Nav />}</div>
        <div className="content">
          <Col>
            <LoginMobile />
          </Col>
          {user && (
            <Col className="d-flex justify-content-center">
              <img src={banner} alt="banner" className={styles.explorar__banner}/>
            </Col>
          )}
          <div className="mt-3 p-3">
            <SectionCategory data={categorias} title={"Categorías"}/>
            <SectionEvents data={eventos} title={"Eventos"}/>
            <SectionFeatured data={destacados} title={"Productos Destacados"}/>
          </div>
        </div>
        <aside className="right__aside">
          <div className="container pt-2">
            <Search />
            <AsideLogin />
            <EventSnipet/>
            <UserSuggestions/>
          </div>
        </aside>
      </div>
    </>
  )
}

export default ExplorarPage