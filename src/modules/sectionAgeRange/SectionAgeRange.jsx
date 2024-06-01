import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./SectionAgeRange.module.css";
import { Link } from "react-router-dom";
import { Pagination } from "swiper/modules";
import { FiSearch } from "react-icons/fi";

export default function SectionAgeRange({ slidesPerView }) {
  const [ageRanges, setAgeRanges] = useState([]);
  const [searchInput, setSearchInput] = useState("");
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

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredAgeRange = ageRanges.filter((category) =>
    category.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      <div className={styles.categoryContainer}>
        <div className={styles.title}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Rango de edad"
            value={searchInput}
            onChange={handleInputChange}
            className={styles.searchInput}
          />
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {searchInput && filteredAgeRange.length === 0 ? (
            <p className={styles.nomatch_msg}>
              No se encontraron rangos de edad.
            </p>
          ) : (
            <Swiper
              slidesPerView={slidesPerView}
              spaceBetween={20}
              loop={true}
              autoplay={{ delay: 3000 }}
              //modules={[Pagination]}
              pagination={{
                dynamicBullets: true,
              }}
              breakpoints={{
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
            >
              {filteredAgeRange.map((ageRange, index) => (
                <SwiperSlide key={index} style={{ marginLeft: "2rem" }}>
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
        </>
      )}
    </>
  );
}
