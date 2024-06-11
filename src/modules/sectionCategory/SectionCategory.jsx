import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./SectionCategory.module.css";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

export default function SectionCategory({ slidesPerView }) {
  const [categories, setCategories] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL;
  
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

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      <div className={styles.categoryContainer}>
        <div className={styles.title}>
          <FiSearch className={styles.searchIcon}/>
          <input
            type="text"
            placeholder="Categorías"
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
          {searchInput && filteredCategories.length === 0 ? (
            <p className={styles.nomatch_msg}>No se encontraron categorías para "{searchInput}".</p>
          ) : (
        <Swiper
          slidesPerView={slidesPerView}
          spaceBetween={20}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          loop={true}
          autoplay={{ delay: 3000 }}
          //modules={[Pagination]}
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
          {filteredCategories.map((category, index) => (
            <SwiperSlide key={index} style={{ marginLeft: "2rem" }}>
              <Link
                to={`/explorar/categorias/${category.category_id}`}
                className={styles.categoryLink}
              >
                {category.image ? (
                  <img
                    src={`${category.image}`}
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
        </>
      )}
    </>
  );
}