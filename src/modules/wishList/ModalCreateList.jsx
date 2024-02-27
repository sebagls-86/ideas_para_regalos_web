import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./css/list.module.css";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

function ModalCreateList({ show, onHide, handleSaveNewList }) {
  const [form, setForm] = useState({
    list_name: "",
  });
  const [isGuardarDisabled, setIsGuardarDisabled] = useState(true);

  useEffect(() => {
    setIsGuardarDisabled(!form.list_name);
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setForm({
      list_name: "",
    });
    onHide();
  };

  const handleCreateList = () => {
    const newList = {
      list_name: form.list_name,
    };
    handleSaveNewList(newList);
  };

  return (
    <div className={styles.modal} style={{ display: show ? "block" : "none" }}>
      <div className={styles.modal__content}>
        <button className={styles.modal__button} onClick={handleClose}>
          <AiOutlineClose />
        </button>
        <div className={styles.modal__body}>
          <h2 className={styles.modal__title}>Nueva lista</h2>
          <Col xs={10} sm={8} md={7}>
            <Input
              type="text"
              name="list_name"
              placeholder="Nombre de la lista"
              required="required"
              label="Nombre"
              value={form.list_name}
              onChange={handleChange}
            />
          </Col>
        </div>
        <div className={styles.buttons__container}>
          <Button
            label="Aceptar"
            disabled={isGuardarDisabled}
            className="btn primary__button"
            onClick={handleCreateList}
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default ModalCreateList;
