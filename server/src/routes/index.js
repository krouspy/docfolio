const router = require('express').Router();
const controller = require('../controllers/index');

router.get('/category/:category', controller.find_category);
router.get('/categories', controller.find_categories);
router.post('/add', controller.insert_one);

module.exports = router;
