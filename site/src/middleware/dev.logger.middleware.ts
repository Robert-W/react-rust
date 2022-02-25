import { MiddlewareAPI, Dispatch, Action } from '@reduxjs/toolkit';

const style = {
  title: 'font-size:1em;color:#9E9E9E;',
  action: 'display:inline-block;padding-left:1em;font-weight:bold;font-size:1.1em;color:#03A9F4;',
  prevstate: 'display:inline-block;padding-left:1em;font-weight:bold;font-size:1.1em;color:#9E9E9E;',
  nextstate: 'display:inline-block;padding-left:1em;font-weight:bold;font-size:1.1em;color:#4CAF50;',
};

/**
 * @function logger
 * @description Redux Middleware for logging all actions and upcoming state
 */
export default function logger(api: MiddlewareAPI) {
  return (next: Dispatch<Action>) => {
    return (action: Action) => {
      let previousState = api.getState();
      let result = next(action);
      console.log('%c action', style.title, action.type);
      console.log('%c prev state', style.prevstate, previousState);
      console.log(`%c action`, style.action, action);
      console.log('%c next state', style.nextstate, api.getState());
      return result;
    };
  };
}
