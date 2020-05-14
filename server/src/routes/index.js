const router = require('express').Router();
const controller = require('../controllers/index');

router.get('/all', controller.find_all);
router.post('/add', controller.insert_one);

module.exports = router;
