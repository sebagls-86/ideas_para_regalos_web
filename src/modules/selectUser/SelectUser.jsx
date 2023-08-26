import Form from 'react-bootstrap/Form';
import styles from "./selectUser.module.css";

function SelectUser() {
  return (
    <Form.Select aria-label="Default select example" className={styles.select}>
      <option>Elegir persona</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
  );
}

export default SelectUser;