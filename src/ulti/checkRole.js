
const checkRole = (req, res, next) => {
    try {
        if(req.data.role == 'admin') {
            next()
        }
    } catch(err) {
        res.redirect('/manager')
    }
}

module.exports = checkRole