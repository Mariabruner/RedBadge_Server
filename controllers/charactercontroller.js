const Express = require("express")
const router = Express.Router()
const { CharacterModel } = require("../models")
const { UniqueConstraintError, EmptyResultError } = require("sequelize/lib/errors")
const { userController } = require(".")

//create new character
router.post("/create", async (req, res) => {

    let { name, imageURL, characterType } = req.body.character

    try {
        const Character = await CharacterModel.create({
            name,
            imageURL,
            characterType,
            fightAppearances: 0,
            votes: 0
        })

        res.status(201).json({
            message: "Character successfully created",
            character: Character
        })
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Character already created",
            })
        } else {
            res.status(500).json({
                message: "Failed to create character"
            })
        }
    }
})



//get characters by id
router.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const results = await CharacterModel.findAll({
            where: { id: id }
        })
        res.status(200).json(results)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }
})


//update characters fight appearances
router.put("/updateFights/:id", async (req, res) => {
    const { id } = req.params
    const query = {
        where: {
            id: id
        }
    }

    try {
        let result_row = await CharacterModel.findOne(query)
        let updated_fights = result_row.fightAppearances + 1
        let name = result_row.name
        let imageURL = result_row.imageURL
        let characterType = result_row.characterType
        let votes = result_row.votes

        const updated_Character = {
            name: name,
            imageURL: imageURL,
            characterType: characterType,
            fightAppearances: updated_fights,
            votes: votes
        }

        try {
            const update = await CharacterModel.update(updated_Character, query)
            res.status(200).json(update)
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }
    } catch (err) {
        console.log(`error in findOne ${err}`)
    }
})

//update votes when a character gets a vote
router.put("/updateVotes/:id", async (req, res) => {
    const { id } = req.params
    const query = {
        where: {
            id: id
        }
    }

    try {
        let result_row = await CharacterModel.findOne(query)
        let fightAppearances = result_row.fightAppearances
        let name = result_row.name
        let imageURL = result_row.imageURL
        let characterType = result_row.characterType
        let votes = result_row.votes + 1

        const updated_Character = {
            name: name,
            imageURL: imageURL,
            characterType: characterType,
            fightAppearances: fightAppearances,
            votes: votes
        }

        try {
            const update = await CharacterModel.update(updated_Character, query)
            res.status(200).json(update)
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }
    } catch (err) {
        console.log(`error in findOne ${err}`)
    }
})

router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params

    const query = {
        where: {
            id: id
        }
    }

    try {
        await CharacterModel.destroy(query)
        res.status(200).json({ message: "Character removed" })
    } catch (err) {
        res.status(500).json({ message: "Character not removed" })
    }
})



module.exports = router