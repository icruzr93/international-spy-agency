import React from "react";
import { Redirect, useParams } from "react-router";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { Hit } from "global.d";

import { Layout } from "components/Layout";
import { useAuthContext } from "contexts/AuthContext";

import { DetailHitForm } from "./DetailHitForm";

const API_SERVER = process.env.REACT_APP_API_SERVER;

function DetailHit() {
  const { id } = useParams<{ id: string }>();
  const { authState } = useAuthContext();
  const { accessToken } = authState;

  const { data } = useQuery<Hit>(
    "hit",
    async () => {
      const { data } = await axios.get(`${API_SERVER}/hits/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data;
    },
    {
      cacheTime: 0,
    }
  );

  const { mutate, isError, isSuccess } = useMutation((data: Partial<Hit>) => {
    return axios.put(`${API_SERVER}/hits/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  });

  const onSubmit = (values: Partial<Hit>) => {
    console.log(values);
    mutate(values);
  };

  if (!data) return <>"Loading..."</>;

  if (isSuccess) return <Redirect to="/hits" />;

  return (
    <Layout pageTitle="Editar objetivo">
      <DetailHitForm
        initialValues={data}
        onSubmit={onSubmit}
        hasError={isError}
      />
    </Layout>
  );
}

export { DetailHit };
