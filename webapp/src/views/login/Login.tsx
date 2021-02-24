import React from "react";
import axios from "axios";
import { Formik, Form, FormikProps } from "formik";
import { useMutation } from "react-query";
import { Redirect } from "react-router";
import { string as yupString, object as yupObject } from "yup";
import { Alert, Button } from "react-bootstrap";

import { FormTextInput } from "components/FormTextInput";
import { Layout } from "components/Layout";
import { useAuthContext } from "contexts/AuthContext";

import { LoginSuccessReponse } from "./Login.d";
import { Hitman } from "global";

const API_SERVER = process.env.REACT_APP_API_SERVER;

const validation = yupObject().shape({
  email: yupString()
    .required("Correo electrónico requerido")
    .email("Por favor introduce un correo electrónico válido"),
  password: yupString()
    .required("Contraseña requerida")
    .min(8, "Contraseña muy corta - 8 caracteres mínimo.")
    .matches(/[a-zA-Z0-9_]/, "Solo numeros y letras son permitidos."),
});

function Login() {
  const { isAuthenticated, setAuth } = useAuthContext();
  const { mutate, isError } = useMutation((data: Partial<Hitman>) => {
    return axios.post(`${API_SERVER}/auth/login/`, data);
  });

  const onSubmit = (values: Partial<Hitman>) => {
    mutate(values, {
      onSuccess: ({ data }: LoginSuccessReponse) => {
        const { access, refresh } = data;
        setAuth(access, refresh);
      },
    });
  };

  if (isAuthenticated) {
    return <Redirect to="/profile" />;
  }

  return (
    <Layout pageTitle="Inicia sesión">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={onSubmit}
        validationSchema={validation}
        validateOnMount={true}
      >
        {({ isValid }: FormikProps<Partial<Hitman>>) => (
          <Form>
            <FormTextInput
              id="email"
              label="Email"
              name="email"
              type="text"
              placeholder="Introduce tu correo electrónico"
            />
            <FormTextInput
              id="password"
              type="password"
              label="Password"
              name="password"
              placeholder="Introduce tu contraseña"
            />
            {isError && <Alert variant="danger">Credenciales invalidas</Alert>}
            <Button type="submit" disabled={!isValid}>
              Iniciar sesión
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
}

export { Login };
