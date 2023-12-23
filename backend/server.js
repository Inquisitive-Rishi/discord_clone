require('dotenv').config()
const express = require('express')
const { info, error } = require('./utils/logger')
const config = require('./utils/config')
const cors = require('cors')
const http = require('http')
const mongoose = require('mongoose')

const authRouter = require('./routers/authRoutes')

const url = config.MONGODB_URI;
const PORT = config.PORT;

const app = express()
const server = http.createServer(app)

app.use(cors())
app.use(express.json())

info('connecting to DB', url)

app.use('/api/auth', authRouter)

server.listen(PORT, () => {
    info('Server is listening on port', PORT);
})

mongoose.connect(url)
.then(() => info('Connected to MongoDB'))
.catch(err => error('Error connecting', err))