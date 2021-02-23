import React from "react";
import { Formik } from "formik";
import { string as yupString, object as yupObject } from "yup";
import { FormTextInput } from "components/FormTextInput";
import { Form, Button } from "react-bootstrap";

import { Container, ContainerButton, Welcome } from "./Login.styles";

function Login() {
  const formData = {
    email: "",
    password: "",
  };

  const validation = yupObject().shape({
    email: yupString()
      .required("Correo electrónico requerido")
      .email("Por favor introduce un correo electrónico válido"),
    password: yupString().required("Password requerido"),
  });

  const handleSubmitLogin = () => {
    console.log("Click");
  };

  return (
    <Container>
      <Welcome>Bienvenido</Welcome>
      <Formik
        validateOnChange={false}
        initialValues={formData}
        validationSchema={validation}
        onSubmit={handleSubmitLogin}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <FormTextInput
              id="email"
              label="Email"
              {...formik.getFieldProps("email")}
            />
            <FormTextInput
              id="password"
              type="password"
              label="Password"
              {...formik.getFieldProps("password")}
            />
            <ContainerButton>
              <Button>Iniciar sesión</Button>
            </ContainerButton>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export { Login };
