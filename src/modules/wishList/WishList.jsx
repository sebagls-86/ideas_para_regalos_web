import React, { useState, useEffect, useRef } from "react";
import styles from "./css/list.module.css";
import { Spinner, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import AddProductsModal from "./AddProductsModal";
import ModalCreateList from "./ModalCreateList";
import ConfirmDeleteModal from "../../components/modal/ConfirmDeleteModal";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdClose, IoIosSearch } from "react-icons/io";
import ResponseModal from "../../components/modal/ResponseModal";
import config from "../../auth_config.json";
import { useAuth0 } from "@auth0/auth0-react";

function getRandomPastelColor() {
  const hue = Math.floor(Math.random() * 360);
  const pastel = "hsl(" + hue + ", 55%, 85%)";
  return pastel;
}

function WishList() {
  const [listData, setListData] = useState(null);
  const [meliFavoritesData, setMeliFavoritesData] = useState([]);
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
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);
  const [listColors, setListColors] = useState({});
  const { logout } = useAuth0();
  const { user_id } = useParams();
  const userId = parseInt(user_id);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const tokenUserId =
    (localStorage.getItem("userInfo") &&
      JSON.parse(localStorage.getItem("userInfo")).data.user_id) ||
    null;

  const API_URL = process.env.REACT_APP_API_URL;
  const URL_IMAGES = process.env.REACT_APP_URL_IMAGES;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/lists/user/${userId}`);
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
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userId, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedListId) {
          const selectedList = listData.find(
            (list) => list.list_id === selectedListId
          );
          if (selectedList && selectedList.list_name === "MercadoLibre") {
            const meliFavoritesResponse = await fetch(
              `${API_URL}/integration/meli/favorites`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (!meliFavoritesResponse.ok) {
              throw new Error("Network response was not ok");
            }
            const meliFavoritesresponse = await meliFavoritesResponse.json();
            setMeliFavoritesData(meliFavoritesresponse);
            setLoading(false);
            return;
          }
        }

        const response = await fetch(`${API_URL}/lists/user/${userId}`);
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
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userId, navigate, selectedListId, token]);

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
        const response = await fetch(`${API_URL}/products-catalog`);
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
      const response = await fetch(`${API_URL}/lists/${list.list_id}`);
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
    if (list.list_name === "favorites" || list.list_name === "MercadoLibre") {
      setErrorMessage("No se puede eliminar esta lista");
      setShowResponseModal(true);
    } else {
      setListToRemove(list);
      setShowDeleteListConfirmationModal(true);
    }
  };

  const handleDelete = async (listId, listName) => {
    try {
      if (listName === "favorites" || listName === "MercadoLibre") {
        setErrorMessage("No se puede eliminar esta lista");
        setShowResponseModal(true);
        return;
      }

      const response = await fetch(`${API_URL}/lists/${listId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setSuccessMessage("Lista eliminada correctamente");
        const updatedListData = listData.filter(
          (list) => list.list_id !== listId
        );
        setShowDeleteListConfirmationModal(false);
        setListData(updatedListData);
        setShowResponseModal(true);
      } else {
        setShowDeleteListConfirmationModal(false);
        setErrorMessage("Error al eliminar la lista");
        setShowResponseModal(true);
      }
    } catch (error) {
      setShowDeleteListConfirmationModal(false);
      setErrorMessage("Error al eliminar la lista");
      setShowResponseModal(true);
    }
  };

  const handleRemoveProduct = (list, selectedProduct) => {
    const product = productsCatalog.data.find(
      (product) => product.name === selectedProduct.product
    );

    if (product) {
      const productId = selectedProduct.list_product_id;
      const productName = selectedProduct.product;

      setProductToRemove({ list, productName, productId });
      setShowConfirmationModal(true);
    } else {
      setErrorMessage("No se pudo encontrar el producto en productsCatalog");
      setShowResponseModal(true);
    }
  };

  const handleConfirmDeleteProduct = async () => {
    try {
      const { list, productId } = productToRemove;
      const listId = list.list_id;

      const response = await fetch(
        `${API_URL}/lists/${listId}/list-products/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setSuccessMessage("Producto eliminado correctamente");
        const updatedListData = listData.map((listItem) => {
          if (listItem.list_id === listId) {
            const updatedProducts = listItem.products.filter(
              (p) => p.product !== productToRemove?.productName
            );
            return {
              ...listItem,
              products: updatedProducts,
            };
          }
          return listItem;
        });
        setListData(updatedListData);
        setShowResponseModal(true);
      } else {
        const responseBody = await response.text();
        if (responseBody.includes("invalid token")) {
          setErrorMessage(
            "Su sesión ha expirado. Por favor, inicie sesión nuevamente"
          );
          localStorage.removeItem("token");
          localStorage.removeItem("userInfo");
          logout();
          navigate("/");
          setShowResponseModal(true);
        } else if (!response.ok) {
          setErrorMessage("Error al eliminar el producto");
          setShowResponseModal(true);
        }
      }
      setShowConfirmationModal(false);
      setShowResponseModal(true);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Error al enviar solicitud de eliminación del producto");
      setShowConfirmationModal(false);
      setShowResponseModal(true);
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
      const response = await fetch(`${API_URL}/lists/${list.list_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ list_name: editedListName }),
      });
      if (response.ok) {
        setSuccessMessage("Lista editada correctamente");
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
        setShowResponseModal(true);
      } else {
        setErrorMessage("Error al actualizar el nombre de la lista");
        setShowResponseModal(true);
      }
    } catch (error) {
      setErrorMessage(
        "Error al enviar solicitud de actualización del nombre de la lista"
      );
      setShowResponseModal(true);
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

      const response = await fetch(`${API_URL}/lists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });
      if (response.ok) {
        setSuccessMessage("Lista creada correctamente");
        const data = await response.json();
        setListData([...listData, data.data]);
        setShowCreateListModal(false);
        setShowResponseModal(true);
      } else {
        setErrorMessage("Error al crear lista");
        setShowResponseModal(true);
      }
    } catch (error) {
      setErrorMessage("Error al enviar solicitud de creación de la lista");
      setShowResponseModal(true);
    }
  };

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
        onConfirm={() => handleDelete(listToRemove?.list_id)}
        confirmButtonText="Confirmar"
      />

      <ResponseModal
        show={showResponseModal}
        onHide={() => setShowResponseModal(false)}
        message={successMessage || errorMessage}
        onConfirm={() => {
          setShowResponseModal(false);
          setSuccessMessage(null);
          setErrorMessage(null);
        }}
        confirmButtonText="Aceptar"
      />

      {selectedListId ? (
        <div>
          {listData &&
          listData.find((list) => list.list_id === selectedListId)
            ?.list_name === "MercadoLibre" ? (
            <div>
              <div className={styles.back_button}>
                <Button
                  onClick={() => setSelectedListId(null)}
                  className={styles.go_back_button}
                ></Button>{" "}
              </div>
              <p className={styles.list_name_more}>MercadoLibre</p>
              {/* Renderizar los favoritos de MercadoLibre */}
              <div className={styles.meli_cards_container}>
                {meliFavoritesData.map((favorite, index) => (
                  <div key={index} className={styles.meli_card}>
                    <img
                      src={favorite.picture}
                      alt={favorite.name}
                      className={styles.product_image}
                    />
                    <p className={styles.product_name}>{favorite.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
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
                <div>
                  <div>
                    {editMode ? (
                      <div className={styles.list_edit_buttons}>
                        <input
                          type="text"
                          value={editedListName}
                          onChange={handleInputChange}
                        />
                        <div>
                          <Button
                            className={styles.cancel_edit_button}
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
                          <Button
                            className={styles.save_edit_button}
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
                        </div>
                      </div>
                    ) : (
                      <p className={styles.list_name_more}>
                        {
                          listData.find(
                            (list) => list.list_id === selectedListId
                          ).list_name
                        }
                      </p>
                    )}
                  </div>
                </div>
                <div className={styles.product_container}>
                  {listData.find((list) => list.list_id === selectedListId)
                    .products !== null &&
                  listData.find((list) => list.list_id === selectedListId)
                    .products.length > 0 ? (
                    listData
                      .find((list) => list.list_id === selectedListId)
                      .products.map((product, index) => {
                        const productInfo = productsCatalog.data.find(
                          (item) => item.name === product.product
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
                                  src={`${URL_IMAGES}${productInfo.images}`}
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
                      })
                  ) : (
                    <p>No hay productos todavía</p>
                  )}
                </div>
                <Button
                  className={styles.create_new_button}
                  onClick={() => navigate("/explorar")}
                >
                  Agregar
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className={styles.create_new_container}>
            <div className={styles.search_bar}>
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
            </div>

            <div className="d-flex gap-2">
              {tokenUserId === userId && (
                <>
                  <Button
                    onClick={() => setShowCreateListModal(true)}
                    className={styles.create_new_button}
                  >
                    <AiOutlinePlus />
                    Nueva lista
                  </Button>
                  {!listData?.some(
                    (list) => list.list_name === "MercadoLibre"
                  ) && (
                    <Button
                      onClick={() => {
                        window.location.href = `https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=${config.meli_client_id}&redirect_uri=${config.meli_redirect_uri}`;
                      }}
                      className={styles.create_new_button}
                    >
                      <AiOutlinePlus />
                      Favoritos de Mercado Libre
                    </Button>
                  )}
                </>
              )}
            </div>
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
                    <div>
                      <div>
                        <p className={styles.list_name}>{list.list_name}</p>
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
