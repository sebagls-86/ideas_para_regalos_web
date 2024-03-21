import React, { useEffect, useState } from "react";
import Nav from "../../modules/nav/Nav";
import { useParams } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { Col } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "./explorarPage.module.css";
import LoginMobile from "../../modules/loginMobile/LoginMobile";
import NavBar from "../../modules/navBar/NavBar";
import AsideLogin from "../../modules/asideLogin/AsideLogin";
import EventSnipet from "../../modules/eventSnipet/EventSnipet";
import UserSuggestions from "../../modules/userSuggestions/UserSuggestions";
import Links from "../../components/link/Links";
import PageTitle from "../../components/pageTitle/PageTitle";
import ProductCard from "../../components/productCard/ProductCard";
import { getCookie } from "../../modules/api/api";

function ProductsByEvent() {
  const [tokenExists, setTokenExists] = React.useState(false);
  const { eventId } = useParams();
  const [products, setProducts] = useState([]);
  const [eventName, setEventName] = useState("");
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
  const userId = (localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")).data.user_id) || null;
  
  useEffect(() => {
    const fetchProductsByEvent = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/productsCatalogAssociations/events/${eventId}`
        );
        if (response.ok) {
          const responseData = await response.json();
          const data = responseData.data || [];
          setProducts(data);
          setEventName(data.length > 0 ? data[0].name : "");
        } else {
          console.error(
            "Error fetching products by Event:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching products by Event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByEvent();
  }, [eventId]);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setTokenExists(true);
    } else {
      setTokenExists(false);
    }
  }, []);

  console.log(products, "products")

  return (
    <>
      {!user}
      <NavBar />
      <div className="contenedor">
        <div className="left__aside">
          {(user || tokenExists) && <Nav user={user?.displayName} />}
        </div>
        <div className="content">
          <PageTitle title={eventName} />
          <Col>
            <LoginMobile />
          </Col>
          <div className="mt-3">
            <div>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <ul>
                  {products.map((product, index) => (
                    <ProductCard
                    image={`http://localhost:8080/imagenes/product-catalog/${product.image_name}`}
                    name={product.product_name}
                    userId={userId}
                    productId={product.product_catalog_id}
                  />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <aside className="right__aside">
          <div className="container pt-2">
            {user || tokenExists}
            {!user && !tokenExists && <AsideLogin />}
            {(user || tokenExists) && (
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

export default ProductsByEvent;
