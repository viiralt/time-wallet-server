'use strict';

const Router = require('koa-router');
const router = new Router();

const conf = require('./config.js');
const usersController = require('./controllers/usersController');
const tasksController = require('./controllers/tasks');
const commoditiesBC = require('./blockchain/commoditiesBC')

const usersDb = require('./models/usersDb.js')

const authorize = async (ctx, next) => {
  if (!ctx.user) {
    ctx.status = 401;
    return;
  }
  await next();
};

router.get('/testPayment', )

router.get("/me", authorize, usersController.me)

router.get("/test", async (ctx) => {
  // console.log(ctx.businessNetwork.getAssetRegistry('org.acme.biznet.Commodity'));
  const users = await ctx.businessNetwork.getParticipantRegistry('org.acme.biznet.User')
  .then(registry => {registry.getAll().then(data=>{console.log("users", data);})})
  const wallet = await ctx.businessNetwork.getAssetRegistry('org.acme.biznet.Commodity')
  .then(registry => {registry.getAll().then(data=>{console.log("wallets", data);})})
})

router.post('/createUser', usersController.addProfiles)
router.get('/signin', usersController.signin)

router.get('/getUser/:userId', usersController.getUser)
router.get('/getUsers/:userList', usersController.getUsers)

router.get('/myAskTasks', authorize, tasksController.getMyAskTasks)
router.get('/myDoTasks', authorize, tasksController.getMyDoTasks)
router.post('/task', authorize, tasksController.createTask)
router.put('/task/:taskId', authorize, tasksController.update)
router.delete('/task/:taskId', tasksController.delete)
router.get('/searchTasks', authorize, tasksController.searchTasks)



router.get('/*', () => {
  // Catchall for not found
  this.status = 404;
  this.body = _404;
});

module.exports = router;
