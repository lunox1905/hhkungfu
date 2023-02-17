var express = require('express');
var router = express.Router();

const siteController = require('../app/controllers/SiteController')
router.all('/*', function (req, res, next) {
    req.app.locals.layout = 'main'; // set your layout here
    next(); // pass control to the next handler
    });
router.get('/search', siteController.search);
router.post('/handle', siteController.handle);
router.get('/', siteController.index);
router.get('/category/:id', siteController.getFlimByCategory)
router.get('/login', siteController.login)
router.post('/login', siteController.handleLogin)
router.get('/register', siteController.register)
router.post('/register', siteController.handleRegister)

module.exports = router;