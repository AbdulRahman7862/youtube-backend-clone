import dotenv from  'dotenv'
import express from 'express'
import connectDB from './db/db.js'
import { app } from './app.js'
dotenv.config()

const port = process.env.PORT || 3500 
connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("Error: ", error)
    })

    app.listen(port,()=>{
        console.log(`App is listening at ${port}`)
    })
})
.catch((error)=>console.log(`Error connecting to MONGODB: ${error}`))

