module.exports = (sequelize, DataTypes) => {
  const service = sequelize.define(
    "service",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      type: { type: DataTypes.STRING, allowNull: false },
      scheduled: DataTypes.STRING,
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

  service.associate = models => {
    service.belongsTo(models.user, { foreignKey: "user_id", as: "user" });
  };

  return service;
};
