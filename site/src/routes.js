import { MdInfo, MdHome, MdDashboard } from 'react-icons/md';
import { List } from 'immutable';
import React from 'react';

/**
 * @exports
 * @description Route configurations. These are all available routes for the application.
 * If you intend to support role based authorization to various pages in your application,
 * you should decide how to render them. You can either:
 *   a. Render all routes, then use SecureRoute to redirect them away from pages they
 *      don't have access too. Maybe redirect them to a 403 Forbidden page
 *   b. Filter the routes before passing them into any routing components. From a user
 *      perspective, they wont know the pages exist and can't enter the url otherwise
 *      the router will take them to a 404 not found page.
 */
export default [
	{
		/* istanbul ignore next line */
		component: React.lazy(() => import(/* webpackChunkName: "home" */ './entries/home/index')),
		requiredRoles: new List(),
		ariaLabel: 'View the home page',
		icon: MdHome,
		name: 'Home',
		exact: true,
		path: '/',
	},
	{
		/* istanbul ignore next line */
		component: React.lazy(() => import(/* webpackChunkName: "dashboard" */ './entries/dashboard/index')),
		requiredRoles: new List(['admin']),
		ariaLabel: 'View the dashboard',
		icon: MdDashboard,
		name: 'Dashboard',
		exact: true,
		path: '/dashboard',
	},
	{
		/* istanbul ignore next line */
		component: React.lazy(() => import(/* webpackChunkName: "info" */ './entries/info/index')),
		requiredRoles: new List(),
		ariaLabel: 'Read more about this application',
		icon: MdInfo,
		name: 'Info',
		exact: true,
		path: '/info',
	},
	{
		/* istanbul ignore next line */
		component: React.lazy(() => import(/* webpackChunkName: "not-found" */ './entries/not-found/index')),
		requiredRoles: new List(),
	},
];
