// src/connectDatabase.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('testnodejs', 'root', 'dinhlan1712', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = connectDB; // Xuất khẩu đúng hàm
