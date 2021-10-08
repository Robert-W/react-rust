import superagent from 'superagent';

/**
 * @module UserService
 * @description All requests related to user functionality
 */
export default {
	/**
	 * @function getUser
	 * @description Get the active user
	 */
	getUser() {
		return superagent.get('https://localhost:3000/api/users/1');
	},
};
