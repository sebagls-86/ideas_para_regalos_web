import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../modules/navBar/NavBar";
import Nav from "../../modules/nav/Nav";
import AsideLogin from "../../modules/asideLogin/AsideLogin";
import EventSnipet from "../../modules/eventSnipet/EventSnipet";
import UserSuggestions from "../../modules/userSuggestions/UserSuggestions";
import Links from "../../components/link/Links";
import PageTitle from "../../components/pageTitle/PageTitle";
import styles from "./explorarPage.module.css";
import ProductCard from "../../components/productCard/ProductCard";
import { useAuth0 } from "@auth0/auth0-react";

function ProductsByCategory() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [tokenExists, setTokenExists] = useState(false);
  const { isAuthenticated } = useAuth0();
  const userId =
    (localStorage.getItem("userInfo") &&
      JSON.parse(localStorage.getItem("userInfo")).data.user_id) ||
    null;
  const userInfo =
    (localStorage.getItem("userInfo") &&
      JSON.parse(localStorage.getItem("userInfo")).data) ||
    null;
  const API_URL = process.env.REACT_APP_API_URL;
  const URL_IMAGES = process.env.REACT_APP_URL_IMAGES;

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await fetch(
          `${API_URL}/productsCatalogAssociations/categories/${categoryId}`
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
      {isAuthenticated && <NavBar />}
      <div className="contenedor">
        <div className="left__aside">
          {(isAuthenticated || tokenExists) && <Nav userInfo={userInfo} />}
        </div>
        <div className="content">
          <PageTitle title={categoryName} />
          <div className={styles.card_container}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                {products.map((product, index) => (
                  <ProductCard
                    key={index}
                    image={`${URL_IMAGES}/imagenes/product-catalog/${product.image_name}`}
                    name={product.product_name}
                    userId={userId}
                    productId={product.product_catalog_id}
                  />
                ))}
              </>
            )}
          </div>
        </div>
        <aside className="right__aside">
          <div className="container pt-2">
            {isAuthenticated || tokenExists ? (
              <div className="container pt-2">
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
