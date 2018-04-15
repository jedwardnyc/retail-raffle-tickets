const Sequelize = require('sequelize');
const conn = require('../conn');

const Ticket = conn.define('ticket', {
  reason: Sequelize.STRING,
  date: {
    type: Sequelize.DATE,
    defaultValue: Date.now()
  }
});

module.exports = Ticket;