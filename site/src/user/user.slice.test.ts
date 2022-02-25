import { userReducers, userActions } from './user.slice';
import { defaultAppState } from '../config';

describe('User Slice Test', () => {
  let namespace = 'user/';

  test('reducers should update the user data accordingly', () => {
    let errorMessage = 'user missing';
    let userdata = { roles: ['admin'] };

    let newGetUserFailure = userReducers(defaultAppState.user, userActions.getUserFailure(errorMessage));
    let newGetUser = userReducers(defaultAppState.user, userActions.getUser(userdata));

    // SHould be using immer, data should not be the same as default state
    expect(newGetUserFailure).not.toBe(defaultAppState.user);
    expect(newGetUser).not.toBe(defaultAppState.user);
    expect(newGetUser).not.toBe(newGetUserFailure);

    expect(newGetUserFailure.error).toEqual(errorMessage);
    expect(newGetUserFailure.status).toEqual('ERROR');
    expect(newGetUserFailure.data.roles).toEqual([]);

    expect(newGetUser.data.roles).toEqual(['admin']);
    expect(newGetUser.status).toEqual('SUCCESS');
    expect(newGetUser.error).toBeUndefined();
  });

  test('actions should return the correct type and payload', () => {
    let errorMessage = 'error: user missing';
    let userdata = { roles: ['admin'] };

    let getUserFailureAction = userActions.getUserFailure('error: user missing');
    let getUserAction = userActions.getUser(userdata);

    expect(getUserFailureAction.type).toEqual(namespace + 'getUserFailure');
    expect(getUserFailureAction.payload).toEqual(errorMessage);

    expect(getUserAction.type).toEqual(namespace + 'getUser');
    expect(getUserAction.payload).toEqual(userdata);
  });
});
