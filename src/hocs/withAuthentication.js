import React from "react";
import { Redirect } from "@reach/router";

const withAuthentication = WrappedComponent => {
  return props => {
    if (!window.localStorage.getItem("authToken")) {
      return <Redirect to="/login" noThrow />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthentication;
