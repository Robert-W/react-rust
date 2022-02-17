import { Map, List } from 'immutable';

// Default application state
export const defaultAppState = {
	user: Map({
		status: 'INCOMPLETE',
		error: undefined,
		data: Map({
			roles: List(),
		}),
	}),
};
