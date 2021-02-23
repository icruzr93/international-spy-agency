import { useField } from "formik";
import { Form, Row, Col } from "react-bootstrap";
import { FormTextSelectProps } from "./FormTextSelect.d";

function FormTextSelect({ name, label, ...otherProps }: FormTextSelectProps) {
  const [field, meta] = useField(name);
  const { error, touched } = meta;

  const showError = error && touched;

  return (
    <Form.Group as={Row}>
      <Form.Label column sm="4" htmlFor={otherProps.id}>
        {label && label}
      </Form.Label>
      <Col sm="8">
        <Form.Control as="select" {...field} name={name} id={otherProps.id}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Control>
      </Col>
      {showError && <Form.Text>{error}</Form.Text>}
    </Form.Group>
  );
}

export { FormTextSelect };
