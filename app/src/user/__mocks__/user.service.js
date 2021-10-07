const service = {};

/**
 * @function reset
 * @description Helper to reset the mock
 */
function reset() {
	service.__error = undefined;
	service.__results = undefined;
}

/**
 * @function reset
 * @description Helper to force an error
 */
function setError(error) {
	service.__error = error;
}

/**
 * @function reset
 * @description Helper to force success
 */
function setResults(results) {
	service.__results = results;
}

/**
 * @function getUser
 * @returns {Promise<object>}
 */
service.getUser = () =>
	new Promise((resolve, reject) => {
		if (service.__results) {
			return resolve(service.__results);
		} else if (service.__error) {
			return reject(service.__error);
		} else {
			return reject(new Error('User service login mock results/error not set'));
		}
	});

service.__reset = reset;
service.__setError = setError;
service.__setResults = setResults;

module.exports = service;
