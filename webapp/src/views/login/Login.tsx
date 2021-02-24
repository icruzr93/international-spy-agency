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

import { LoginFormValues, LoginSuccessReponse } from "./Login.d";

const API_SERVER = process.env.REACT_APP_API_SERVER;

const validation = yupObject().shape({
  email: yupString()
    .required("Correo electrónico requerido")
    .email("Por favor introduce un correo electrónico válido"),
  password: yupString().required("Password requerido"),
});

function Login() {
  const { isAuthenticated, setAuth } = useAuthContext();
  const { mutate, isError } = useMutation((data: LoginFormValues) => {
    return axios.post(`${API_SERVER}/auth/login/`, data);
  });

  const onSubmit = (values: LoginFormValues) => {
    mutate(values, {
      onSuccess: ({ data }: LoginSuccessReponse) => {
        const { access, refresh } = data;
        const { email } = values;
        setAuth(access, refresh, email);
      },
    });
  };

  if (isAuthenticated) {
    return <Redirect to="/hits" />;
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
      >
        {({ isValid }: FormikProps<LoginFormValues>) => (
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
