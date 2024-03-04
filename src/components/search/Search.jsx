import React, { useState } from "react";
import styles from "./css/search.module.css";
import { Col } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";

function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <Col sm={12} className={styles.search__container}>
      <form className="col-12 d-flex gap-2">
        <button className={styles.button}>
          <FiSearch className={styles.icon} />
        </button>
        <input
          className={styles.input}
          type="text"
          placeholder="Buscar"
          value={searchTerm}
          onChange={handleChange}
        />
      </form>
    </Col>
  );
}

export default Search;
