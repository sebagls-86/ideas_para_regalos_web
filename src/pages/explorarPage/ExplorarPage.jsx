import React from "react";
import Nav from "../../modules/nav/Nav";
import banner from "../../assets/bannerExplorar.png";
import styles from "./explorarPage.module.css";
import SectionCategory from "../../modules/sectionCategory/SectionCategory";
import SectionAgeRange from "../../modules/sectionAgeRange/SectionAgeRange";
import SectionEvents from "../../modules/sectionEvents/SectionEvents";
import NavBar from "../../modules/navBar/NavBar";
import AsideLogin from "../../modules/asideLogin/AsideLogin";
import SectionFeatured from "../../modules/sectionFeatured/SectionFeatured";
import EventSnipet from "../../modules/eventSnipet/EventSnipet";
import UserSuggestions from "../../modules/userSuggestions/UserSuggestions";
import Links from "../../components/link/Links";
import PageTitle from "../../components/pageTitle/PageTitle";
import { useAuth0 } from "@auth0/auth0-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import banner1 from "../../assets/banner-promo-1.png";
import banner2 from "../../assets/banner-promo-2.png";
import banner3 from "../../assets/banner-promo-3.png";
import Search from "../../components/search/Search";

import "swiper/swiper-bundle.css";

function ExplorarPage() {
  const { isAuthenticated } = useAuth0();
  const userInfo =
    (isAuthenticated && JSON.parse(localStorage.getItem("userInfo")).data) ||
    null;

  return (
    <>
      {isAuthenticated}
      {!isAuthenticated && <NavBar />} 
      <div className={`contenedor ${!isAuthenticated ? "full-width" : ""}`}>
        {isAuthenticated && (
          <div className="left__aside">
            <Nav userInfo={userInfo} />
          </div>
        )}
        <div className="content">
          {isAuthenticated && <PageTitle title="Explorar" />}
          <Swiper
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              {" "}
              <img
                src={banner1}
                alt="banner"
                className={`${styles.explorar__banner} ${
                  !isAuthenticated ? styles.loggedOutBanner : ""
                }`}
                
              />
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <img
                src={banner2}
                alt="banner"
                className={`${styles.explorar__banner} ${
                  !isAuthenticated ? styles.loggedOutBanner : ""
                }`}
              />
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <img
                src={banner3}
                alt="banner"
                className={`${styles.explorar__banner} ${
                  !isAuthenticated ? styles.loggedOutBanner : ""
                }`}
              />
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <img
                src={banner}
                alt="banner"
                className={`${styles.explorar__banner} ${
                  !isAuthenticated ? styles.loggedOutBanner : ""
                }`}
              />
            </SwiperSlide>
          </Swiper>

          <div className="mt-3">
            <SectionCategory
              title={"Categorías"}
              slidesPerView={isAuthenticated ? 3 : 4}
            />
            <SectionEvents
              title={"Eventos"}
              slidesPerView={isAuthenticated ? 3 : 4}
            />
            <SectionAgeRange
              title={"Rango de Edad"}
              slidesPerView={isAuthenticated ? 3 : 4}
            />
            <SectionFeatured
              title="Productos Destacados"
              slidesPerView={isAuthenticated ? 3 : 5}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: isAuthenticated ? 2 : 4,
                  spaceBetween: 30,
                },
                1280: {
                  slidesPerView: 5,
                  spaceBetween: 10,
                },
              }}
            />
          </div>
        </div>
        {isAuthenticated && (
          <aside className="right__aside">
            <div className="container pt-2">
              {isAuthenticated && <Search />}
              {!isAuthenticated && <AsideLogin />}
              {isAuthenticated && (
                <>
                  <EventSnipet />
                  <UserSuggestions />
                  <div className="mt-4 d-flex justify-content-center ">
                    <Links
                      title="Post nuevo regalo"
                      url="/nuevoRegalo"
                      type={"primary"}
                    />
                  </div>
                </>
              )}
            </div>
          </aside>
        )}
      </div>
    </>
  );
}

export default ExplorarPage;
