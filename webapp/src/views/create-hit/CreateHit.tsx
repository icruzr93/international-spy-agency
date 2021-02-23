import React from "react";
import { Redirect } from "react-router";
import axios from "axios";
import { Formik, Form, FormikProps, FormikHelpers } from "formik";
import { Alert, Button } from "react-bootstrap";
import { useMutation } from "react-query";
import { string as yupString, object as yupObject } from "yup";

import { FormTextInput } from "components/FormTextInput";
import { Layout } from "components/Layout";

import { CreateHitFormValues } from "./CreateHit.d";

const API_SERVER = process.env.REACT_APP_API_SERVER;

const validation = yupObject().shape({
  first_name: yupString().required("Nombre requerido"),
  last_name: yupString().required("Apellido requerido"),
  email: yupString()
    .required("Correo electrónico requerido")
    .email("Por favor introduce un correo electrónico válido"),
  password: yupString().required("Password requerido"),
});

function CreateHit() {
  const { mutate, isError, isSuccess } = useMutation(
    (data: CreateHitFormValues) => {
      return axios.post(`${API_SERVER}/users/`, data);
    }
  );

  const onSubmit = (
    values: CreateHitFormValues,
    helpers: FormikHelpers<CreateHitFormValues>
  ) => {
    mutate(values, {
      onError: () => {
        helpers.setSubmitting(false);
      },
    });
  };

  if (isSuccess) {
    return <Redirect to="/login" />;
  }

  return (
    <Layout pageTitle="Registro">
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          password: "",
        }}
        validationSchema={validation}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, isValid }: FormikProps<CreateHitFormValues>) => (
          <Form>
            <FormTextInput
              id="first_name"
              label="Nombre"
              name="first_name"
              placeholder="Nombre"
              type="text"
            />
            <FormTextInput
              id="last_name"
              label="Apellidos"
              name="last_name"
              placeholder="Introduce tus apellidos"
              type="text"
            />
            <FormTextInput
              id="email"
              label="Email"
              name="email"
              placeholder="Introduce tu correo electrónico"
              type="text"
            />
            <FormTextInput
              id="password"
              type="password"
              label="Password"
              name="password"
              placeholder="Introduce tu contraseña"
            />
            {isError && <Alert variant="danger">Datos invalidos</Alert>}
            <Button type="submit" disabled={!isValid || isSubmitting}>
              Crear cuenta
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
}

export { CreateHit };
