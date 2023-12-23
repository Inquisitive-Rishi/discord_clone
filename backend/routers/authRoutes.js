const router = require('express').Router()
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})

const registerSchema = Joi.object({
    username: Joi.string().min(6).max(14).required(),
    password: Joi.string().min(8).max(14).required(),
    email: Joi.string().email().required()
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(14).required()
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