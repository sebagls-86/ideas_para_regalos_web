import React from "react";
import PropTypes from "prop-types";
import Login from "../../modules/login/Login";
import { Col } from 'react-bootstrap';
import logoimg from "../../assets/logoIdeasParaRegalos.png"

import Search from "../../components/search/Search"
import NavLinks from "../../components/navLinks/NavLinks";
import { AiOutlineCompass, AiOutlineBell, AiOutlineHome, AiOutlineUser, AiOutlineCalendar } from "react-icons/ai";
import { Link } from "react-router-dom";
function HomePage(props) {
  return (
    <>
      <div className="contenedor">
        <div className="left__aside">
          <div className="pt-3">
            <Link to="/" ><img src={logoimg} alt="Logo ideas para regalos"/></Link>
            <ul className="mt-3">
              <NavLinks title="Inicio" url="/" icon={<AiOutlineHome className="mr-3 fw-700 fs-3"/>}/>
              <NavLinks title="Explorar" url="/explorar" icon={<AiOutlineCompass className="mr-3 fw-700 fs-3"/>}/>
              <NavLinks title="Notificaciones" url="/notificaciones" icon={<AiOutlineBell className="mr-3 fw-700 fs-3"/>}/>
              <NavLinks title="Perfil" url="/perfil" icon={<AiOutlineUser className="mr-3 fw-700 fs-3"/>}/>
              <NavLinks title="Eventos" url="/eventos" icon={<AiOutlineCalendar className="mr-3 fw-700 fs-3"/>}/>
              
              
            </ul>
          </div>
        </div>
        <div className="content">
          <Col className="mt-3 d-flex justify-content-center">
            <Search/>
          </Col>
          
        </div>
        <aside className="right__aside">
          <div className="container pt-2">
            <Login />

          </div>
        </aside>
      </div>
    </>
  );
}

HomePage.propTypes = {};

export default HomePage;
