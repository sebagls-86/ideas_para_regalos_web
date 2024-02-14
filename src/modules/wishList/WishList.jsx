import React, { useState, useEffect } from "react";
import styles from "./css/list.module.css";
import { AiOutlineEllipsis } from "react-icons/ai";
import { Button, Modal } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import EditListModal from "./EditListModal";
import AddProductsModal from "./AddProductsModal";
import jwtDecode from "jwt-decode";
import { FaTimes } from "react-icons/fa";

function WishList() {
  const [listData, setListData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteOption, setShowDeleteOption] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [originalList, setOriginalList] = useState(null);
  const [productsCatalog, setProductsCatalog] = useState(null);
  const [productToRemove, setProductToRemove] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filteredAvailableProducts, setFilteredAvailableProducts] = useState(
    []
  );
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showAddProductsModal, setShowAddProductsModal] = useState(false);

  const { user_id } = useParams();
  const userId = parseInt(user_id);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const tokenUserId = decoded.user_id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/lists/user/${userId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        if (response.ok && data.data === null) {
          setLoading(false);
        }
        const processedData = data.data.map((list) => ({ ...list }));
        setListData(processedData);
        setLoading(false);

        if (response.status === 400) {
          navigate("/");
          setLoading(false);
          console.log("Error 400");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userId, navigate]);

  useEffect(() => {
    const fetchProductsCatalog = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/productsCatalog"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProductsCatalog(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products catalog:", error);
        setLoading(false);
      }
    };
    fetchProductsCatalog();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleButtonClick = () => {
    setShowDeleteOption(!showDeleteOption);
  };

  const handleEdit = async (list) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/lists/${list.list_id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const listData = await response.json();
      setSelectedList(listData);
      setOriginalList(list);
      setShowEditModal(true);
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  };

  const handleDelete = async (listId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/lists/${listId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        alert("Lista eliminada correctamente");
        console.log("Eliminado correctamente");
        // Eliminar la lista eliminada de la lista de datos actualizada
        const updatedListData = listData.filter(
          (list) => list.list_id !== listId
        );
        setListData(updatedListData);
      } else {
        alert("Error al eliminar");
        console.error("Error al eliminar");
      }
    } catch (error) {
      alert("Error al enviar solicitud de eliminación");
      console.error("Error al enviar solicitud de eliminación:", error);
    }
  };

  const handleRemoveProduct = (list, productName) => {
    // Buscar el objeto de producto correspondiente en productsCatalog
    const product = productsCatalog.data.find(
      (product) => product.name === productName
    );

    if (product) {
      // Si se encuentra el producto en productsCatalog, obtener su product_catalog_id
      const productId = product.product_catalog_id;

      // Pasar la lista completa junto con el nombre del producto y su product_catalog_id
      setProductToRemove({ list, productName, productId });
      setShowConfirmationModal(true);
    } else {
      console.error("No se pudo encontrar el producto en productsCatalog");
    }
  };

  const handleConfirmDeleteProduct = async () => {
    try {
      const { list, productId } = productToRemove;
      const listId = list.list_id;

      const response = await fetch(
        `http://localhost:8080/api/v1/lists/${listId}/listProducts/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        alert("Producto eliminado correctamente");
        const updatedListData = listData.map((listItem) => {
          console.log("listItem.list_id:", listItem.list_id);
          console.log("listId:", listId);

          if (listItem.list_id === listId) {
            const updatedProducts = listItem.products.filter((p) => {
              console.log("p:", p);
              console.log("productName:", productToRemove?.productName);

              return p !== productToRemove?.productName;
            });

            return {
              ...listItem,
              products: updatedProducts,
            };
          }
          return listItem;
        });
        setListData(updatedListData);
      } else {
        const responseBody = await response.text();
        if (responseBody.includes("invalid token")) {
          alert("Su sesión ha expirado. Por favor, inicie sesión nuevamente");
          localStorage.removeItem("token");
          navigate("/");
        } else if (!response.ok) {
          alert("Error al eliminar el producto");
        }
      }
      setShowConfirmationModal(false);
    } catch (error) {
      alert("Error al enviar solicitud de eliminación del producto");
      console.error(
        "Error al enviar solicitud de eliminación del producto:",
        error
      );
      setShowConfirmationModal(false);
    }
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedList(null);
    setOriginalList(null);
  };

  const handleCreateList = () => {
    navigate("/createList");
  };

  const handleAddProduct = (list) => {
    const availableProducts = productsCatalog.data;
    const filteredProducts = availableProducts.filter(
      (product) => !list.products.includes(product.name)
    );
    setFilteredAvailableProducts(filteredProducts);
    setSelectedList(list);
    setSelectedProducts([]);
    setShowAddProductsModal(true);
  };

   const handleToggleProduct = (product) => {
    const isProductSelected = selectedProducts.some(
      (selectedProduct) => selectedProduct.product_catalog_id === product.product_catalog_id
    );
  
    if (isProductSelected) {
      const updatedProducts = selectedProducts.filter(
        (selectedProduct) => selectedProduct.product_catalog_id !== product.product_catalog_id
      );
      setSelectedProducts(updatedProducts);
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const updateListsWithNewProducts = (listId, newProducts) => {
    const updatedListData = listData.map((list) => {
        console.log('list.list_id:', list.list_id);
        console.log('listId:', listId);
    
        if (list.list_id === listId) {
            const updatedProducts = [...list.products, ...newProducts.map(product => product.name)];
            return {
                ...list,
                products: updatedProducts,
            };
        }
        return list;
    });
    setListData(updatedListData);
};

  console.log("selectedList:", selectedList);
  console.log("selectedProducts:", selectedProducts);

  return (
    <div>
      <EditListModal
        show={showEditModal}
        onHide={handleCloseModal}
        selectedList={selectedList}
        setSelectedList={setSelectedList}
        originalList={originalList}
        handleCloseModal={handleCloseModal}
      />
      <AddProductsModal
        show={showAddProductsModal}
        onHide={() => setShowAddProductsModal(false)}
        filteredAvailableProducts={filteredAvailableProducts}
        handleToggleProduct={handleToggleProduct}
        setShowAddProductsModal={setShowAddProductsModal}
        selectedProducts={selectedProducts}
        listId={selectedList ? selectedList.list_id : null}
        updateListsWithNewProducts={updateListsWithNewProducts}
      />
      <Modal
        show={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de que desea eliminar el producto "
          {productToRemove?.productName}"?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmationModal(false)}
          >
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirmDeleteProduct}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
      <Button variant="primary" onClick={handleCreateList}>
        Crear lista
      </Button>
      {listData === null ? (
        <p>Todavía no hay listas</p>
      ) : (
        listData.map((list) => (
          <div className={styles.list__container} key={list.list_id}>
            <div className={styles.list__content}>
              <div className={styles.user__container}>
                <div className={styles.content__user}>
                  <p className={styles.user__username}>{list.list_name}</p>
                  <p className={styles.user__timepost}>5h</p>
                </div>
                {userId === tokenUserId && (
                  <div className={styles.more__actions}>
                    <Button variant="link" onClick={handleButtonClick}>
                      <AiOutlineEllipsis />
                    </Button>
                    {showDeleteOption && (
                      <>
                        <Button variant="link" onClick={() => handleEdit(list)}>
                          Editar
                        </Button>
                        <Button
                          variant="link"
                          onClick={() => handleDelete(list.list_id)}
                        >
                          Borrar
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>
              <div className={styles.product_container}>
                {list.products.length === 0 ? (
                  <p>Esta lista todavía no tiene productos</p>
                ) : (
                  list.products.map((product, index) => (
                    <Button
                      key={index}
                      className={styles.product_button}
                      onClick={() => handleRemoveProduct(list, product)}
                    >
                      {product}
                      <FaTimes
                        className={styles.profile_interest_remove_icon}
                      />
                    </Button>
                  ))
                )}
                <Button
                  variant="primary"
                  onClick={() => handleAddProduct(list)}
                >
                  Agregar
                </Button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default WishList;
