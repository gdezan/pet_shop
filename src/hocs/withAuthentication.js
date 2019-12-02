import React, { useContext } from "react";
import { Redirect } from "@reach/router";
import { UserContext } from "components/UserContext";

const withAuthentication = (WrappedComponent, isAdmin = false) => {
  return props => {
    const { user } = useContext(UserContext);
    const logged = window.localStorage.getItem("authToken");

    if (!logged) {
      return <Redirect to="/login" noThrow />;
    }

    if (!user) return null;

    if (isAdmin && !user.isAdmin) {
      return <Redirect to="/" noThrow />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthentication;
