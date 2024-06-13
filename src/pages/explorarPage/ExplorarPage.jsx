import React from "react";
import Nav from "../../modules/nav/Nav";
import banner from "../../assets/bannerExplorar.png";
import styles from "./explorarPage.module.css";
import SectionCategory from "../../modules/sectionCategory/SectionCategory";
import SectionAgeRange from "../../modules/sectionAgeRange/SectionAgeRange";
import SectionEvents from "../../modules/sectionEvents/SectionEvents";
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
import Footer from "../../modules/footer/Footer";

import "swiper/swiper-bundle.css";

function ExplorarPage() {
  const { isAuthenticated } = useAuth0();
  const userInfo =
    (isAuthenticated && JSON.parse(localStorage.getItem("userInfo")).data) ||
    null;

  return (
    <>
      {isAuthenticated}
      <div className="contenedor">
        <div className="left__aside">
          <Nav userInfo={userInfo} />
        </div>

        <div className="content">
          <PageTitle title="Explorar" />
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
            <SectionCategory title={"Categorías"} slidesPerView={4} />
            <SectionEvents title={"Eventos"} slidesPerView={4} />
            <SectionAgeRange title={"Rango de Edad"} slidesPerView={4} />
            <SectionFeatured
              title="Productos Destacados"
              slidesPerView={3}
              spaceBetween={10}
              breakpoints={{
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 200,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
              }}
            />
          </div>
        </div>

        <aside className="right__aside">
          <div className="container pt-2 d-flex flex-column justify-content-between h-100">
            <div>
              <EventSnipet />
              {isAuthenticated && (
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
              )}

              {!isAuthenticated && <AsideLogin />}
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

export default ExplorarPage;
