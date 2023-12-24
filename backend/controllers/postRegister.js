const User = require('../models/user')
const bcrypt = require('bcryptjs')

const postRegister = async (req,res) => {
    try {
        const { email, username, password } = req.body;

        const userExists = await User.exists({ email: email.toLowerCase() })
    
        // check if user alreay exist
        if (userExists) {
            res.send(409).send('Email already exists')
        }
    
        // password encryption
        const encryptedPassword = await bcrypt.hash(password, 10)
    
        const user = User.create({
            email: email.toLowerCase(),
            username,
            password: encryptedPassword
        })


        // access token to be saved on the client side
        const token = 'this will be a jwt token'

        res.status(201).json({
            userdetails: {
                username: user.username,
                email: user.email,
                token: token
            }
        })
    }
    catch {
        res.send(500).send("OOPS! please try again")
    }
}

module.exports = postRegister;