require('dotenv').config();

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoute = require('./user')

const port = process.env.port||3000; 
const url = process.env.URL_MONGOOSE; 

const app = express(); 

mongoose.connect(url).then(() => {
    console.log('Connected to Mongodb')
}).catch((error) => {
    console.log('Not connected to mongodb', error);
})

app.use(express.json())
app.use(cors())

app.use('/api/user', userRoute)

app.listen(port, () => {
    console.log('server started')
})

