'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const TeamsTable = queryInterface.createTable('teams',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      teamName: {
        field: 'team_name',
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    })
    return TeamsTable;
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('teams');
  }
};
