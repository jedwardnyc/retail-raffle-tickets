const Sequelize = require('sequelize');
const conn = require('../conn');

const Advisor = conn.define('advisor', {
  name: Sequelize.STRING,
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
});

module.exports = Advisor;