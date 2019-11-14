module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      name: Sequelize.STRING,
      phone: Sequelize.STRING,
      zip_code: { type: Sequelize.STRING, underscored: true },
      address: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        required: true,
        validate: { isEmail: true },
	unique: true
      },
      password: { type: Sequelize.STRING, required: true },
      is_admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        underscored: true
      },
      createdAt: { type: Sequelize.DATE, underscored: true },
      updatedAt: { type: Sequelize.DATE, underscored: true },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  }
};
