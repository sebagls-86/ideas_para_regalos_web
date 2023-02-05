import React from "react";
import styles from "./navLinks.module.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function NavLinks({icon, url }) {
  return (
    <li className="pt-0 pt-md-3">
      <Link to={url}>
        <div className={styles.link}>
          {icon} 
        </div>
      </Link>
    </li>
  );
}

NavLinks.propTypes = {
    title: PropTypes.string,
    url: PropTypes.string,
    icon: PropTypes.element,
  };
export default NavLinks;
