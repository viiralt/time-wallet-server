'use strict';
/**
 * Track the trade of something from one user to another
 * @param {org.acme.biznet.PayUser} trade - the trade to be  processed @transaction
 */

function payUser(trade) {
  trade.commodityFrom.quantity = trade.commodityFrom.quantity - trade.amount;
  trade.commodityTo.quantity = trade.commodityTo.quantity + trade.amount;
  return getAssetRegistry('org.acme.biznet.Commodity')
    .then(function (assetRegistry) {return assetRegistry.updateAll([trade.commodityFrom, trade.commodityTo]);})
}
