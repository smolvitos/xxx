module.exports = (req, res, next) => {
    if (!req.user) {
        res.error('You must be authorized before to perform this action')
        return res.redirect('/login')  
    }
    next()
}