const router = require('express').Router();
const controller = require('../controllers/index');

router.get('/all', controller.find_all);
router.post('/insert', controller.insert_one);

module.exports = router;
