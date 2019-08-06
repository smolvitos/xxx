exports.checkField = (field, options) => (req, res, next) => {
  if (options['required'] && !req.body[field]) {
    res.error(`Field ${field} is required`)
    return res.redirect('back')
  }
  if (req.body[field].length < options['length']) {
    res.error(`Field ${field} must me at least ${options['length']} characters`)
    return res.redirect('back')
  }
  next()
}