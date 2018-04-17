import React from 'react';

const TicketItem = (props) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const { ticket, advisor } = props;
  const date = new Date(ticket.date);
  return (
    <div className='jumbotron list-group-item'>
        <strong>{`${daysOfWeek[date.getDay()]} ${date.getMonth()+1}/${date.getDate()}`}</strong>
          <br />
        <strong>Reason:</strong> {ticket.reason}
          <br />
        { advisor ? advisor.name : null }
    </div>
  )
};

export default TicketItem;