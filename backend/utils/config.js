require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const TOKEN_KEY = process.env.TOKEN_KEY;

module.exports = {
    MONGODB_URI, PORT, TOKEN_KEY
}