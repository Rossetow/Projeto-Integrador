import * as dotenv from "dotenv"
import express from "express"
import bodyParser, * as BodyParser from "body-parser"
import { userRouter } from "../routes/userRouter"
import { integrationRouter } from "../routes/integrationUserPostRouter"

const app = express()
dotenv.config()

app.use(bodyParser.json())
app.use("/user", userRouter)

app.use("/integration", integrationRouter)


app.listen(process.env.PORT, () => {
    console.log("Node server is running")
})