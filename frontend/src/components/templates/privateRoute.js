//  https://medium.com/@tomlarge/private-routes-with-react-router-dom-28e9f40c7146

import React from "react";
import { Route, Redirect } from "react-router-dom";

export default ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};
