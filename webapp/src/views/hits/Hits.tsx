import React from "react";
import { Badge, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

import { Hit, HitStateTypes } from "global.d";
import { Layout } from "components/Layout";
import { useAuthContext } from "contexts/AuthContext";

const API_SERVER = process.env.REACT_APP_API_SERVER;

function Hits() {
  const { authState } = useAuthContext();
  const { accessToken } = authState;

  const { data } = useQuery<Hit[]>(
    "my-hits",
    async () => {
      const { data } = await axios.get(`${API_SERVER}/me/my-hits`, {
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
    <Layout pageTitle="Lista de objetivos">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Objetivo</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ id, target_name, state }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{target_name}</td>
              <td>
                {state === HitStateTypes.IN_PROGRESS && (
                  <Badge variant="primary">{state}</Badge>
                )}
                {state === HitStateTypes.COMPLETED && (
                  <Badge variant="success">{state}</Badge>
                )}
                {state === HitStateTypes.FAILED && (
                  <Badge variant="danger">{state}</Badge>
                )}
              </td>
              <td>
                <Link to={`/hits/${id}`}>
                  <Button variant="link">Ver</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
}

export { Hits };
