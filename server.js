require('dotenv').config()
const cors = require('cors')
const express = require('express')
const connectDb = require('./config/db')
connectDb();
const app = express()
const port = process.env.PORT


const userRoutes = require('./Routes/userRoutes')
const listRoutes = require('./Routes/listRoutes')

//middle wares
app.use(cors())
app.use(express.json());
 
app.use(userRoutes)
app.use(listRoutes)

app.listen(port,()=>{
    console.log("server is Running")
})