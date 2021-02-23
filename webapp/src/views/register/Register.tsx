import React from "react";
import { Formik } from "formik";
import { string as yupString, object as yupObject } from "yup";
import { FormTextInput } from "components/FormTextInput";
import { FormTextSelect } from "components/FormTextSelect";
import { Form, Button } from "react-bootstrap";

import { Container, ContainerButton, Title } from "./Register.styles";

function Register() {
  const formData = {
    email: "",
    password: "",
  };

  const validation = yupObject().shape({
    first_name: yupString().required("Nombre requerido"),
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
      <Title>
        <p>Registro</p>
      </Title>
      <Formik
        validateOnChange={false}
        initialValues={formData}
        validationSchema={validation}
        onSubmit={handleSubmitLogin}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <FormTextInput
              id="first_name"
              label="Nombre"
              {...formik.getFieldProps("first_name")}
            />
            <FormTextInput
              id="second_name"
              label="Apellidos"
              {...formik.getFieldProps("second_name")}
            />
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
            <FormTextInput
              id="repeat_password"
              type="repeat_password"
              label="Repetir contraseña"
              {...formik.getFieldProps("repeat_password")}
            />
            <FormTextSelect
              id="rol"
              label="Rol"
              {...formik.getFieldProps("rol")}
            />
            <ContainerButton className="mb-2">
              <Button variant="outline-primary">Aceptar</Button>
            </ContainerButton>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export { Register };
