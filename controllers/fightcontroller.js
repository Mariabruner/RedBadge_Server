const Express = require("express")
const router = Express.Router()
const { FightModel } = require("../models")
const { UniqueConstraintError, EmptyResultError } = require("sequelize/lib/errors")

//Create a new fight combo
router.post("/create", async (req, res) => {
    let { contestantOne, contestantTwo } = req.body.fight

    //check if fight already exists
    query = {
        where: {
            contestantOne: contestantOne,
            contestantTwo: contestantTwo
        }
    }
    result = await FightModel.findOne(query)

    if (result === null) {
        //create new fight if fight does not exist
        try {
            const Fight = await FightModel.create({
                contestantOne,
                contestantTwo,
                numFaceOffs: 0,
                characterOneWins: 0,
                characterTwoWins: 0
            })
            res.status(201).json({
                message: "Fight successfully added",
                fight: Fight
            })
        } catch (err) {
            res.status(500).json({
                message: "Failed to create fight"
            })
        }
    } else {
        //response if fight already exists
        res.status(500).json({
            message: "Fight combo already exists"
        })
    }
})

//Get a fight combo using both character ids
router.get("/find", async (req, res) => {
    let { contestantOne, contestantTwo } = req.body.fight

    try {
    query = {
        where: {
            contestantOne: contestantOne,
            contestantTwo: contestantTwo
        }
    }
        result = await FightModel.findOne(query)
        res.status(200).json(result)
    } catch {
        res.status(404).json({
            message: "Fight not found"
        })
    }
})

//Update a character's win count and total number of face offs
router.put("/updateWins", async (req, res) => {
    const { contestantOne, contestantTwo, winnerID } = req.body.fight
    query = {
        where: {
            contestantOne: contestantOne,
            contestantTwo: contestantTwo
        }
    }
    result = await FightModel.findOne(query)

    let updatedCharOneWins = result.characterOneWins
    let updatedCharTwoWins = result.characterTwoWins

    //update appropriate character's win count
    if (winnerID === contestantOne) {
        updatedCharOneWins = updatedCharOneWins + 1
    } else if (winnerID === contestantTwo) {
        updatedCharTwoWins = updatedCharTwoWins + 1
    }
    let updatedFaceOffs = result.numFaceOffs + 1

    updatedFight = {
        contestantOne: result.contestantOne,
        contestantTwo: result.contestantTwo,
        numFaceOffs: updatedFaceOffs,
        characterOneWins: updatedCharOneWins,
        characterTwoWins: updatedCharTwoWins
    }

    try {
        const update = await FightModel.update(updatedFight, query)
        res.status(200).json(update)
    } catch(err) {
        res.status(500).json({ error: err })
    }
})

module.exports = router