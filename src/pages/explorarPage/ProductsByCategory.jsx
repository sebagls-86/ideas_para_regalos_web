import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { Col } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import NavBar from "../../modules/navBar/NavBar";
import Nav from "../../modules/nav/Nav";
import LoginMobile from "../../modules/loginMobile/LoginMobile";
import AsideLogin from "../../modules/asideLogin/AsideLogin";
import EventSnipet from "../../modules/eventSnipet/EventSnipet";
import UserSuggestions from "../../modules/userSuggestions/UserSuggestions";
import Links from "../../components/link/Links";
import PageTitle from "../../components/pageTitle/PageTitle";
import styles from "./explorarPage.module.css";
import ProductCard from "../../components/productCard/ProductCard";
import jwtDecode from "jwt-decode";

function ProductsByCategory() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [tokenExists, setTokenExists] = useState(false);
  const [user] = useAuthState(auth);

  let userId = null;
  const token = localStorage.getItem("token");
  if (token) {
    const decode = jwtDecode(token);
    userId = decode.user_id;
  }

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/productsCatalogAssociations/categories/${categoryId}`
        );
        if (response.ok) {
          const responseData = await response.json();
          const data = responseData.data || [];
          setProducts(data);
          setCategoryName(data.length > 0 ? data[0].name : "");
        } else {
          console.error(
            "Error fetching products by category:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching products by category:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [categoryId]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setTokenExists(true);
    } else {
      setTokenExists(false);
    }
  }, []);


  return (
    <>
      {!user && <NavBar />}
      <div className="contenedor">
        <div className="left__aside">
          {(user || tokenExists) && <Nav user={user?.displayName} />}
        </div>
        <div className="content">
          <PageTitle title={categoryName} />
          <Col>
            <LoginMobile />
          </Col>
          <div className="mt-3">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <ul>
                {products.map((product, index) => (
                  <ProductCard
                    key={index}
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
        <aside className="right__aside">
          <div className="container pt-2">
            {user || tokenExists ? (
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
            ) : (
              <AsideLogin />
            )}
          </div>
        </aside>
      </div>
    </>
  );
}

export default ProductsByCategory;
