const router = require('express').Router()
const Joi = require('joi')
const postRegister = require('../controllers/postRegister')
const postLogin = require('../controllers/postLogin')
const auth = require('../middlewares/auth')

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

router.post('/register', registerValidation, postRegister)
router.post('/login', loginValidation, postLogin)

router.get('/test', auth, (req, res) => {
    res.send("request passed")
}) 


module.exports = router