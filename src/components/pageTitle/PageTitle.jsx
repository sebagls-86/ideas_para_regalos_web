import React from "react";
import styles from "./pageTitle.module.css";
import PropTypes from "prop-types";

function ImgPageTitle({ title }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title_container}>
          <h1 className={styles.title}>{title}</h1>
        </div>
      </div>
    </>
  );
}

ImgPageTitle.propTypes = {
  title: PropTypes.string,
};
export default ImgPageTitle;
