const router = require('express').Router();
const controller = require('../controllers/index');

router.get('/categories', controller.find_categories);
router.get('/category/:category/topics', controller.find_topics);
router.get('/category/:category/:topic', controller.find_topic);
router.get('/workspaces', controller.find_workspaces);
router.get('/workspace/:workspaceId', controller.find_workspace);
router.post('/addResource', controller.add_resource);
router.post('/createWorkspace', controller.create_workspace);
router.post('/createSection', controller.create_section);
router.post('/updateHeaders', controller.update_headers);
router.post('/updateOneSection', controller.update_one_section);
router.delete('/deleteSection', controller.delete_one_section);

module.exports = router;
