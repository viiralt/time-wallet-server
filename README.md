# Time Wallet (Server)

This is the repo for the server and blockchain network for Time Wallet. For more information on the app or instructions on setting up the client side, please see [time-wallet-client](https://github.com/redspanner/time-wallet-client)

# Running the Backend

## Prerequisites:
- [npm] (https://www.npmjs.com/)  
- [mySql] (https://www.mysql.com/)
- [Node] (https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [Hyperledger Composer](https://hyperledger.github.io/composer/installing/development-tools.html)
* to install composer cli
  `npm install -g composer-cli@0.16.3`
* to install composer-rest-server
  `npm install -g composer-rest-server@0.16.3`
* to install generator-hyperledger-composer
  `npm install -g generator-hyperledger-composer@0.16.3`
  
IMPORTANT: if you install the latest versions of Hyperledger Composer, Composer Rest Server, and Composer CLI instead of v0.16.3, the following instructions WILL NOT work.

## Steps
  1. [Fork the repo](#1-fork-the-repo)
  2. [Clone the repo](#2-clone-the-repo)
  3. [Setup Fabric](#3-setup-fabric)
  4. [Generate the Business Network Archive](#4-generate-the-business-network-archive)
  5. [Deploy to Fabric](#5-deploy-to-fabric)
  6. [Set up mySql](#6-clone-the-repo)

## 1. Fork the Repo

  Fork the `time-wallet-server` code from https://github.com/redspanner/time-wallet-server.

## 2. Clone the Repo

  Clone the `time-wallet-server` code from your fork. In a terminal window, run:

  `git clone https://github.com/[your-github-profile-name]/time-wallet-server.git`

## 3. Setup Fabric

This command will kill and remove all running Docker containers, and should remove all previously created HyperLedger Fabric chaincode images:

```none
docker kill $(docker ps -q)
docker rm $(docker ps -aq)
docker rmi $(docker images dev-* -q)
```

Set Hyperledger Fabric version to v1.0:

`export FABRIC_VERSION=hlfv1`

All the scripts will be in the directory `/fabric-tools`. Start fabric and create a peer admin card:

```
cd fabric-tools/
./downloadFabric.sh
./startFabric.sh
./createPeerAdminCard.sh
```

If done correctly, this should yield a success message.

## 4. Generate the Business Network Archive

Next, generate the Business Network Archive (BNA) file from the root directory:

```
cd ../time-currency-network/
composer archive create -t dir -n .
```

## 5. Deploy to Fabric

We are ready to deploy the network to Hyperledger Fabric. First, the Hyperledger Composer chaincode needs to be installed on the peer. Then, the business network archive (.bna), must be sent to the peer, and a new participant, identity and associated card m2.

```
composer runtime install -c PeerAdmin@hlfv1 -n time-currency-network
composer network start --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw --archiveFile time-currency-network@0.0.1.bna --file networkadmin.card
```

## 6. Set up MySQL

In the terminal, run:

`mysql --password -u root -p`

When prompted, enter the mySql password, which has been set to `root`. Once connected, you should see the `mysql>` prompt. Now, run the following command:

`create database time_currency;`

## 7. Run the server

In a new tab in the terminal, run:
```
npm install
nodemon
```
## 8. Perform the database migration / seeding

Since Time Wallet is using a relational database (MySQL), we've added database migration and seed (mock data set) tooling to get you up and running. The `package.json` already includes Sequelize, an ORM that is used to perform the migration. In your terminal, run the following commands in the root server directory: 

```
node_modules/.bin/sequelize db:migrate
node_modules/.bin/sequelize db:seed:all
```

Provided there were no errors, this accomplished two things:

- In the `time_currency` database you created earlier, there will be two new, interlinked tables for users and tasks
- Both tables are populated by mock data; a set of users and associated tasks 

In order to verify this, in the terminal tab that is connected to the MySQL database, run:

```
use time_currency
describe users;
select * from users;
```

The first command will list the table structure while the second lists all entries in it.

If at any point the database table structure or mock data needs to be altered, the migration files can be found in the `/config /migrations /seeders` directories. To alter the tables, first run:

`node_modules/.bin/sequelize db:migrate:undo:all`

This will revert the database back to the original state. Once the table structure has been updated and the necessary changes made to all the models, run:

`node_modules/.bin/sequelize db:migrate`

## 9. You're ready to set up the front end!

Navigate to [time-wallet-client](https://github.com/redspanner/time-wallet-client) and follow the instructions in the README.md to finish the setup and run the application.
