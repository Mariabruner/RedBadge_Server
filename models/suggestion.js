const { DataTypes } = require("sequelize")
const db = require("../db")

const Suggestion = db.define("suggestion", {
    text: {
        type: DataTypes.STRING(10000),
        allowNull: false, 
    }
})

module.exports = Suggestion