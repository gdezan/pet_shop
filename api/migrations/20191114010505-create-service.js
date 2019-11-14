module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "services",
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
        },
        type: { type: Sequelize.STRING, allowNull: false },
        scheduled: Sequelize.STRING,
        user_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        createdAt: { type: Sequelize.DATE, underscored: true },
        updatedAt: { type: Sequelize.DATE, underscored: true },
      },
      {},
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("services");
  },
};
