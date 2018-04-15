import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import advisors from './advisors';
import tickets from './tickets';

const reducer = combineReducers({
  advisors,
  tickets
});

const store = createStore(reducer, applyMiddleware(thunk));
export default store;

export * from './advisors';
export * from './tickets';