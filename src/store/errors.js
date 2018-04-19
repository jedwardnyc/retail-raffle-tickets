import { ERROR, CLEAR_ERROR } from './constants';

export const errorHandler = (error) => {
  return { type: ERROR, error };
};

export const clearErrors = () => {
  return { type: CLEAR_ERROR, error: {} };
};

const errorReducer = (state = {}, action) => {
  switch(action.type){
    case ERROR:
      return action.error;
    case CLEAR_ERROR:
      return action.error;
    default:
      return state;
  }; 
};

export default errorReducer;