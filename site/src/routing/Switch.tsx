import { Switch as ReactRouterSwitch } from 'react-router-dom';
import Loader from '../components/Loader';
import SecureRoute from './SecureRoute';
import React from 'react';


import { RouterProps } from 'react-router-dom';
import { RouteConfig } from '../routes';

/**
 * @function Routes
 * @description Generates a set of routes for our switch
 */
export default function Switch({ routes = [], ...props }: { routes: Array<RouteConfig>, props: any }) {
	return (
		<ReactRouterSwitch>
			{routes.map((route, index) => (
				<SecureRoute
					key={index}
					path={route.path}
					exact={route.exact}
					// Params necessary for secure route to determine access
					user={props.user}
					requiredRoles={route.requiredRoles}
					// Render that gets called if the user can access this page
					render={(routerProps: RouterProps) => (
						<React.Suspense fallback={<Loader />}>
							<route.component {...props} router={routerProps} />
						</React.Suspense>
					)}
				/>
			))}
		</ReactRouterSwitch>
	);
}
