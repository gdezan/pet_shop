module.exports = (sequelize, DataTypes) => {
  const pet = sequelize.define(
    "pet",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      breed: DataTypes.STRING,
      age: DataTypes.INTEGER,
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {},
  );

  pet.associate = models => {
    pet.belongsTo(models.user, { foreignKey: "user_id", as: "user" });
  };

  return pet;
};
