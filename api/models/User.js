module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: DataTypes.STRING,
      email: { type: DataTypes.STRING, required: true, validate: { isEmail: true } },
      is_admin: { type: DataTypes.BOOL, defaultValue: false },
    },
    {},
  );
  user.associate = function(models) {
    user.hasMany(models.pet, {
      as: "pets",
      foreignKey: "user_id",
    });
  };

  user.findByEmail = email => {
    return user.findOne({ where: { email } });
  };

  return user;
};
