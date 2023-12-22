const router = require('express').Router()

router.post('/register', (req,res) => {
    res.send('This is register page')
})

router.post('/login', (req,res) => {
    res.send('This is login page')
})

module.exports = router