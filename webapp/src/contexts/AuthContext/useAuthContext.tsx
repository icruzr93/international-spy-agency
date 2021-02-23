import { useCallback, useContext, useMemo } from "react";
import { AuthContext } from "./AuthContext";
import { AuthActions, AuthState } from "./AuthContext.d";

const useIsAuthenticated = ({ accessToken }: AuthState) => {
  return useMemo(() => {
    return accessToken !== undefined;
  }, [accessToken]);
};

function useAuthContext() {
  const { authState, dispatchAuthState } = useContext(AuthContext);
  const isAuthenticated = useIsAuthenticated(authState);

  const doLogout = useCallback(() => {
    dispatchAuthState({
      type: AuthActions.DO_LOGOUT,
    });
  }, [dispatchAuthState]);

  const setAuth = useCallback(
    (accessToken: string, refreshToken: string, email: string) => {
      dispatchAuthState({
        type: AuthActions.SET_AUTH,
        value: { accessToken, refreshToken, email },
      });
    },
    [dispatchAuthState]
  );

  return {
    authState,
    doLogout,
    isAuthenticated,
    setAuth,
  };
}

export { useAuthContext };
