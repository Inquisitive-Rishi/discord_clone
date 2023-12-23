const router = require('express').Router()
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})

const registerSchema = Joi.object({
    username: Joi.string().min(6).max(14),
    password: Joi.string().min(8).max(14),
    email: Joi.string().email()
})

const loginSchema = Joi.object({
    username: Joi.string().min(6).max(14),
    password: Joi.string().min(8).max(14)
})

const registerValidation = validator.body(registerSchema)
const loginValidation = validator.body(loginSchema)

router.post('/register', registerValidation, async (req,res) => {
    res.send('This is register page')
})

router.post('/login', loginValidation, async (req,res) => {
    res.send('This is login page')
})

module.exports = router