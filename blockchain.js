const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

const fs = require('fs');
const connectionProfile = JSON.parse(fs.readFileSync('./connection.json', 'utf8'));
const businessNetwork = new BusinessNetworkConnection();

const cardName = 'admin@time-currency-network';
const businessNetworkIdentifier = 'time-currency-network';
const networkAdmin = 'admin';
const networkAdminPassword = 'adminpw';


let businessNetworkDefinition;
businessNetwork.connectWithDetails(
        cardName,
        businessNetworkIdentifier,
        networkAdmin,
        networkAdminPassword,
        connectionProfile
)
.catch(err => {
  console.error(err);
})


module.exports = (ctx, next) => {

  ctx.businessNetwork = businessNetwork;

  return next();
}

// module.exports = TradersController;
