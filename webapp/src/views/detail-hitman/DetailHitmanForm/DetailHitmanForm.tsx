import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Button } from "react-bootstrap";
import { useQuery } from "react-query";
import { string as yupString, object as yupObject, bool as yupBool } from "yup";
import { Formik, Form, FormikProps } from "formik";

import { FormTextInput } from "components/FormTextInput";
import { useAuthContext } from "contexts/AuthContext";
import { FormSelect, SelectOption } from "components/FormSelect";
import { Hitman, HitmanTypes } from "global.d";

const validation = yupObject().shape({
  first_name: yupString().required("Nombre requerido"),
  last_name: yupString().required("Apellido requerido"),
  email: yupString()
    .required("Correo electrónico requerido")
    .email("Por favor introduce un correo electrónico válido"),
  manager_id: yupString().required("Manager requerido"),
  hitman_type: yupString().required("Tipo requerido"),
  is_active: yupBool().required("Valor requerido"),
});

const API_SERVER = process.env.REACT_APP_API_SERVER;

interface DetailHitmanFormProps {
  initialValues: Partial<Hitman>;
  hasError: boolean;
  onSubmit: (values: Partial<Hitman>) => void;
}

function DetailHitmanForm({
  initialValues,
  hasError,
  onSubmit,
}: DetailHitmanFormProps) {
  const [hitmanOptions, setHitmanOptions] = useState<SelectOption[]>([]);
  const { authState } = useAuthContext();
  const { accessToken, id, email } = authState;

  useQuery<Hitman[]>(
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
      refetchInterval: false,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        const options = data.map(({ id, email }) => ({
          value: id,
          text: email,
        }));

        setHitmanOptions((prevState) => [...prevState, ...options]);
      },
    }
  );

  useEffect(() => {
    setHitmanOptions((prevState) => [
      { value: id, text: email } as SelectOption,
      ...prevState,
    ]);
  }, [setHitmanOptions, id, email]);

  if (!hitmanOptions) return <>"Loading..."</>;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validation}
      onSubmit={onSubmit}
    >
      {({ isValid }: FormikProps<Partial<Hitman>>) => (
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
          <FormSelect
            id="manager_id"
            label="Manager"
            name="manager_id"
            placeholder="Selecciona un hitman"
            options={hitmanOptions}
          />
          <FormSelect
            id="is_active"
            label="Activo?"
            name="is_active"
            placeholder="Selecciona un estado"
            options={[
              { value: false, text: "Inactivo" },
              { value: true, text: "Activo" },
            ]}
          />
          <FormSelect
            id="hitman_type"
            label="Tipo"
            name="hitman_type"
            placeholder="Selecciona un estado"
            options={[
              { value: HitmanTypes.BOSS, text: "Jefe" },
              { value: HitmanTypes.MANAGER, text: "Manager" },
              { value: HitmanTypes.HITMAN, text: "Hitman" },
            ]}
          />
          {hasError && <Alert variant="danger">Datos invalidos</Alert>}
          <Button type="submit" disabled={!isValid}>
            Actualizar
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export { DetailHitmanForm };
