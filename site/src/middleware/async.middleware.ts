import { Store, Dispatch, Action } from "redux";


/**
 * @function asyncMiddleware
 * @description Middleware to support asynchronous actions. It also passes in a getState method
 * so if actions and/or reducers need shared state to complete their updates, they can access it
 * @param store
 * @returns {function}
 */
export default function asyncMiddleware(store: Store) {
	return (next: Dispatch<Action>) => {
		return (action: any) => (typeof action === 'function' ? action(store.dispatch, store.getState) : next(action));
	};
}
