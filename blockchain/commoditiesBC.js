const services = require('../services/services.js')

exports.addWallet = (ctx, userId) => {
  const walletId = services.generateCode();

  const factory = ctx.businessNetwork.getBusinessNetwork().getFactory();
  const wallet = factory.newResource('org.acme.biznet', 'Commodity', walletId);

  wallet.quantity = 240;
  wallet.owner = userId;
  wallet.description = "";
  ctx.businessNetwork.getAssetRegistry('org.acme.biznet.Commodity')
  .then(commodityRegistry => {commodityRegistry.add(wallet)})
  return walletId;
}

exports.payUser = (ctx, walletFrom, walletTo, amount) => {

  // const factory = ctx.businessNetwork.getBusinessNetwork().getFactory();
  // const transaction = factory.newResource('org.acme.biznet', 'PayUser', "1");
  //
  // transaction.commodityFrom = walletFrom; // get commodityFrom from database;
  // transaction.commodityTo = walletTo; // get commodityTo from database;
  // transaction.amount = amount;

  let serializer = ctx.businessNetwork.businessNetwork.getSerializer();
  let resource = serializer.fromJSON({
    '$class':'org.acme.biznet.PayUser',
    'commodityFrom': walletFrom,
    'commodityTo': walletTo,
    'amount':amount,
  })

  ctx.businessNetwork.submitTransaction(resource);
  // ctx.businessNetwork.businessNetwork.submitTransaction(resource);
  // ctx.businessNetwork.getTransactionRegistry('org.acme.biznet.PayUser')
  // .then(registry => {
  //   console.log(registry);
  //   registry.submitTransaction(resource)})
}
