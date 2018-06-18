const mysql = require('mysql');

const connection = mysql.createConnection({
  database: 'time_currency',
  user:'root',
  password:'root'
});

connection.connect();

exports.addUser = (ctx) => {
  console.log(ctx.request.body);
  email: ctx.request.body.email;
  password: ctx.request.body.password;
  firstname: ctx.request.body.firstName;
  lastname: ctx.request.body.lastName;
  location: ctx.request.body.location;
  balance: ctx.request.body.balance;
  userid: ctx.request.body.userId;
  wallet: ctx.request.body.wallet;
  const query = connection.query(`INSERT into users SET ?`, ctx.request.body, (error) => {
    if (error) throw error;
  });
};


// exports.getAll = () => {
//   return new Promise ((resolve, reject) => {
//     connection.query(`SELECT * FROM users`, (error, results) => {
//      if (error) reject(error);
//      else resolve(results);
//    })
//   })
// }

// exports.getUserIds = () => {
//   return new Promise ((resolve, reject) => {
//     connection.query(`SELECT userId FROM users`, (error, results) => {
//      if (error) reject(error);
//      else resolve(results);
//    })
//   })
// }
exports.insertToken = (user, value) => {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE users SET token = "${value}" WHERE userid ="${user}"`, (error, results) => {
      if (error) reject(error);
      else resolve(results.length>0);
    });
  });
};


exports.doesItExist = (field, value) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM users where ${field} = "${value}"`, (error, results) => {
      if (error) reject(error);
      else resolve(results.length>0);
    });
  });
};

exports.getUser = (field, value) => {
  return new Promise ((resolve, reject) => {
    connection.query(`SELECT * FROM users WHERE ${field} = "${value}"`, (error, results) => {
      if (error) reject(error);
      else resolve(results[0]);
    });
  });
};

exports.getUsers = (userList) => {
  let myString = '(' + userList.split(",").map(elem=>`"${elem}"`).join(',') + ')';
  return new Promise ((resolve, reject) => {
    connection.query(`SELECT * FROM users WHERE userId in ${myString}`, (error, results) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
};

exports.getEmails = () => {
  return new Promise ((resolve, reject) => {
    connection.query(`SELECT email FROM users`, (error, results) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
};

exports.getWalletId = (userId) => {
  return new Promise ((resolve, reject) => {
    connection.query(`SELECT walletId FROM users WHERE userId = "${userId}"`, (error, results) => {
      if (error) reject(error);
      else resolve(results[0]);
    });
  });
};
