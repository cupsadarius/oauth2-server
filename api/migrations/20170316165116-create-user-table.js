'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.STRING(40),
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING(40),
        unique: true,
        allowNull: false,
      },
      firstName: Sequelize.STRING(40),
      lastName: Sequelize.STRING(40),
      password: Sequelize.STRING(40),
      salt: Sequelize.STRING(40),
      scope: Sequelize.STRING
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
