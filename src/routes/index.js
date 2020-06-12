const controller = require('../controllers/index');

module.exports = (express, passport) => {
  const router = express.Router();

  router.get('/categories', controller.find_categories);
  router.get('/category/:category/topics', controller.find_topics);
  router.get('/category/:category/:topic', controller.find_topic);
  router.get('/workspace/:workspaceId/headings', controller.get_headings);
  router.get('/workspaces', controller.find_workspaces);
  router.get('/workspace/:workspaceId', controller.find_workspace);
  router.post('/addResource', controller.add_resource);
  router.post('/createWorkspace', controller.create_workspace);
  router.post('/updateContent', controller.update_content);
  router.post('/addSource', controller.add_link_to_workspace);
  router.post('/registerUser', controller.register_user);
  router.delete('/resource/delete/:id', controller.delete_resource);
  router.post('/login', passport.authenticate('login', { successRedirect: '/', failureRedirect: '/sign-up' }));

  return router;
};
