import React from "react";
import Input from "../../components/input/Input";

const Step2 = ({ step2Data, onInputChange }) => {
  return (
    <>
      <Input
        type="text"
        name="userName"
        placeholder="Nombre de usuario"
        label={"Nombre de usuario"}
        value={step2Data.userName}
        onChange={onInputChange}
      />
      <Input
        type="password"
        name="password"
        placeholder="Contraseña"
        label={"Contraseña"}
        value={step2Data.password}
        onChange={onInputChange}
      />
    </>
  );
};

export default Step2;
