const { DataTypes } = require("sequelize")
const db = require("../db")

const Character = db.define("character", {
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true    
    },
    imageURL: {
        type: DataTypes.STRING(2000),
        allowNull: false,
    },
    characterType: {
        type: DataTypes.STRING(),
        allowNull: false
    },
    fightAppearances: {
        type: DataTypes.INTEGER(),
    },
    votes: {
        type: DataTypes.INTEGER()
    }
})

module.exports = Character