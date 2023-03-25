import React from "react";
import styles from "./imgPageTitle.module.css";
import PropTypes from "prop-types";

function ImgPageTitle({ title }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title_container}>
          <h1 className={styles.title}>{title}</h1>
        </div>
        <div className={styles.img_container}>
          <img
            src={require("../../assets/bannerExplorar.png")}
            alt="Banner Perfil"
            height="278px"
          />
        </div>
      </div>
    </>
  );
}

ImgPageTitle.propTypes = {
  title: PropTypes.string,
};
export default ImgPageTitle;
