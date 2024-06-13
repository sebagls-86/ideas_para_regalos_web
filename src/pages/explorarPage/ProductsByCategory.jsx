import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../../modules/nav/Nav";
import AsideLogin from "../../modules/asideLogin/AsideLogin";
import EventSnipet from "../../modules/eventSnipet/EventSnipet";
import UserSuggestions from "../../modules/userSuggestions/UserSuggestions";
import Links from "../../components/link/Links";
import PageTitle from "../../components/pageTitle/PageTitle";
import styles from "./explorarPage.module.css";
import ProductCard from "../../components/productCard/ProductCard";
import { useAuth0 } from "@auth0/auth0-react";
import Search from "../../components/search/Search";
import Footer from "../../modules/footer/Footer";

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
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/*  {isAuthenticated && <NavBar />} */}
      <div className="contenedor">
        <div className="left__aside">
          <Nav userInfo={userInfo} />
        </div>
        <div className="content">
          <PageTitle title={categoryName} showBackButton={true} />
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
                          key={index}
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
          <div className="container pt-2 d-flex flex-column justify-content-between h-100">
            <div>
              <Search
                onSearch={handleSearch}
                placeholder={"Buscar productos"}
              />
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
            </div>
            <div>
              <Footer />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export default ProductsByCategory;
