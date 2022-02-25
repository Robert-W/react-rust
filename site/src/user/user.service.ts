import { userActions } from './user.slice';
import { AppDispatch } from '../store';
import superagent from 'superagent';

let { getUserFailure, getUser } = userActions;

export function fetchUserById(id: string) {
  return (dispatch: AppDispatch) => {
    return superagent
      .get(`https://localhost:3000/api/users/${id}`)
      .then((response: any) => dispatch(getUser(response.body)))
      .catch((err: Error) => dispatch(getUserFailure(`Unable to fetch user with id '${id}'`)));
  };
}
