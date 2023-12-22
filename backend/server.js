require('dotenv').config()
const express = require('express')
const { info, error } = require('./utils/logger')
const cors = require('cors')
const http = require('http')
const mongoose = require('mongoose')

const authRouter = require('./routers/authRoutes')

const app = express()
const server = http.createServer(app)

app.use(cors())
app.use(express.json())

info('connecting to DB', process.env.MONGODB_URI)

app.use('/api/auth', authRouter)

const PORT = process.env.PORT;
server.listen(PORT, () => {
    info('Server is listening on port', PORT);
})

mongoose.connect(process.env.MONGODB_URI)
.then(() => info('Connected to MongoDB'))
.catch(err => error('Error connecting', err))