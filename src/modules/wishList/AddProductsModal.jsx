import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function AddProductsModal({
  show,
  onHide,
  filteredAvailableProducts,
  handleToggleProduct,
  setShowAddProductsModal,
  selectedProducts,
  listId,
  updateListsWithNewProducts,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleSaveProductsToList = async () => {
    try {
      setIsLoading(true);
  
      const requestBody = {
        product_catalog_id: selectedProducts.map(product => product.product_catalog_id),
      };
  
      const response = await fetch(`http://localhost:8080/api/v1/lists/${listId}/listProducts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        alert("Error al guardar intereses");
        throw new Error("Network response was not ok");
      }
  
      // Si la respuesta es exitosa, actualiza la lista con los nuevos productos seleccionados
      updateListsWithNewProducts(listId, selectedProducts);
  
      setIsLoading(false);
      setShowAddProductsModal(false);
    } catch (error) {
      console.error("Error saving interests:", error);
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Selecciona un interés</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {filteredAvailableProducts.map((product) => (
          <Button
            key={product.product_catalog_id}
            onClick={() => handleToggleProduct(product)}
            style={{
              marginBottom: "10px",
              marginLeft: "10px",
              backgroundColor: selectedProducts.includes(product)
                ? "#007bff"
                : "white",
              color: selectedProducts.includes(product) ? "white" : "#007bff",
            }}
          >
            {product.name} {/* Asegúrate de mostrar el nombre del producto */}
          </Button>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
        <Button
          variant="primary"
          onClick={handleSaveProductsToList}
          disabled={isLoading}
        >
          {isLoading ? "Guardando..." : "Guardar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddProductsModal;
