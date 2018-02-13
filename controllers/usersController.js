const usersDb = require('../models/usersDb.js')
const usersBC = require('../blockchain/usersBC.js')
const commoditiesBC = require('../blockchain/commoditiesBC.js')
const tasksDb = require('../')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const generateUserId = async (ctx) => {
  let id = '_' + Math.random().toString(36).substr(2, 9);
  // BELOW SHOULD BE DONE ON BLOCKCHAIN, NOT DB
  const doesItExist = await usersDb.doesItExist('userId', id)
  if (doesItExist) return generateUserId();
  return id;
}

const generateWalletId = async (ctx) => {
  let id = '_' + Math.random().toString(36).substr(2, 9);
  const doesItExist = await usersDb.doesItExist('walletId', id)
  if (doesItExist) return generateWalletId();
  return id;
}

const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
}


exports.addProfiles = async(ctx) => {

  // check if email already exists
  const doesEmailExist = await usersDb.doesItExist("email", ctx.request.body.email);
  if (doesEmailExist) {
    ctx.body = "Email already in use.";
    ctx.status = 400;
  }

  // Add or modify required data before sending to database
  const userId = await generateUserId();
  // const walletId = await generateWalletId();
  ctx.request.body.userId = userId;

  ctx.request.body.balance = 240;
  ctx.request.body.password = encryptPassword(ctx.request.body.password)
  ctx.request.body.picture = "";

  // add user to blockchain
  usersBC.addUser(ctx, userId)

  // add new wallet to the blockchain
  const walletId = commoditiesBC.addWallet(ctx, userId)
  ctx.request.body.walletId = walletId;
  // .then(usersRegistry => { usersRegistry.getAll().then(users => {console.log('users', users)})})

  //add to my database
  usersDb.addUser(ctx);
  ctx.status = 200;
}
  // customers.addCustomers(ctx.body);

exports.signin = async (ctx, next) => {
  if ('GET' != ctx.method) return await next();
  try {
    const buff = new Buffer(ctx.headers.authorization.split(" ")[1], 'base64');
    const userpassword = buff.toString('ascii').split(":");
    const email = userpassword[0];
    const password = userpassword[1];
    const userData = await usersDb.getUser("email", email);
    const res = bcrypt.compareSync(password, userData.password)
    if (res) {
      ctx.status = 200;
      ctx.session.userId = userData.userId;
      ctx.body = JSON.stringify([ctx.token, userData]);
      console.log(userData)
    } else {
      ctx.status = 401;
      ctx.body = "Incorrect password";
    }
  }
  catch (error) {
    console.error(error);
  }
}

exports.me = async (ctx, next) => {
  if ('GET' !== ctx.method) return await next();
  console.log("hi", ctx.user);
  try {
    // Get current time balance from the blockchain
    const walletId = ctx.user.walletId;
    const wallet = await ctx.businessNetwork.getAssetRegistry('org.acme.biznet.Commodity')
    .then(commodityRegistry => {return commodityRegistry.get(walletId).then(data=>data)})
    ctx.user.balance = wallet.quantity;
    console.log("ctx.user", ctx.user);
    ctx.response.body = ctx.user;
    ctx.status = 200;
  }
  catch (error) {
    console.error(error);
  }

}



exports.getUser = async(ctx) => {
  try {
    const userId = ctx.params.userId;
    const userData = await usersDb.getUser("userId", userId);
    ctx.response.body = userData;
    ctx.status = 200;
  }
  catch (error) {
    console.error(error);
  }
}

exports.getUsers = async(ctx) => {
  try {
    let userList = ctx.params.userList;
    const userData = await usersDb.getUsers(userList);
    ctx.response.body = userData;
    ctx.status = 200;
  }
  catch (error) {
    console.error(error);
  }
}
//
// exports.update = (ctx) => {
//
// }
//
// exports.delete = (ctx) => {
//
//
// }
