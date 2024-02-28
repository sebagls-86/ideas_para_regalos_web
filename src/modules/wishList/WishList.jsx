import React, { useState, useEffect, useRef } from "react";
import styles from "./css/list.module.css";
import { Spinner, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import AddProductsModal from "./AddProductsModal";
import ModalCreateList from "./ModalCreateList";
import ConfirmDeleteModal from "../../components/modal/ConfirmDeleteModal";
import jwtDecode from "jwt-decode";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdClose, IoIosSearch } from "react-icons/io";

function getRandomPastelColor() {
  const hue = Math.floor(Math.random() * 360);
  const pastel = "hsl(" + hue + ", 55%, 85%)";
  return pastel;
}

function WishList() {
  const [listData, setListData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedListName, setEditedListName] = useState("");
  const [showDeleteListConfirmationModal, setShowDeleteListConfirmationModal] =
    useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [productsCatalog, setProductsCatalog] = useState(null);
  const [productToRemove, setProductToRemove] = useState(null);
  const [listToRemove, setListToRemove] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filteredAvailableProducts, setFilteredAvailableProducts] = useState(
    []
  );
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showAddProductsModal, setShowAddProductsModal] = useState(false);
  const [selectedListId, setSelectedListId] = useState(null);
  const [showCreateListModal, setShowCreateListModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);
  const [listColors, setListColors] = useState({});

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
    if (listData) {
      const colors = {};
      listData.forEach((list) => {
        colors[list.list_id] = getRandomPastelColor();
      });
      setListColors(colors);
    }
  }, [listData]);

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
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  };

  const handleDeleteList = (list) => {
    setListToRemove(list);
    setShowDeleteListConfirmationModal(true);
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

  /*Por ahora no vamos a usar esta accion y los productos se agregan desde Explorar*/

  // const handleAddProduct = (list) => {
  //   const availableProducts = productsCatalog.data;
  //   const filteredProducts = availableProducts.filter(
  //     (product) => !list.products.includes(product.name)
  //   );
  //   setFilteredAvailableProducts(filteredProducts);
  //   setSelectedList(list);
  //   setSelectedProducts([]);
  //   setShowAddProductsModal(true);
  // };

  const handleToggleProduct = (product) => {
    const isProductSelected = selectedProducts.some(
      (selectedProduct) =>
        selectedProduct.product_catalog_id === product.product_catalog_id
    );

    if (isProductSelected) {
      const updatedProducts = selectedProducts.filter(
        (selectedProduct) =>
          selectedProduct.product_catalog_id !== product.product_catalog_id
      );
      setSelectedProducts(updatedProducts);
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const updateListsWithNewProducts = (listId, newProducts) => {
    const updatedListData = listData.map((list) => {
      console.log("list.list_id:", list.list_id);
      console.log("listId:", listId);

      if (list.list_id === listId) {
        const updatedProducts = [
          ...list.products,
          ...newProducts.map((product) => product.name),
        ];
        return {
          ...list,
          products: updatedProducts,
        };
      }
      return list;
    });
    setListData(updatedListData);
  };

  const handleListClick = (listId) => {
    setSelectedListId(listId);
  };

  const handleEditListName = (list) => {
    setEditMode(true);
    setEditedListName(list.list_name);
  };

  const handleSaveEditListName = async (list) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/lists/${list.list_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ list_name: editedListName }),
        }
      );
      if (response.ok) {
        alert("Nombre de lista actualizado correctamente");
        const updatedListData = listData.map((listItem) => {
          if (listItem.list_id === list.list_id) {
            return {
              ...listItem,
              list_name: editedListName,
            };
          }
          return listItem;
        });
        setEditMode(false);
        setListData(updatedListData);
      } else {
        alert("Error al actualizar el nombre de la lista");
        console.error("Error al actualizar el nombre de la lista");
      }
    } catch (error) {
      alert(
        "Error al enviar solicitud de actualización del nombre de la lista"
      );
      console.error(
        "Error al enviar solicitud de actualización del nombre de la lista:",
        error
      );
    }
  };

  const handleInputChange = (event) => {
    setEditedListName(event.target.value);
  };

  const handleSaveNewList = async (newList) => {
    try {
      const dataToSend = {
        list_name: newList.list_name,
        list_type_id: 2,
      };

      const response = await fetch(`http://localhost:8080/api/v1/lists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });
      if (response.ok) {
        alert("Lista creada correctamente");
        const data = await response.json();
        setListData([...listData, data.data]);
        setShowCreateListModal(false);
      } else {
        alert("Error al crear la lista");
        console.error("Error al crear la lista");
      }
    } catch (error) {
      alert("Error al enviar solicitud de creación de la lista");
      console.error(
        "Error al enviar solicitud de creación de la lista:",
        error
      );
    }
  };

  console.log("list", listData);

  const filteredLists = listData
    ? listData.filter((list) =>
        list.list_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSearchClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClearClick = () => {
    setSearchTerm("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
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

      <ModalCreateList
        show={showCreateListModal}
        onHide={() => setShowCreateListModal(false)}
        handleSaveNewList={handleSaveNewList}
      />

      <ConfirmDeleteModal
        show={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
        title="¿Estás seguro?"
        bodyContent={`Se eliminará "${productToRemove?.productName}" de su lista`}
        onCancel={() => setShowConfirmationModal(false)}
        onConfirm={handleConfirmDeleteProduct}
        confirmButtonText="Confirmar"
      />

      <ConfirmDeleteModal
        show={showDeleteListConfirmationModal}
        onHide={() => setShowDeleteListConfirmationModal(false)}
        title="¿Estás seguro?"
        bodyContent={`Se eliminará "${listToRemove?.list_name}" de sus listas`}
        onCancel={() => setShowDeleteListConfirmationModal(false)}
        onConfirm={() => handleDelete()}
        confirmButtonText="Confirmar"
      />

      {selectedListId ? (
        <div>
          <div className={styles.edit_buttons}>
            <Button
              onClick={() => setSelectedListId(null)}
              className={styles.go_back_button}
            ></Button>{" "}
            <Button
            className={styles.create_new_button}
              onClick={() =>
                handleEditListName(
                  listData.find((list) => list.list_id === selectedListId)
                )
              }
            >
              Editar
            </Button>
          </div>
          <div className={styles.list__content}>
            <div className={styles.user__container}>
              <div className={styles.content__user}>
                {editMode ? (
                  <div>
                    <input
                      type="text"
                      value={editedListName}
                      onChange={handleInputChange}
                    />
                    <Button
                    className={styles.create_new_button}
                      onClick={() =>
                        handleSaveEditListName(
                          listData.find(
                            (list) => list.list_id === selectedListId
                          )
                        )
                      }
                    >
                      Guardar
                    </Button>
                    <Button
                     className={styles.create_new_button}
                      onClick={() => {
                        setEditMode(false);
                        setEditedListName(
                          listData.find(
                            (list) => list.list_id === selectedListId
                          ).list_name
                        );
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                ) : (
                  <p className={styles.user__username_product}>
                    {
                      listData.find((list) => list.list_id === selectedListId)
                        .list_name
                    }
                  </p>
                )}
              </div>
            </div>
            <div className={styles.product_container}>
              {listData
                .find((list) => list.list_id === selectedListId)
                .products.map((product, index) => {
                  const productInfo = productsCatalog.data.find(
                    (item) => item.name === product
                  );
                  return (
                    <div key={index} className={styles.product_item}>
                      {productInfo && (
                        <div
                          key={index}
                          className={styles.product_card}
                          onClick={() =>
                            handleRemoveProduct(
                              listData.find(
                                (list) => list.list_id === selectedListId
                              ),
                              product
                            )
                          }
                        >
                          <img
                            src={`http://localhost:8080${productInfo.images}`}
                            alt={productInfo.name}
                            className={styles.product_image}
                          />
                          <p className={styles.product_name}>
                            {productInfo.name}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
            <Button className={styles.create_new_button} onClick={() => navigate("/explorar")}>
              Agregar
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.create_new_container}>
            <div className={styles.search_bar}>
              <form style={{ position: "relative" }}>
                <input
                  ref={inputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ flex: 1 }}
                />
                {!searchTerm ? (
                  <IoIosSearch
                    className={styles.icon_style}
                    onClick={handleSearchClick}
                  />
                ) : (
                  <IoMdClose
                    className={styles.icon_style}
                    onClick={handleClearClick}
                  />
                )}
              </form>
            </div>

            <Button
              onClick={() => setShowCreateListModal(true)}
              className={styles.create_new_button}
            >
              <AiOutlinePlus />
              Crear nueva lista
            </Button>
          </div>
          <div className={styles.whole_list}>
            {loading && <Spinner />}
            {listData === null ? (
              <p>Todavía no hay listas</p>
            ) : filteredLists.length > 0 ? (
              filteredLists.map((list) => (
                <div
                  className={styles.list__container}
                  key={list.list_id}
                  onClick={() => {
                    handleListClick(list.list_id);
                  }}
                  style={{ backgroundColor: listColors[list.list_id] }}
                >
                  <div className={styles.list__content}>
                    <div className={styles.user__container}>
                      <div className={styles.content__user}>
                        <p className={styles.user__username}>
                          {list.list_name}
                        </p>
                      </div>
                      {userId === tokenUserId && (
                        <div className={styles.more__actions}>
                          <Button
                            className={styles.action_buttons}
                            onClick={() => handleEdit(list)}
                          >
                            <div className={styles.list_edit_icon} />
                          </Button>
                          <Button
                            className={styles.action_buttons}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteList(list);
                            }}
                          >
                             <div className={styles.list_delete_icon} />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No se encontraron listas que coincidan con la búsqueda</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default WishList;
