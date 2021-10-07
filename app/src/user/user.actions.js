import service from './user.service';

/**
 * @function getActiveUser
 * @description Ask the server if we have an already authenticated user
 */
export function getUser() {
	return (dispatch) => {
		return service
			.getUser()
			.then((response) => dispatch({ type: 'user/get', data: response.body }))
			.catch((err) => dispatch({ type: 'user/get-failure', data: err }));
	};
}
