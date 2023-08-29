const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Correctly import Sequelize instance

const Category = sequelize.define('category', {
   intId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
   name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
   }
}, {
   // Define additional model options here
   tableName: 'category', // Custom table name
   timestamps: true, // If you want timestamps (createdAt and updatedAt fields)
});

// Before validation hook
Category.beforeValidate((user, options) => {
   if (user.name) {
      user.name = user.name.trim(); // Trim the name attribute
   }
});

module.exports = Category;

