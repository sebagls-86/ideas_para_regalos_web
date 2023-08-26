import Form from 'react-bootstrap/Form';
import styles from "./selectEvent.module.css";

function SelectEvent() {
  return (
    <Form.Select aria-label="Default select example" className={styles.select}>
      <option>Elegir evento</option>
      <option value="1">Año nuevo</option>
      <option value="2">Día del animal</option>
      <option value="3">Día del amigo</option>
      <option value="4">Día del estudiante</option>
      <option value="5">Día del fotógrafo</option>
      <option value="6">Día del hermano</option>
      <option value="7">Día del niño</option>
      <option value="8">Día de la madre</option>
      <option value="9">Día de la mujer</option>
      <option value="10">Día del padre</option>
      <option value="11">Otro</option>
    </Form.Select>
  );
}

export default SelectEvent;