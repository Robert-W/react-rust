import React, { useEffect, useState } from 'react';
import Switch from '../routing/Switch';
import Links from '../routing/Links';
import routes from '../routes';
import Loader from './Loader';

/**
 * @function Body
 * @description Main body of our application
 */
export default function Body(props) {
	// Set our default state
	let [isLoading, setIsLoading] = useState(false);

	// Run this effect when the components mounts, only once
	useEffect(() => {
		// This would be a good place to get our current user if we are using peer certificates for authentication
		// or do some other setup stuff. Depending on what your needs are
		setIsLoading(false);
	}, []);

	return (
		<main className="body flex">
			<nav className="navigation" aria-label="Main Menu">
				<ul className="navigation-menu">
					<Links routes={routes} />
				</ul>
			</nav>
			<div className="main-content flex">{isLoading ? <Loader /> : <Switch routes={routes} {...props} />}</div>
		</main>
	);
}
