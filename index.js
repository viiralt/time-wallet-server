const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('kcors');
const logger = require('koa-logger');
const blockchain = require('./blockchain.js');

const usersDb = require('./models/usersDb.js');
const errorHandlers = require('./handlers/errorHandlers');
const authHandlers = require('./handlers/authHandlers');

const app = new Koa();
const router = require('./routes/');

require('dotenv').config;

app
  .use(logger())
  .use(bodyParser())
  .use(cors())
  .use(blockchain);


//! SHOULD THESE BE MOVED?

const sessions = {};

const generateSid = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

app.use(async (ctx, next) => {
  let sid = ctx.headers.token;

  if (!sid) sid = await generateSid();

  if (!sessions[sid]) sessions[sid] = {};
  ctx.session = sessions[sid];
  ctx.token = sid;
  return await next();
});

app.use(async (ctx, next) => {
  let token = ctx.token;
  if (!token) return await next();
  ctx.user = await usersDb.getUser("token", token);
  console.log("am i authorized", ctx.user);

  return await next();
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(authHandlers.authorizeUser)
  .use(errorHandlers.notFound)
  .use(errorHandlers.validationErrors);

if (process.ENV === 'development') {
  app.use(errorHandlers.developmentErrors);
}

app.use(errorHandlers.productionErrors);

const server = app.listen(process.env.PORT || 3006, () => {
  console.log(`Time Wallet API now serving → PORT ${server.address().port}`);
});

module.exports = app;
