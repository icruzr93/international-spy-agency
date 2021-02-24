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
import { useAuthContext } from "contexts/AuthContext";

const API_SERVER = process.env.REACT_APP_API_SERVER;

const validation = yupObject().shape({
  target_name: yupString().required("Nombre objetivo requerido"),
  hitman_id: yupString().required("Hitman requerido"),
});

function CreateHit() {
  const { authState } = useAuthContext();
  const { accessToken } = authState;

  const { mutate, isError, isSuccess } = useMutation(
    (data: CreateHitFormValues) => {
      return axios.post(`${API_SERVER}/hits/`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
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
    return <Redirect to="/hits" />;
  }

  return (
    <Layout pageTitle="Crear objetivo">
      <Formik
        initialValues={{
          target_name: "",
          hitman_id: "",
        }}
        validationSchema={validation}
        onSubmit={onSubmit}
      >
        {({ isValid }: FormikProps<CreateHitFormValues>) => (
          <Form>
            <FormTextInput
              id="target_name"
              label="Nombre objetivo"
              name="target_name"
              placeholder="Nombre"
              type="text"
            />
            <FormTextInput
              id="hitman_id"
              label="Hitman"
              name="hitman_id"
              placeholder="Introduce tus apellidos"
              type="text"
            />
            {isError && <Alert variant="danger">Datos invalidos</Alert>}
            <Button type="submit" disabled={!isValid}>
              Crear objetivo
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
}

export { CreateHit };
