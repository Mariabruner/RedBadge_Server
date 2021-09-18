const { DataTypes } = require("sequelize")
const db = require("../db")

const Fight = db.define("fight", {
    contestantOne: {
        type: DataTypes.INTEGER(),
        allowNull: false, 
    }, 
    contestantTwo: {
        type: DataTypes.INTEGER(),
        allowNull: false,
    },
    numFaceOffs: {
        type: DataTypes.INTEGER()
    },
    characterOneWins: {
        type: DataTypes.INTEGER(),
    },
    characterTwoWins: {
        type: DataTypes.INTEGER(),
    }
  
})

module.exports = Fight