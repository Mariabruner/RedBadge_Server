const Express = require("express")
const router = Express.Router()
const { FightModel } = require("../models")
const { UniqueConstraintError, EmptyResultError } = require("sequelize/lib/errors")
const Fight = require("../models/fight")
const { userController } = require(".")

let validateJWT = require('../middleware/validate-jwt')


//Create a new fight combo
router.post("/create", async (req, res) => {
    //check if fight already exists
    query = {
        where: {
            characterOneId: req.body.fight.characterOneId,
            characterTwoId: req.body.fight.characterTwoId
        }
    }
    result = await FightModel.findAll(query)
    console.log("line 16", result[0])

    if (!result[0]) {
        //create new fight if fight does not exist
        try {
            const Fight = await FightModel.create({
                characterOneId: req.body.fight.characterOneId,
                characterTwoId: req.body.fight.characterTwoId,
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
        console.log(result)
        res.status(500).json({
            message: "Fight combo already exists"
        })
    }
})


// router.get("/character/:cid", async(req, res) => {
//     try {
//         const character = await Character.findAll({
//             where: { id: req.params.cid },
//             include: { 
//                 model: FightModel
//             }
//         })
//         res.json(character)
//     } catch (err) {
//         res.json({ error: err })
//     }
// })

//Get a fight combo using both character ids
router.get("/find", async (req, res) => {

    try {
    query = {
        where: {
            characterOneId: req.body.characterOneId,
            characterTwoId: req.body.characterTwoId
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
router.put("/updateWins/:wid/:c1id/:c2id", async (req, res) => {
    const { wid, c1id, c2id } = req.params
    query = {
        where: {
            characterOneId: c1id,
            characterTwoId: c2id
        }
    }
    result = await FightModel.findOne(query)

    let updatedCharOneWins = result.characterOneWins
    let updatedCharTwoWins = result.characterTwoWins

    //update appropriate character's win count
    if (wid === c1id) {
        updatedCharOneWins = updatedCharOneWins + 1
    } else if (wid === c2id) {
        updatedCharTwoWins = updatedCharTwoWins + 1
    }
    let updatedFaceOffs = result.numFaceOffs + 1

    updatedFight = {
        characterOneId: result.characterOneId,
        characterTwoId: result.characterTwoId,
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


//delete a fight combo
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params

    const query = {
        where: {
            id: id
        }
    }

    try {
        await FightModel.destroy(query)
        res.status(200).json({ message: "Fight removed" })
    } catch (err) {
        res.status(500).json({ message: "Fight not removed" })
    }
})
module.exports = router