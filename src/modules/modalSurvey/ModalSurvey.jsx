import React, {useEffect, useState} from "react";
import Modal from "../../components/modal/Modal";
import Button from "../../components/button/Button";
import styles from "./modalSurvey.module.css";
import {fetchProductsCatalog} from "../api/api";
import Rating from '@mui/material/Rating';

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
        setErrorMessage("Por favor selecciona un producto antes de enviar la encuesta.");
        return
      }
  
      if (rating === 0 || rating === null) {
        setErrorMessage("Por favor selecciona una calificación antes de enviar la encuesta.");
        return
      }

      const productCatalogId = parseInt(selectedProduct);

      const requestBody = {
        product_catalog_id: productCatalogId,
        gift_rate: rating
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

  const style = {
    color: "#f8d64e",
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
        setLastSelected(lastSelected)
        break;
    }
  };


  return (
    <Modal
      closeModal={closeModal}
      title={"Encuesta de Regalo"}
      show={true}
      contentStyle={{
        height: "calc(70% - 2rem)",
        maxHeight: "500px",
        marginTop: "7rem",
      }}
    >
    <div>{errorMessage}</div>
      <div>
        Hola {userInfo.name}! Recientemente se cerro tu foro {forumInfo.title}.
        Nos podrias contar que regalaste?
      </div>
      <div>
      <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="">Selecciona un producto</option>
          {productsCatalog.map((product) => (
            <option key={product.product_catalog_id} value={product.product_catalog_id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        Cuanto crees que le gusto el regalo a la persona que lo recibio?
      </div>
      <Rating
        name="rating"
        value={rating}
        onChange={handleRatingChange}
        onChangeActive={handleRatingHover}
        precision={1}
        style={style}
      />
     <div>{ratingLegend !== "" ? ratingLegend : lastSelected}</div>
      <div className={styles.buttons__container}>
        <Button
          label={"Recordar luego"}
          onClick={handleRemindLater}
          className="btn primary__button"
        />
        <Button
          label={"No contestar"}
          onClick={handleNoResponse}
          className="btn primary__button"
        />
        <Button
          label={"Enviar"}
          onClick={handleSend}
          className="btn primary__button"
        />
      </div>
    </Modal>
  );
};

export default ModalRegister;
