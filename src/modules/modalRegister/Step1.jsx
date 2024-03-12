import React from "react";
import Input from "../../components/input/Input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Step1 = ({ step1Data, onInputChange, onDateChange }) => {
  return (
    <>
      <Input
        type="text"
        name="name"
        placeholder="Nombre"
        label={"Nombre"}
        value={step1Data.name}
        onChange={onInputChange}
      />
      <Input
        type="text"
        name="lastName"
        placeholder="Apellido"
        label={"Apellido"}
        value={step1Data.lastName}
        onChange={onInputChange}
      />
      <Input
        type="text"
        name="email"
        placeholder="Correo electrónico"
        label={"Correo electrónico"}
        value={step1Data.email}
        onChange={onInputChange}
      />
      <DatePicker
        selected={step1Data.birthDate}
        onChange={onDateChange}
        dateFormat="dd-MM-yyyy"
        placeholderText="Seleccionar fecha"
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={15}
        className="date-picker"
      />
    </>
  );
};

export default Step1;
