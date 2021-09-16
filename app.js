const Express = require("express")
const app = Express()
const dbConnection = require("./db")
require("dotenv").config()

const controllers = require("./controllers")

app.use(Express.json())

app.use("/user", controllers.userController)

app.use(require("./middleware/validate-jwt"))


dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(3000, () => {
            console.log(`[Server]: App is listening on 3000.`)
        })
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`)
    })
