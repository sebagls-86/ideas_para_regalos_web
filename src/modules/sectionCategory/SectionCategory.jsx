import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./SectionCategory.module.css";
import { Link } from "react-router-dom";

export default function SectionCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);
  
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/categories");
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
      <p>Loading...</p> // Indicador de carga
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
            <Link to="" key={index}>
              <SwiperSlide>
                {category.image ? (
                  <img
                    src={`http://localhost:8080${category.image}`} // Agregar la URL base a la ruta de la imagen
                    alt="banner"
                    className={styles.categoryImage}
                  />
                ) : (
                  <div className={styles.placeholder}></div> // Placeholder en caso de que no haya imagen
                )}
                <h3>{category.name}</h3>
              </SwiperSlide>
            </Link>
          ))}
        </Swiper>
      )}
    </div>
  );
}