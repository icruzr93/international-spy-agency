import { useField } from "formik";
import { Form } from "react-bootstrap";

import { FormSelectProps } from "./FormSelect.d";

function FormSelect({ name, label, ...otherProps }: FormSelectProps) {
  const [field, meta] = useField(name);
  const { error, touched } = meta;

  const showError = error && touched;

  return (
    <Form.Group>
      <Form.Label htmlFor={otherProps.id}>{label && label}</Form.Label>
      <Form.Control as="select" {...field} name={name} id={otherProps.id}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </Form.Control>
      {showError && <Form.Text>{error}</Form.Text>}
    </Form.Group>
  );
}

export { FormSelect };
