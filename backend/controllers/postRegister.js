const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const postRegister = async (req,res) => {
    try {
        const { email, username, password } = req.body;

        const userExists = await User.exists({ email: email.toLowerCase() })
    
        // check if user alreay exist
        if (userExists) {
            res.status(409).send('Email already exists')
        }
    
        // password encryption
        const encryptedPassword = await bcrypt.hash(password, 10)
    
        const user = User.create({
            email: email.toLowerCase(),
            username,
            password: encryptedPassword
        })


        // access token to be saved on the client side
        const token = jwt.sign(
            {
                userid: (await user)._id,
                email: (await user).email
            }, 
            process.env.TOKEN_KEY,
            {
                expiresIn: "24h"
            }
        )

        res.status(201).json({
            userdetails: {
                username: (await user).username,
                email: (await user).email,
                token: token
            }
        })
    }
    catch {
        res.status(500).send("OOPS! please try again")
    }
}

module.exports = postRegister;