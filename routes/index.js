const router = require('koa-router')();

const usersController = require('../controllers/usersController');
const tasksController = require('../controllers/tasksController');
const commoditiesBC = require('../blockchain/commoditiesBC');

const { authorizeUser } = require('../handlers/authHandlers.js');

const usersDb = require('../models/usersDb.js');

router.get('/me', authorizeUser, usersController.me); 

router.get('/test', async (ctx) => {
  // console.log(ctx.businessNetwork.getAssetRegistry('org.acme.biznet.Commodity'));
  const users = await ctx.businessNetwork.getParticipantRegistry('org.acme.biznet.User')
  .then(registry => {registry.getAll().then(data=>{console.log("users", data);});});
  const wallet = await ctx.businessNetwork.getAssetRegistry('org.acme.biznet.Commodity')
  .then(registry => {registry.getAll().then(data=>{console.log("wallets", data);});});
});

router.get('/login', usersController.login);

router.get('/users', usersController.getUsers);
router.get('/users/:id', usersController.getUser);
router.post('/users', usersController.addProfiles);

router.get('/tasks', authorizeUser, tasksController.searchTasks);
router.post('/tasks', authorizeUser, tasksController.createTask);
router.put('/tasks/:id', authorizeUser, tasksController.updateTask); 
router.delete('/tasks/:id', authorizeUser, tasksController.deleteTask);

router.get('/myasktasks', authorizeUser, tasksController.getMyAskTasks);
router.get('/mydotasks', authorizeUser, tasksController.getMyDoTasks);

module.exports = router;