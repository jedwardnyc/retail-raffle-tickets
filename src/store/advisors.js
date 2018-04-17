import axios from 'axios';
import { GET_ADVISORS, CREATE_ADVISOR, UPDATE_ADVISOR, DELETE_ADVISOR } from './constants';

export const fetchAdvisors = () => {
  return (dispatch) => {
    return axios.get('/api/advisors')
      .then(res => res.data)
      .then(advisors => dispatch({ type: GET_ADVISORS, advisors }))
      .catch(err => console.log('there is an error!!', err))
  }
}

export const createAdvisor = (advisor) => {
  return (dispatch) => {
    return axios.post('/api/advisors', advisor)
      .then(res => res.data)
      .then(advisor => dispatch({ type: CREATE_ADVISOR, advisor }))
      .catch(err => console.log('there is an error!!', err))
  }
}

export const updateAdvisor = (advisor) => {
  return (dispatch) => {
    return axios.put(`/api/advisors/${advisor.id}`, advisor)
      .then(res => res.data)
      .then(advisor => {
        console.log(advisor)
        dispatch({ type: UPDATE_ADVISOR, advisor })
      })
      .catch(err => console.log('there is an error!!', err))
  }
}

export const deleteAdvisor = (advisor) => {
  return (dispatch) => {
    return axios.delete(`/api/advisors/${advisor.id}`)
      .then(() => dispatch({ type: DELETE_ADVISOR, advisor }))
      .catch(err => console.log('there is an error!!', err))
  }
}

const advisorReducer = (state = [], action) => {
  switch(action.type){
    case GET_ADVISORS:
      return action.advisors;
    case CREATE_ADVISOR:
      return [...state, action.advisor];
    case UPDATE_ADVISOR:
      return state.map(advisor => advisor.id === action.advisor.id*1 ? action.advisor : advisor);
    case DELETE_ADVISOR:
      return state.filter(advisor => advisor.id !== action.advisor.id*1);
    default: 
      return state;
  }
}

export default advisorReducer;