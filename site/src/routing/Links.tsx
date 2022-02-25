import { Icon, Tooltip } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import React from 'react';

import { RouteConfig } from '../routes';

/**
 * @function Links
 * @description Generates a set of navigation links
 */
export default function Links({ routes = [] }: { routes: Array<RouteConfig> }) {
  return (
    <React.Fragment>
      {routes
        .filter((route) => route.path)
        .map((route) => (
          <li key={route.path}>
            <Tooltip label={route.ariaLabel} placement="right" hasArrow>
              <NavLink
                aria-label={route.ariaLabel}
                className="navigation-link"
                activeClassName="active"
                to={route.path!}
                exact={true}
              >
                <Icon as={route.icon} h={6} w={6} className="navigation-link__icon" />
              </NavLink>
            </Tooltip>
          </li>
        ))}
    </React.Fragment>
  );
}
