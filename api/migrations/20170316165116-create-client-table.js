'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('clients', {
      id: {
        type: Sequelize.STRING(40),
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      name: Sequelize.STRING(40),
      secret: Sequelize.STRING(40),
      userId: Sequelize.STRING(40)
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('clients');
  }
};
