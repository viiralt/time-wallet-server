module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      postDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      taskId: {
        type: Sequelize.STRING
      },
      taskRequestedBy: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userTaskPool: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      time: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      picture: {
        type: Sequelize.STRING
      },
      /* location: {
        type: Sequelize.GEOMETRY('POINT')
      } */
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tasks');
  }
};

