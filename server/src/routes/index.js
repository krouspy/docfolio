const router = require('express').Router();
const controller = require('../controllers/index');

router.get('/categories', controller.find_categories);
router.get('/category/:category', controller.find_category);
router.get('/workspaces', controller.find_workspaces);
router.get('/workspace/:workspaceId', controller.find_workspace);
router.post('/addResource', controller.add_resource);
router.post('/createWorkspace', controller.create_workspace);
router.post('/updateWorkspace', controller.update_workspace);

module.exports = router;
