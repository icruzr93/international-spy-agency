import React from "react";
import { Formik } from "formik";
import { FormTextInput } from "components/FormTextInput";
import { Form, Button } from "react-bootstrap";

function Login() {
  const formData = {
    email: "",
    password: "",
  };

  const handleSubmitLogin = () => {
    console.log("Click");
  };

  return (
    <Formik initialValues={formData} onSubmit={handleSubmitLogin}>
      <Form>
        <FormTextInput id="email" name="email" label="Email" />
        <Button>Iniciar sesión</Button>
      </Form>
    </Formik>
  );
}

export { Login };
