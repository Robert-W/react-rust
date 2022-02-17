import service from './user.service';

/**
 * @function getUser
 * @description Placeholder to get a user from the server
 */
export function getUser(id) {
	return (dispatch) => {
		return service
			.getUser(id)
			.then((response) => dispatch({ type: 'user/get', data: response.body }))
			.catch((err) => dispatch({ type: 'user/get-failure', data: err }));
	};
}
