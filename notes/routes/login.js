const User = require('../models/User')
const express = require('express')
const router = express.Router()
const loginUser = require('../middleware/loginUser')

router.get('/', (req, res) => {
    res.render('login', { title: 'Login' })
})

router.post('/', loginUser)

module.exports = router
