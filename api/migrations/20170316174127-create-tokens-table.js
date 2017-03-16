'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('tokens', {
      id: {
        type: Sequelize.STRING(40),
        unique: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.STRING(40),
        unique: true,
        allowNull: false,
      },
      clientId: {
        type: Sequelize.STRING(40),
        unique: true,
        allowNull: false,
      },
      value: {
        type: Sequelize.STRING(40),
        unique: true,
        allowNull: false,
      }
    });

  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
