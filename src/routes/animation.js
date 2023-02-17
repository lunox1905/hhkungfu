var express = require('express');
var router = express.Router();

const animationController = require('../app/controllers/AnimationController');
const ManagerController = require('../app/controllers/ManagerController');
router.all('/*', function (req, res, next) {
    req.app.locals.layout = 'main'; // set your layout here
    next(); // pass control to the next handler
    });
router.get('/:slug', animationController.show);
router.get('/:flim/:slug', animationController.watch);
router.post('/flimByTime', animationController.getFlimByTime)
module.exports = router;