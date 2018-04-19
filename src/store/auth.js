import axios from 'axios';
import { AUTHENTICATED, UNAUTHENTICATED } from './constants';
import { errorHandler } from './errors';

export const login = ({ email, password }, history ) => {
  return (dispatch) => {
    return axios.post(`/auth/local/login`, { email, password })
    .then(res => res.data)
    .then(user => {
      dispatch({ type: AUTHENTICATED });
      localStorage.setItem('user', user.token);
      history.push('/advisors');
    })
    .catch(err => dispatch(errorHandler(err.response.data)))
  };
};

export const signUp = ({ email, password }, history ) => {
  return (dispatch) => {
    return axios.post(`/auth/local/register`, { email, password })
    .then(res => res.data)
    .then(user => {
      dispatch({ type: AUTHENTICATED });
      localStorage.setItem('user', user.token);
      history.push('/advisors');
    })
    .catch(err => dispatch(errorHandler(err.response.data)))
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch({ type: UNAUTHENTICATED })
  }
};

export const keepLoggedIn = () => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATED })
  }
};

const authReducer = ( state = {}, action ) => {
  switch(action.type) {
    case AUTHENTICATED:
      return Object.assign({}, state, { authenticated: true });
    case UNAUTHENTICATED:
      return Object.assign({}, state, { authenticated: false });
    default:
      return state;
  };
};

export default authReducer;