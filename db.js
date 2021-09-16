const Sequelize = require("sequelize")

const sequelize = new Sequelize("postgres://postgres:One2three@localhost:5432/projectServer")

module.exports = sequelize