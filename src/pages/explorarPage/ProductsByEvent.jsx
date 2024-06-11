import React, { useEffect, useState } from "react";
import Nav from "../../modules/nav/Nav";
import { useParams } from "react-router-dom";
import styles from "./explorarPage.module.css";
import AsideLogin from "../../modules/asideLogin/AsideLogin";
import EventSnipet from "../../modules/eventSnipet/EventSnipet";
import UserSuggestions from "../../modules/userSuggestions/UserSuggestions";
import Links from "../../components/link/Links";
import PageTitle from "../../components/pageTitle/PageTitle";
import ProductCard from "../../components/productCard/ProductCard";
import { useAuth0 } from "@auth0/auth0-react";
import Search from "../../components/search/Search";
import Footer from "../../modules/footer/Footer";

function ProductsByEvent() {
  const [tokenExists, setTokenExists] = React.useState(false);
  const { eventId } = useParams();
  const [products, setProducts] = useState([]);
  const [eventName, setEventName] = useState("");
  const [loading, setLoading] = useState(true);
  const userInfo = localStorage.getItem("userInfo");
  const userId =
    (localStorage.getItem("userInfo") &&
      JSON.parse(localStorage.getItem("userInfo")).data.user_id) ||
    null;
  const API_URL = process.env.REACT_APP_API_URL;
  const { isAuthenticated } = useAuth0();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProductsByEvent = async () => {
      try {
        const response = await fetch(
          `${API_URL}/productsCatalogAssociations/events/${eventId}`
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

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {!userInfo}
      {/* <NavBar /> */}
      <div className="contenedor">
        <div className="left__aside">
          <Nav user={userInfo?.displayName} />
        </div>
        <div className="content">
          <PageTitle title={eventName} showBackButton={true} />
          <div className={styles.card_container}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                {filteredProducts.length === 0 ? (
                  <p>No se encontraron productos.</p>
                ) : (
                  <>
                    {filteredProducts.map((product, index) => (
                      <div>
                        <ProductCard
                          image={`${product.image_name}`}
                          name={product.product_name}
                          userId={userId}
                          productId={product.product_catalog_id}
                        />
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </div>

        <aside className="right__aside">
          <div className="container pt-2">
            <Search onSearch={handleSearch} placeholder={"Buscar productos"} />
            <EventSnipet />
            {isAuthenticated || tokenExists ? (
              <>
                <UserSuggestions />
                <div className="mt-4 d-flex justify-content-center ">
                  <Links
                    title="Post nuevo regalo"
                    url="/nuevoRegalo"
                    type={"primary"}
                  />
                </div>
              </>
            ) : (
              <AsideLogin />
            )}
            <Footer />
          </div>
        </aside>
      </div>
    </>
  );
}

export default ProductsByEvent;
