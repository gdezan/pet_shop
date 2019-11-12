"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        allowNull: false,
      },
      name: Sequelize.DataTypes.STRING,
      phone: Sequelize.DataTypes.STRING,
      zip_code: { type: Sequelize.DataTypes.STRING },
      address: Sequelize.DataTypes.STRING,
      email: {
        type: Sequelize.DataTypes.STRING,
        required: true,
        validate: { isEmail: true },
      },
      password: { type: Sequelize.DataTypes.STRING, required: true },
      is_admin: { type: Sequelize.DataTypes.BOOLEAN, defaultValue: false },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  },
};
