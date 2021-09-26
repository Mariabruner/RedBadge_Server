const { DataTypes } = require("sequelize")
const db = require("../db")

const Fight = db.define("fight", {
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