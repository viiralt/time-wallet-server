module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'hannahjredler@gmail.com',
      password: 'hannahredler',
      firstName: 'hannah',
      lastName: 'redler',
      balance: 240,
      userId: '_idgsagsh0',
      wallet: '_985nvkfyv',
      token: '_ksgn4ugu4',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email: 'johndoe@gmail.com',
      password: '123',
      firstName: 'john',
      lastName: 'doe',
      balance: 240,
      userId: '_b8sg32fv9',
      wallet: '_lagabu432',
      token: '_qtgw45gu4',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email: 'janedoe@gmail.com',
      password: '123',
      firstName: 'jane',
      lastName: 'doe',
      balance: 240,
      userId: '_by3sgv90m',
      wallet: '_mbshu7413',
      token: '_52wgwb9u4',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, 
    {
      email: 'doedoe@gmail.com',
      password: '123',
      firstName: 'doe',
      lastName: 'doe',
      balance: 240,
      userId: '_ksg83gkgf',
      wallet: '_9427tnnfs',
      token: '_852w141vv',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email: 'robobob@gmail.com',
      password: '123',
      firstName: 'robo',
      lastName: 'bob',
      balance: 240,
      userId: '_mwu4t8bnr',
      wallet: '_d8v0gfnlh',
      token: '_852wgcvu4',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, 
    {
      email: 'jigglyjill@gmail.com',
      password: '123',
      firstName: 'jill',
      lastName: 'jiggles',
      balance: 240,
      userId: '_9784ngkgr',
      wallet: '_svbbnm33',
      token: '_mwivwevu4',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};