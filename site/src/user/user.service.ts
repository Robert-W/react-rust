import superagent from 'superagent';

/**
 * @module UserService
 * @description All requests related to user functionality
 */
export default {
	/**
	 * @function getUser
	 * @description Get a user
	 */
	getUser(id) {
		return superagent.get(`https://localhost:3000/api/users/${id}`);
	},
};
