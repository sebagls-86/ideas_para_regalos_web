import React from "react";
import styles from "./pageTitle.module.css";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";

function ImgPageTitle({ title, showBackButton = false }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title_container}>
          {showBackButton && <IoArrowBack className={styles.goback} onClick={handleBackClick} />}
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
