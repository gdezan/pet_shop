module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "products",
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, allowNull: false },
        price: Sequelize.DECIMAL,
        category: { type: Sequelize.STRING, allowNull: false },
        discounted_price: { type: Sequelize.DECIMAL, defaultValue: 0 },
        createdAt: { type: Sequelize.DATE, underscored: true },
        updatedAt: { type: Sequelize.DATE, underscored: true },
      },

      {},
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("products");
  },
};
