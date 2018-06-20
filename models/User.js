module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    balance: {
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.STRING,
      unique: true
    },
    wallet: {
      type: Sequelize.STRING,
      unique: true
    },
    token: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    }
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Task, {
      foreignKey: 'taskId',
      onDelete: 'CASCADE'
    });
  };
  return User;
};

