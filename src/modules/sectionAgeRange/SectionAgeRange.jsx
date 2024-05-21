import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./SectionAgeRange.module.css";
import { Link } from "react-router-dom";

export default function SectionAgeRange({ slidesPerView }) {
  const [ageRanges, setAgeRanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL;
  const URL_IMAGES = process.env.REACT_APP_URL_IMAGES;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/age-ranges`);
      if (response.ok) {
        const responseData = await response.json();
        const data = responseData.data || [];
        setAgeRanges(data);
        } else {
        }
    } catch (error) {
      } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.categoryContainer}>
      <h2 className={styles.title}>Rango de edad</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Swiper
          slidesPerView={slidesPerView}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          loop={true}
          autoplay={{ delay: 3000 }}
        >
          {ageRanges.map((ageRange, index) => (
            <SwiperSlide key={index}>
              <Link
                to={`/explorar/rango-edad/${ageRange.age_range_id}`}
                className={styles.categoryLink}
              >
                {ageRange.image ? (
                  <img
                    src={`${URL_IMAGES}${ageRange.image}`}
                    alt="banner"
                    className={styles.categoryImage}
                  />
                ) : (
                  <div className={styles.placeholder}></div>
                )}
                <h3>{ageRange.name}</h3>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}