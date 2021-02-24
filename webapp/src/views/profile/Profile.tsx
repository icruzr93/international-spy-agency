import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

import { useAuthContext } from "contexts/AuthContext";

import { ProfileSuccessReponse } from "./Profile.d";
import { Redirect } from "react-router";

const API_SERVER = process.env.REACT_APP_API_SERVER;

function Profile() {
  const { authState, setProfile, isValidAuthObject } = useAuthContext();
  const { accessToken } = authState;

  useQuery(
    "my-profile",
    () =>
      axios.get(`${API_SERVER}/me/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    {
      onSuccess: ({ data }: ProfileSuccessReponse) => {
        const { hitman_type } = data;
        setProfile(hitman_type);
      },
    }
  );

  if (isValidAuthObject) {
    return <Redirect to="/home" />;
  }

  return <></>;
}

export { Profile };
