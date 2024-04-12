import mongoose from 'mongoose'
import {DB_NAME} from '../constants.js'

async function connectDB(){
    try {
        const db_uri = process.env.MONGODB_URL
        console.log(db_uri)
        const dbName = DB_NAME
        const dbConnection = await mongoose.connect(`${db_uri}/${dbName}`)
        console.log(`\t MongoDb Connected! DB HOST: ${dbConnection.connection.host}`)
    } catch (error) {
        console.log(`Error Connection to MongoDB`,error)
        process.exit(1)       
    }
}

export default connectDB