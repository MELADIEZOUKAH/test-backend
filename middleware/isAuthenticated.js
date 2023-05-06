const isAuthenticated = (req, res, next) => !req.isAuthenticated() ? res.redirect('/auth') : next()

module.exports = { isAuthenticated }