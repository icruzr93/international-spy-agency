type AuthState = {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  email: string | undefined;
};

interface AuthContextProps {
  authState: AuthState;
  dispatchAuthState: (action: IAuthAction) => void;
}

enum AuthActions {
  DO_LOGOUT = "DO_LOGOUT",
  SET_AUTH = "SET_AUTH",
  SET_INITIAL_STATE = "SET_INITIAL_STATE",
}

type IAuthAction =
  | { type: AuthActions.DO_LOGOUT }
  | {
      value: AuthState;
      type: AuthActions.SET_INITIAL_STATE;
    }
  | {
      value: Partial<AuthState>;
      type: AuthActions.SET_AUTH;
    };

export { AuthContextProps, AuthState, AuthActions, IAuthAction };
