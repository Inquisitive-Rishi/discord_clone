const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const postLogin = async (req,res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email })
    
        if (user && (await bcrypt.compare(password, user.password))) {

            const token = jwt.sign(
                {
                    userid: user._id,
                    email: user.email
                }, 
                process.env.TOKEN_KEY,
                {
                    expiresIn: "24h"
                }
            )
            
            return res.status(200).json({
                userDetails: {
                    username: user.username,
                    email: user.email,
                    token: token
                }
            })
        }
        return res.status(400).send('Invalid credentials: try again!')    
    } catch (error) {
        return res.status(500).send('Something went wrong, please try again :(')
    }
}

module.exports = postLogin;