const Sequelize = require('sequelize');
const conn = require('../conn');

const Advisor = conn.define('advisor', {
  name: Sequelize.STRING,
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
});

module.exports = Advisor;