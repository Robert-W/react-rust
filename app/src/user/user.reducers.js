import { defaultAppState } from '../config';
import { fromJS } from 'immutable';

/**
 * @function getUser
 * @description Fetch the current authenticated user for the application
 * @param state
 * @param action
 * @return {Immutable.Map}
 */
export function getUser(state = defaultAppState.user, action) {
	let { type, data } = action;

	switch (type) {
		// User has logged in successfully or we were able to successfully
		// get an authenticated user through another means (PKI, Session, etc.)
		case 'user/get':
			return state.withMutations((user) => {
				user.set('status', 'SUCCESS').set('error', undefined).set('data', fromJS(data));
			});
		// User was unable to login for some reason or
		// we are unable to get the current user
		case 'user/get-failure':
			return state.withMutations((user) => {
				user.set('status', 'ERROR').set('error', data);
			});
		default:
			return state;
	}
}
