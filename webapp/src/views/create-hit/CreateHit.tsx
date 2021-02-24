import React from "react";
import { Redirect } from "react-router";
import axios from "axios";
import { Formik, Form, FormikHelpers } from "formik";
import { Alert, Button } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { string as yupString, object as yupObject } from "yup";

import { FormTextInput } from "components/FormTextInput";
import { Layout } from "components/Layout";
import { Hit, Hitman } from "global.d";

import { useAuthContext } from "contexts/AuthContext";
import { FormSelect } from "components/FormSelect";

const API_SERVER = process.env.REACT_APP_API_SERVER;

const validation = yupObject().shape({
  target_name: yupString().required("Nombre objetivo requerido"),
  description: yupString().required("Nombre objetivo requerido"),
  hitman_id: yupString().required("Hitman requerido"),
});

function CreateHit() {
  const { authState } = useAuthContext();
  const { accessToken } = authState;

  const { data } = useQuery<Hitman[]>(
    "my-hitmen",
    async () => {
      const { data } = await axios.get(`${API_SERVER}/me/hitmen`, {
        params: {
          is_active: true,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data;
    },
    {
      initialData: [],
    }
  );

  const { mutate, isError, isSuccess } = useMutation((data: Partial<Hit>) => {
    return axios.post(`${API_SERVER}/hits/`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  });

  const onSubmit = (
    values: Partial<Hit>,
    helpers: FormikHelpers<Partial<Hit>>
  ) => {
    mutate(values, {
      onError: () => {
        helpers.setSubmitting(false);
      },
    });
  };

  if (!data) return <>"Loading..."</>;

  if (isSuccess) {
    return <Redirect to="/hits" />;
  }

  const dropdownHitmenOptions = data.map(({ id, email }) => ({
    value: id,
    text: email,
  }));

  return (
    <Layout pageTitle="Crear objetivo">
      <Formik
        initialValues={{
          target_name: "",
          hitman_id: "",
          description: "",
        }}
        validationSchema={validation}
        onSubmit={onSubmit}
      >
        <Form>
          <FormTextInput
            id="target_name"
            label="Nombre objetivo"
            name="target_name"
            placeholder="Nombre"
            type="text"
          />
          <FormTextInput
            id="description"
            label="Descripción"
            name="description"
            placeholder="Nombre"
            type="text"
            as="textarea"
          />
          <FormSelect
            id="hitman_id"
            label="Hitman"
            name="hitman_id"
            placeholder="Selecciona un hitman"
            options={dropdownHitmenOptions}
          />
          {isError && <Alert variant="danger">Datos invalidos</Alert>}
          <Button type="submit">Crear objetivo</Button>
        </Form>
      </Formik>
    </Layout>
  );
}

export { CreateHit };
