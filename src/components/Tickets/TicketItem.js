import React from 'react';

const TicketItem = (props) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const { ticket } = props;
  const date = new Date(ticket.date);
  return (
    <div className='jumbotron list-group-item'>
        {ticket.reason} 
          <br /> 
        {`${daysOfWeek[date.getDay()]} ${date.getMonth()+1}/${date.getDate()}`}
    </div>
  )
};

export default TicketItem;