import axios from 'axios';
import { GET_TICKETS, CREATE_TICKET, UPDATE_TICKET, DELETE_TICKET } from './constants';

export const fetchTickets = () => {
  return (dispatch) => {
    return axios.get('/api/tickets')
      .then(res => res.data)
      .then(tickets => dispatch({ type: GET_TICKETS, tickets }))
      .catch(err => console.log('there is an error!!', err))
  }
}

export const createTicket = (ticket) => {
  return (dispatch) => {
    return axios.post('/api/tickets', ticket)
      .then(res => res.data)
      .then(ticket => dispatch({ type: CREATE_TICKET, ticket }))
      .catch(err => console.log('there is an error!!', err))
  }
}

export const updateTicket = (ticket) => {
  return (dispatch) => {
    return axios.put(`/api/tickets/${ticket.id}`, ticket)
      .then(res => res.data)
      .then(ticket => dispatch({ type: UPDATE_TICKET, ticket }))
      .catch(err => console.log('there is an error!!', err))
  }
}

export const deleteTicket = (ticket) => {
  return (dispatch) => {
    return axios.delete(`/api/tickets/${ticket.id}`)
      .then(ticket => dispatch({ type: DELETE_TICKET, ticket }))
      .then(() => document.location.pathname === '/tickets')
      .catch(err => console.log('there is an error!!', err))
  }
}

const ticketReducer = (state = [], action) => {
  switch(action.type){
    case GET_TICKETS:
      return action.tickets;
    case CREATE_TICKET:
      return [...state, action.ticket];
    case UPDATE_TICKET:
      return state.map(ticket => ticket.id === action.ticket.id*1 ? action.ticket : ticket);
    case DELETE_TICKET:
      return state.filter(ticket => ticket.id !== action.ticket.id*1);
    default: 
      return state;
  }
}

export default ticketReducer;