
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('kcors');
const conf = require('./config.js');
const routes = require('./routes.js');
const blockchain = require('./blockchain.js')
const userDb = require('./models/usersDb.js')

console.log(bodyParser);
app.use(logger());
app.use(bodyParser());
app.use(cors());
app.use(blockchain)

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.body = undefined;
    switch (ctx.status) {
    case 401:
      ctx.app.emit('error', err, this);
      break;
    default:
      if (err.message) {
        ctx.body = {errors:[err.message]};
      }
      ctx.app.emit('error', err, this);
    }
  }
});

const sessions = {};

const generateSid = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
}

app.use(async (ctx, next) => {
  let sid = ctx.headers.token;
  if (!sid) sid = await generateSid();
  if (!sessions[sid]) sessions[sid] = {};
  ctx.session = sessions[sid];
  ctx.token = sid;
  return await next();
})

app.use(async (ctx, next) => {
  let userId = ctx.session.userId;
  if (!userId) return await next();
  ctx.user = await userDb.getUser("userId", userId);
  console.log("am i authorized", ctx.user)
  return await next();
});

app.use(routes.routes());


app.listen(conf.port);

console.log(`Server listening on port ${conf.port}`);
