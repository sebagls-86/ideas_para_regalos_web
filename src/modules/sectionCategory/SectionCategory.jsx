import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./SectionCategory.module.css";
import { Link } from "react-router-dom";


export default function SectionCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL;
  const URL_IMAGES = process.env.REACT_APP_URL_IMAGES;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/categories`);
      if (response.ok) {
        const responseData = await response.json();
        const data = responseData.data || [];
        setCategories(data);
       } else {
        console.error("Error fetching categories:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.categoryContainer}>
      <h2 className={styles.title}>Categorías</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            768: {
              slidesPerView: 3,
            },
            0: {
              slidesPerView: 1,
            },
          }}
          loop={true}
          autoplay={{ delay: 3000 }}
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <Link
                to={`/explorar/categorias/${category.category_id}`}
                className={styles.categoryLink}
              >
                {category.image ? (
                  <img
                    src={`${URL_IMAGES}${category.image}`}
                    alt="banner"
                    className={styles.categoryImage}
                  />
                ) : (
                  <div className={styles.placeholder}></div>
                )}
                <h3>{category.name}</h3>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}