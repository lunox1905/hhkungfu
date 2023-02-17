var express = require('express');
var router = express.Router();

const managerController = require('../app/controllers/ManagerController');
const checkLogin = require('../ulti/checkLogin');
const checkRole = require('../ulti/checkRole');


router.all('/*', function (req, res, next) {
    req.app.locals.layout = 'manager'; // set your layout here
    next(); // pass control to the next handler
    });
router.get('/createListFlim', checkLogin, checkRole, managerController.createListFlim)
router.post('/storeListFlim', checkLogin, checkRole, managerController.storeListFlim)
router.post('/handle-manager', checkLogin, checkRole, managerController.handleManager)
router.get('/:slug/store', checkLogin, checkRole, managerController.storeManager)
router.get('/:slug/createFlim', checkLogin, checkRole, managerController.createFlim)
router.post('/:slug/storeFlim', checkLogin, checkRole, managerController.storeFlim)
router.get('/:id/edit', checkLogin, checkRole, managerController.edit)
router.get('/:slug/:id/editStoreFlim', checkLogin, checkRole, managerController.editStoreFlim)
router.put('/:id/update', checkLogin, checkRole, managerController.update)
router.put('/:slug/:id/updateStoreFlim', checkLogin, checkRole, managerController.updateStoreFlim)
router.get('/', checkLogin, managerController.index)
router.delete('/:name/:id', checkLogin, checkRole, managerController.deleteListFlim)
router.delete('/manager/:name/:id', checkLogin, checkRole, managerController.deleteFlim)
router.get('/category', checkLogin, checkRole, managerController.getCategory)
router.post('/addCategory', checkLogin, checkRole, managerController.addCategory)
router.get('/deleteCategory/:id', checkLogin, checkRole, managerController.deleteCategory)
router.post('/updateCategory/:id', checkLogin, checkRole, managerController.updateCategory)

module.exports = router;
