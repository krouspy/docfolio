const router = require('express').Router();
const controller = require('../controllers/index');

router.get('/categories', controller.find_categories);
router.get('/category/:category', controller.find_category);
router.get('/workspaces', controller.find_workspaces);
router.post('/add', controller.insert_one);

module.exports = router;
