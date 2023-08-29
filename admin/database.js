// database.js
const { Sequelize } = require('sequelize');

// Create the tables in the database
const sequelize = new Sequelize('expense-management', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', // or 'postgres', 'sqlite', 'mssql', etc., depending on your database
});

module.exports = sequelize;