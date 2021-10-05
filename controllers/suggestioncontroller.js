const Express = require("express")
const router = Express.Router()
const { SuggestionModel, UserModel } = require("../models")
const { UniqueConstraintError, EmptyResultError } = require("sequelize/lib/errors")
const { userController } = require(".")
const bcrypt = require("bcryptjs")

let validateJWT = require('../middleware/validate-jwt')

router.post("/send", async (req, res) => {
    let { text } = req.body.suggestion

    try {
        const Suggestion = await SuggestionModel.create({
            text
        })

        res.status(200).json({
            message: "Suggestion successfully sent",
            
        })
    } catch (err) {
            res.status(500).json({
                message: "Failed to create character"
            })
    }
})
