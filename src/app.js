import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credientals:true,
}))

app.use(cookieParser())
app.use(express.json({limit:"20kb"}))
app.use(express.urlencoded({extended:true, limit:"20kb"}))  //extended allows us to send nested objects
app.use(express.static("public"))

//Router Imports

import userRouter from "./routes/user.routes.js"

//routes declaration
app.use("/api/v1/users",userRouter)


export { app }