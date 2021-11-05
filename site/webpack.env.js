/**
 * @function setEnvironment
 * @description Take environment variables and expose them to the client during compilation
 * @param {object} environment - Map of environment variables
 * @return {object} environment settings set for webpack
 */
module.exports = function setEnvironment(environment = {}) {
	return {
		'process.env': Object.keys(environment).reduce((env, key) => {
			env[key] = JSON.stringify(environment[key]);
			return env;
		}, {}),
	};
};
