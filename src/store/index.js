import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import advisors from './advisors';
import tickets from './tickets';
import auth from './auth';
import error from './errors';

const reducer = combineReducers({
  advisors,
  tickets,
  auth,
  error
});

const store = createStore(reducer, applyMiddleware(thunk));
export default store;

export * from './advisors';
export * from './tickets';
export * from './auth';
export * from './errors';