const User = require('../models/User')

module.exports = (req, res, next) => {
    let user = new User({
        name: req.body.name,
        login: req.body.login,
        pass: req.body.pass
    })
    console.log(user)
    user.register((err, info) => {
        if (err) {
            res.error(err.message)
            return res.redirect('back')
        }
        res.message(`user ${user.login} has been registered!`)
        res.redirect('/login')
    })
}