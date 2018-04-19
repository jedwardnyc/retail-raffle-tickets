const db = require('../index');
const Ticket = require('./Ticket');
const Advisor = require('./Advisor');
const User = require('./User');

Ticket.belongsTo(Advisor, { onDelete: 'cascade' });
Advisor.hasMany(Ticket);

module.exports = {
  db,
  Advisor,
  Ticket,
  User
}