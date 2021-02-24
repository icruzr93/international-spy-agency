import React from "react";
import { Badge, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

import { Hitman, HitmanTypes } from "global.d";
import { Layout } from "components/Layout";
import { useAuthContext } from "contexts/AuthContext";

const API_SERVER = process.env.REACT_APP_API_SERVER;

function Hitmen() {
  const { authState } = useAuthContext();
  const { accessToken } = authState;

  const { data } = useQuery<Hitman[]>(
    "my-hitmen",
    async () => {
      const { data } = await axios.get(`${API_SERVER}/me/hitmen`, {
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
    <Layout pageTitle="Hitmen">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Activo?</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map(
            ({ id, first_name, last_name, email, hitman_type, is_active }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{first_name}</td>
                <td>{last_name}</td>
                <td>{email}</td>
                <td>
                  {hitman_type === HitmanTypes.BOSS && (
                    <Badge variant="primary">{hitman_type}</Badge>
                  )}
                  {hitman_type === HitmanTypes.MANAGER && (
                    <Badge variant="success">{hitman_type}</Badge>
                  )}
                  {hitman_type === HitmanTypes.HITMAN && (
                    <Badge variant="danger">{hitman_type}</Badge>
                  )}
                </td>
                <td>
                  {is_active ? (
                    <Badge variant="success">Activo</Badge>
                  ) : (
                    <Badge variant="danger">Inactivo</Badge>
                  )}
                </td>
                <td>
                  <Link to={`/hitmen/${id}`}>
                    <Button variant="link">Ver</Button>
                  </Link>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </Layout>
  );
}

export { Hitmen };
