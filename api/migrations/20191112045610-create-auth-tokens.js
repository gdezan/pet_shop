"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "auth_tokens",
      {
        id: {
          type: Sequelize.DataTypes.UUID,
          primaryKey: true,
          defaultValue: Sequelize.DataTypes.UUIDV4,
          allowNull: false,
        },
        token: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.DataTypes.UUID,
          references: {
            model: "users",
            key: "id",
          },
        },
      },
      { tableName: "auth_tokens" },
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("auth_tokens");
  },
};
