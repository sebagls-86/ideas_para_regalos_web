import React, { useState, useEffect, useRef } from "react";
import styles from "./productCard.module.css";

export default function ProductCard({ image, name, userId, productId }) {
  const [isSaved, setIsSaved] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [showPopover, setShowPopover] = useState(false);
  const [clickedInside, setClickedInside] = useState(false);
  const popoverRef = useRef(null);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lists = await getUsersLists();
        setUserLists(lists.data);
        const productExistsInLists = lists.data.some((list) =>
          list.products?.some(
            (product) => product.product_catalog_id === productId
          )
        );
        setIsSaved(productExistsInLists);
      } catch (error) {
        console.error("Error fetching user lists:", error);
      }
    };

    fetchData();

    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setShowPopover(false);
        setClickedInside(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [productId]);

  const handleSaveClick = async () => {
    if (isSaved) {
      const listId = userLists.find((list) =>
        list.products?.some(
          (product) => product.product_catalog_id === productId
        )
      )?.list_id;

      if (listId) {
        try {
          const response = await fetch(
            `${API_URL}/lists/${listId}/list-products/${productId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (response.ok) {
            setIsSaved(false);
          } else {
            console.error("Error:", response.statusText);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    } else {
      setShowPopover(true); // Aquí establecemos showPopover a true para mostrar el popover
      setClickedInside(true);
    }
  };

  const handleListClick = async (listId) => {
    const productCatalogId = productId;
    try {
      const response = await fetch(`${API_URL}/lists/${listId}/list-products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ product_catalog_id: [productCatalogId] }),
      });
      if (response.ok) {
        setIsSaved(true);
        setShowPopover(false);
      } else {
        setIsSaved(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsSaved(false);
    }
  };

  const getUsersLists = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/lists/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  };

  return (
    <div className={styles.productCard}>
      <img src={image} alt="" className={styles.productImage} />
      <button
        className={`${styles.saveButton} ${isSaved ? styles.clicked : ""}`}
        onClick={handleSaveClick}
      ></button>
      <h3 id="product" className={styles.productName}>
        {name}
      </h3>
      {showPopover && (
        <div className={styles.popover} ref={popoverRef}>
          <span
            className={styles.closeButton}
            onClick={() => setShowPopover(false)}
          >
            ×
          </span>
          <ul>
            {userLists
              .filter((list) => list.list_name !== "MercadoLibre")
              .map((list) => (
                <li
                  key={list.user_id}
                  onClick={() => handleListClick(list.list_id)}
                >
                  {list.list_name}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
