import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./sectionFeatured.module.css";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";
import ProductCard from "../../components/productCard/ProductCard";

export default function SectionFeatured({ slidesPerView }) {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = (localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")).data.user_id) || null;
  const API_URL = process.env.REACT_APP_API_URL;
  const URL_IMAGES = process.env.REACT_APP_URL_IMAGES;
  

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        `${API_URL}/productsCatalogAssociations/featured`
      );
      if (response.ok) {
        const responseData = await response.json();
        const data = responseData.data || [];
        setFeatured(data);
      } else {
        console.error("Error fetching events:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.productsContainer}>
        <h2 className={styles.title}>Productos destacados</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Swiper
            slidesPerView={slidesPerView}
            navigation={true}
            spaceBetween={10}
            modules={[Navigation]}
            autoplay={{ delay: 3000 }}
        
          >
            {featured.map((featured, index) => (
              <Link to="" key={index}>
                <SwiperSlide>
                  <ProductCard
                    image={`${URL_IMAGES}${featured.image_name}`}
                    name={featured.product_name}
                    userId={userId}
                    productId={featured.product_catalog_id}
                  />
                </SwiperSlide>
              </Link>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
}
