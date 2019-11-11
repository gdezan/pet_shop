module.exports = (sequelize, DataTypes) => {
  const AuthToken = sequelize.define(
    "AuthToken",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    { tableName: "auth_tokens" },
  );

  AuthToken.associate = function(models) {
    AuthToken.belongsTo(models.user, { foreignKey: "user_id", as: "user" });
  };

  AuthToken.generate = async function(user_id) {
    if (!user_id) {
      throw new Error("AuthToken requires a user ID");
    }

    let token = "";

    const possibleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 15; i++) {
      token += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
    }

    return AuthToken.create({ token, user_id });
  };

  return AuthToken;
};
