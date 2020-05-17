const router = require('express').Router();
const controller = require('../controllers/index');

router.get('/categories', controller.find_categories);
router.get('/category/:category', controller.find_category);
router.get('/workspaces', controller.find_workspaces);
router.post('/addResource', controller.add_resource);
router.post('/createProject', controller.create_project);

module.exports = router;
