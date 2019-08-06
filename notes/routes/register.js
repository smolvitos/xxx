const express = require('express')
const router = express.Router()
const registerUser = require('../middleware/registerUser')
const checkField = require('../functions/validators').checkField


router.get('/', (req, res, next) => {
    res.render('register', { title: 'register' });
})

router.post(
  '/', 
  checkField('name', { required: true }), 
  checkField('login', { required: true }),
  checkField('pass', { required: true, length: 5 }),
  registerUser)
module.exports = router