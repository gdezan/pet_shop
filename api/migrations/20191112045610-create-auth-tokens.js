module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "auth_tokens",
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
        },
        token: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.UUID,
          references: {
            model: "users",
            key: "id",
          },
        },

      createdAt: { type: Sequelize.DATE, underscored: true },
      updatedAt: { type: Sequelize.DATE, underscored: true },
      },
      { tableName: "auth_tokens" },
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("auth_tokens");
  },
};
