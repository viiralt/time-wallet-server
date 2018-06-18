require('dotenv').config({ path: `${__dirname}/../.env` });
const fs = require('fs');

const mysql = require('mysql');

// TODO: move this to .env

const connection = mysql.createConnection({
  database: 'time_currency',
  user:'root',
  password:'root'
});

const Users = require('../models/User');
const Tasks = require('../models/Task');

const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const tasks = JSON.parse(fs.readFileSync(`${__dirname}/tasks.json`, 'utf-8'));

async function deleteData() {
  console.log(`😢😢 too-da-loo, data...\n`);
  
  await users.delete();
  await tasks.delete();

  console.log('Data deleted. To load sample data, run:\n\n\t npm run sample\n\n');
  process.exit();
}

async function loadData() {
  try {
    await Users.insertMany(users);
    await Tasks.insertMany(tasks);
    
    console.log('👍👍👍 Sample data added!\n\n');
    process.exit();
  } catch (e) {
    console.log(
      '\n👎👎👎 Error! Make sure to drop the existing database first with:\n\n\t npm run nukeit\n\n\n'
    );
    console.log(e);
    process.exit();
  }
}

if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
  console.log();
}