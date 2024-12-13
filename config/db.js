const mongoose = require('mongoose')
require('dotenv').config()


const connectDb = async() => {

    try{
        const mongoUri = process.env.MONGODB_URI
        const connect =  await mongoose.connect(mongoUri)
        console.log(`MongoDb connected: ${connect.connection.host}`)

    }
    catch(err) {
        console.log(`Error: ${err.message}`)
        console.log(`Error: ${err.cause}`)
    }
}

module.exports = connectDb;