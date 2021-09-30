require('dotenv').config()

const Express = require("express")
const app = Express()
const dbConnection = require("./db")
require("dotenv").config()
const cors = require('cors')
app.use(require("./middleware/headers"))
app.use(cors())

const controllers = require("./controllers")

app.use(Express.json())

app.use("/user", controllers.userController)

app.use(require("./middleware/validate-jwt"))
app.use("/character", controllers.characterController)
app.use("/fight", controllers.fightController)


dbConnection.authenticate()
    .then(() => dbConnection.sync()) //{force: true}
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]: App is listening on 3000.`)
        })
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`)
    })
