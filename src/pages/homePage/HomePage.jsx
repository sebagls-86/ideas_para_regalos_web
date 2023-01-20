import React from "react";
import Login from "../../modules/login/Login";
import { Col } from 'react-bootstrap';

import Search from "../../components/search/Search"
import Nav from "../../modules/nav/Nav";
import Post from "../../modules/post/Post"




function HomePage(props) {
  return (
    <>
      <div className="contenedor">
        <div className="left__aside">
          <Nav/>
        </div>
        <div className="content">
          <Col className="mt-3 px-3 d-flex justify-content-center">
            <Search/>
          </Col>
          <Col className="mt-3 p-3 bordes-y">
            <Post/>
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


export default HomePage;
