import React, { useState, useEffect, useRef } from "react";
import styles from "./productCard.module.css";
import ResponseModal from "../../components/modal/ResponseModal";

export default function ProductCard({ image, name, userId, productId }) {
  const [isSaved, setIsSaved] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [showPopover, setShowPopover] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [clickedInside, setClickedInside] = useState(false);
  const popoverRef = useRef(null);
  const API_URL = process.env.REACT_APP_API_URL;

  function getRandomPastelColor() {
    const hue = Math.floor(Math.random() * 360);
    const pastel = "hsl(" + hue + ", 55%, 85%)";
    return pastel;
  }

  useEffect(() => {
    console.log("showAlert changed:", showAlert);
  }, [showAlert]);

  useEffect(() => {
    const fetchDataAndSetClickOutside = async () => {
      await fetchData();
      const handleClickOutside = (event) => {
        if (popoverRef.current && !popoverRef.current.contains(event.target)) {
          setShowPopover(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    };
  
    fetchDataAndSetClickOutside();
  }, [productId]);

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

  const handleSaveClick = async () => {
    setMessage("")
    setShowAlert(false)
    setShowPopover(true);
    setClickedInside(true);
  };

  const handleListClick = async (listId) => {
    const productCatalogId = productId;
    try {
      const selectedList = userLists.find((list) => list.list_id === listId);
      if (!selectedList) {
        console.error("La lista seleccionada no fue encontrada.");
        return;
      }
      const productExistsInList = selectedList.products?.some(
        (product) => product.product_catalog_id === productCatalogId
      );
      if (productExistsInList) {
        const response = await fetch(
          `${API_URL}/lists/${listId}/list-products/${productCatalogId}`,
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
          setShowPopover(false);
          setMessage("Se elimino el producto");
          setShowAlert(true);
          fetchData();
        } else {
          setErrorMessage(
            "Hubo un problema con tu solicitud. Por favor, inténtalo de nuevo más tarde."
          );
          setShowResponseModal(true);
          console.error("Error:", response.statusText);
        }
      } else {
        const response = await fetch(
          `${API_URL}/lists/${listId}/list-products`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ product_catalog_id: [productCatalogId] }),
          }
        );
        if (response.ok) {
          setIsSaved(true);
          setShowPopover(false);
          setMessage("Se agrego el producto de la lista");
          setShowAlert(true);
          fetchData();
        } else {
          setErrorMessage(
            "Hubo un problema con tu solicitud. Por favor, inténtalo de nuevo más tarde."
          );
          setShowResponseModal(true);
          console.error("Error:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error:", error);
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

  useEffect(() => {
    console.log(showAlert);
    if (showAlert && message === "") {
      setShowAlert(false);
    }
  }, [showAlert, message]);

  return (
    <>
      <ResponseModal
        show={showResponseModal}
        onHide={() => setShowResponseModal(false)}
        message={errorMessage}
        onConfirm={() => {
          setShowResponseModal(false);
        }}
        confirmButtonText="Aceptar"
      />

      <div className={styles.productCard}>
      {showAlert && (
          <div className={styles.saved_alert}>
            <p>{message}</p>
          </div>
        )}
        <img src={image} alt="" className={styles.productImage} />
        <div className={styles.product_details}>
          <h3 id="product" className={styles.productName}>
            {name}
          </h3>
        </div>
        <button
          className={`${styles.saveButton} ${isSaved ? styles.clicked : ""}`}
          onClick={handleSaveClick}
        ></button>

      

        {showPopover && (
          <div>
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
                  .map((list) => {
                    const productInList = list.products?.some(
                      (product) => product.product_catalog_id === productId
                    );
                    return (
                      <li
                        key={list.user_id}
                        onClick={() => {
                          handleListClick(list.list_id);
                          setShowPopover(false);
                          setShowAlert(true);
                        }}
                      >
                        <div className={styles.wishlist}>
                          <span
                            className={`${styles.dot} ${
                              productInList ? styles.minus : styles.plus
                            }`}
                            style={{ backgroundColor: getRandomPastelColor() }}
                          ></span>{" "}
                          {list.list_name}
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
            {console.log("showAlert value:", showAlert)}
          </div>
        )}
      </div>
    </>
  );
}
