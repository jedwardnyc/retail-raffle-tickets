import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import advisors from './advisors';
import tickets from './tickets';
import auth from './auth';

const reducer = combineReducers({
  advisors,
  tickets,
  auth
});

const store = createStore(reducer, applyMiddleware(thunk));
export default store;

export * from './advisors';
export * from './tickets';
export * from './auth';