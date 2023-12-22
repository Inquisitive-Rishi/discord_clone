require('dotenv').config()
const express = require('express')
const cors = require('cors')
const http = require('http')
const mongoose = require('mongoose')

const app = express()
const server = http.createServer(app)

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log('Server is listening on port', PORT);
})