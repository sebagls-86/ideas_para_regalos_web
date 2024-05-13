import React, { useEffect, useState } from "react";
import Modal from "../../components/modal/Modal";
import Button from "../../components/button/Button";
import styles from "./modalSurvey.module.css";
import { fetchProductsCatalog } from "../api/api";
import Rating from "@mui/material/Rating";
import SelectButton from "../../components/selectButton/SelectButton";

const ModalRegister = ({ closeModal, forumInfo }) => {
  const userInfo =
    localStorage.getItem("userInfo") &&
    JSON.parse(localStorage.getItem("userInfo")).data;

  const token = localStorage.getItem("token");
  const [productsCatalog, setProductsCatalog] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [ratingLegend, setRatingLegend] = useState("");
  const [lastSelected, setLastSelected] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchProductsCatalogData = async () => {
      try {
        const fetchedProductsCatalog = await fetchProductsCatalog();
        setProductsCatalog(fetchedProductsCatalog);
      } catch (error) {
        console.error("Error fetching productsCatalog:", error);
      }
    };

    fetchProductsCatalogData();
  }, []);

  const handleRemindLater = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (!userInfo || !userInfo.data || !userInfo.data.user_id) {
        throw new Error("User info not found in localStorage");
      }

      const pendingSurveys = await fetch(
        `${API_URL}/forums-survey/remind-later/${forumInfo.forum_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!pendingSurveys.ok) {
        throw new Error("Failed to get pending surveys");
      }
    } catch (error) {
      console.error("Error getting pendingSurveys:", error.message);
    }
    closeModal();
  };

  const handleNoResponse = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (!userInfo || !userInfo.data || !userInfo.data.user_id) {
        throw new Error("User info not found in localStorage");
      }

      const pendingSurveys = await fetch(
        `${API_URL}/forums-survey/no-response/${forumInfo.forum_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!pendingSurveys.ok) {
        throw new Error("Failed to get pending surveys");
      }
    } catch (error) {
      console.error("Error getting pendingSurveys:", error.message);
    }
    closeModal();
  };

  const handleSend = async () => {
    try {
      if (!selectedProduct) {
        setErrorMessage(
          "Por favor seleccioná un producto antes de enviar la encuesta."
        );
        return;
      }

      if (rating === 0 || rating === null) {
        setErrorMessage(
          "Por favor calificá el producto antes de enviar la encuesta."
        );
        return;
      }

      const productCatalogId = parseInt(selectedProduct);

      const requestBody = {
        product_catalog_id: productCatalogId,
        gift_rate: rating,
      };

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (!userInfo || !userInfo.data || !userInfo.data.user_id) {
        throw new Error("User info not found in localStorage");
      }

      const pendingSurveys = await fetch(
        `${API_URL}/forums-survey/response/${forumInfo.forum_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!pendingSurveys.ok) {
        throw new Error("Failed to get pending surveys");
      }
    } catch (error) {
      console.error("Error getting pendingSurveys:", error.message);
    }
    closeModal();
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
    setLastSelected(ratingLegend);
    updateRatingLegend(newValue);
  };

  const handleRatingHover = (event, newValue) => {
    if (newValue === null) {
      updateRatingLegend(rating);
    } else {
      updateRatingLegend(newValue);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    console.log("Option selected:", option);
    setSelectedProduct(option);
    setIsOpen(false);
  };

  // const selectedOption = productsCatalog.find(
  //   (product) => product.product_catalog_id === selectedProduct
  // );

  const style = {
    color: "#FFEBA5",
  };

  const updateRatingLegend = (newValue) => {
    switch (newValue) {
      case 1:
        setRatingLegend("No le gustó");
        break;
      case 2:
        setRatingLegend("Le gustó poco");
        break;
      case 3:
        setRatingLegend("Le gustó");
        break;
      case 4:
        setRatingLegend("Le gustó bastante");
        break;
      case 5:
        setRatingLegend("Le gustó muchísimo");
        break;
      default:
        setRatingLegend("");
        setLastSelected(lastSelected);
        break;
    }
  };

  return (
    <Modal
      closeModal={closeModal}
      title={"Ayudanos a mejorar"}
      show={true}
      contentStyle={{
        height: "calc(80% - 2rem)",
        marginTop: "5rem",
      }}
    >
      <div className={styles.modal_body}>
        <div className={styles.error_message}>{errorMessage}</div>
        <div>
          ¡Hola {userInfo.name}! Recientemente se cerró tu foro{" "}
          <strong>{forumInfo.title}</strong>.
          <br />
          Nos encantaría conocer más sobre el regalo que diste.
          <br />
          ¿Cuál fue tu regalo?
        </div>

        <div>
          <SelectButton
            label="Seleccioná un producto"
            isOpen={isOpen}
            toggleDropdown={toggleDropdown}
            options={productsCatalog.map((product) => ({
              value: product.product_catalog_id,
              label: product.name,
            }))}
            handleOptionSelect={handleOptionSelect}
            selectedOption={selectedProduct}
            // selectedOption={selectedOption} 
      
          />
        </div>
        <div>¿Qué tan satisfecho crees que estaba al recibir el regalo?</div>
        <div>
          <div>
            <Rating
              name="rating"
              value={rating}
              onChange={handleRatingChange}
              onChangeActive={handleRatingHover}
              precision={1}
              style={style}
              className={styles.rating_stars}
            />
          </div>
          <div className={styles.rating_comment}>
            {ratingLegend !== "" ? ratingLegend : lastSelected}
          </div>
        </div>
        <div className={styles.buttons__container}>
          <Button
            label={"Recordar luego"}
            onClick={handleRemindLater}
            className="btn primary__button-outline"
          />

          <Button
            label={"Enviar"}
            onClick={handleSend}
            className="btn primary__button-outline"
          />
        </div>
        <div>
          {" "}
          <a className={styles.no_response} onClick={handleNoResponse}>
            Prefiero no contestar
          </a>
        </div>
      </div>
    </Modal>
  );
};

export default ModalRegister;
