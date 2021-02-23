interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginSuccessReponse {
  data: {
    access: string;
    refresh: string;
  };
}

export { LoginFormValues, LoginSuccessReponse };
