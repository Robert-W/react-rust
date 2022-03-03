import { Redirect, Route, RouterProps } from 'react-router-dom';
import { HttpRequest, UserData } from '../config';
import React from 'react';

interface SecureRouteProps {
  render (props: RouterProps): JSX.Element;
  requiredRoles: Array<string>;
  user: HttpRequest<UserData>;
  exact?: boolean;
  path?: string;
}

/**
 * @function SecureRoute
 * @description Redirect users trying to access pages that are visible in
 * the UI but they do not have permission to view it
 * @param {*} props
 */
export default function SecureRoute(props: SecureRouteProps) {
  let { path, exact, render, user, requiredRoles, ...rest } = props;

  return (
    <Route
      {...rest}
      path={path}
      exact={exact}
      render={(routerProps) => {
        let roles: Array<string> = user && user.data ? user.data.roles : [];
        // Only render the target page if the user has the required roles
        if (requiredRoles.every((role: string) => roles.includes(role)) || roles.includes('admin')) {
          return render(routerProps);
        }
        // Redirect to the homepage when the incorrect page is accessed
        else {
          let to = { pathname: '/', state: { from: routerProps.location } };
          return <Redirect to={to} />;
        }
      }}
    />
  );
}
