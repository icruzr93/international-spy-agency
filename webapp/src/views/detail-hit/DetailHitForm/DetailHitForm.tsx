import React from "react";
import axios from "axios";
import { Alert, Button } from "react-bootstrap";
import { useQuery } from "react-query";
import { string as yupString, object as yupObject } from "yup";
import { Formik, Form, FormikProps } from "formik";

import { FormTextInput } from "components/FormTextInput";
import { useAuthContext } from "contexts/AuthContext";
import { FormSelect } from "components/FormSelect";
import { Hit, Hitman, HitmanTypes, HitStateTypes } from "global.d";

const validation = yupObject().shape({
  target_name: yupString().required("Nombre objetivo requerido"),
  hitman_id: yupString().required("Hitman requerido"),
  state: yupString().required("Estado requerido"),
});

const API_SERVER = process.env.REACT_APP_API_SERVER;

interface DetailHitFormProps {
  initialValues: Partial<Hit>;
  hasError: boolean;
  onSubmit: (values: Partial<Hit>) => void;
}

function DetailHitForm({
  initialValues,
  hasError,
  onSubmit,
}: DetailHitFormProps) {
  const { authState } = useAuthContext();
  const { accessToken, hitman_type } = authState;
  const { state } = initialValues;

  const isHitman = [HitmanTypes.HITMAN].includes(hitman_type as HitmanTypes);
  const isClosed = [HitStateTypes.COMPLETED, HitStateTypes.FAILED].includes(
    state as HitStateTypes
  );

  const { data } = useQuery<Hitman[]>(
    "my-hitmen",
    async () => {
      const { data } = await axios.get(`${API_SERVER}/me/my-hitmen`, {
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

  if (!data) return <>"Loading..."</>;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validation}
      onSubmit={onSubmit}
      validateOnMount={true}
    >
      {({ isValid }: FormikProps<Partial<Hit>>) => {
        return (
          <Form>
            <FormTextInput
              id="target_name"
              label="Nombre objetivo"
              name="target_name"
              placeholder="Nombre"
              type="text"
              disabled={true}
            />
            <FormTextInput
              id="description"
              label="Descripción"
              name="description"
              placeholder="Descripción del objetivo"
              type="text"
              as="textarea"
              disabled={true}
            />
            <FormSelect
              id="hitman_id"
              label="Hitman"
              name="hitman_id"
              placeholder="Selecciona un hitman"
              options={data.map(({ id, email }) => ({
                value: id,
                text: email,
              }))}
              disabled={isHitman || isClosed}
            />
            <FormSelect
              id="state"
              label="Estado"
              name="state"
              placeholder="Selecciona un estado"
              options={[
                { value: HitStateTypes.IN_PROGRESS, text: "En progreso" },
                { value: HitStateTypes.COMPLETED, text: "Completado" },
                { value: HitStateTypes.FAILED, text: "Fallido" },
              ]}
              disabled={!isHitman || isClosed}
            />
            {hasError && <Alert variant="danger">Datos invalidos</Alert>}
            <Button type="submit" disabled={!isValid || isClosed}>
              Actualizar
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}

export { DetailHitForm };
