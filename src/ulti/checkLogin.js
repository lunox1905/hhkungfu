const Users = require('../app/module/User')
const jwt = require('jsonwebtoken')

const checkLogin = (req, res, next) => {
    try {
        const token = req.cookies.hhkungfu_token
        var idUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        Users.findOne({ _id: idUser})
        .then(user => {
            req.data = {_id: user._id, name: user.username, role: user.role}
            next()
        })
        .catch(err => {
            res.render('/login')
        })
    } catch(err) {
        res.redirect('/login')
    }
}

module.exports = checkLogin