const Sequelize = require('sequelize');
const conn = require('../conn');

const Advisor = conn.define('advisor', {
  name: Sequelize.STRING
});

module.exports = Advisor;