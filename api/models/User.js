import bcrypt from "bcrypt";

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
      password: { type: DataTypes.STRING, required: true },
      is_admin: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {},
  );
  user.associate = function(models) {
    user.hasMany(models.pet, {
      as: "pets",
      foreignKey: "user_id",
    });
    user.hasMany(models.AuthToken, {
      as: "tokens",
      foreignKey: "user_id",
    });
  };

  user.findByEmail = email => {
    return user.findOne({ where: { email } });
  };

  // in order to define an instance method, we have to access
  // the User model prototype. This can be found in the
  // sequelize documentation
  user.prototype.authorize = async function() {
    const { AuthToken } = sequelize.models;
    const user = this;

    // create a new auth token associated to 'this' user
    // by calling the AuthToken class method we created earlier
    // and passing it the user id
    const authToken = await AuthToken.generate(this.id);

    return { user, authToken };
  };

  user.prototype.logout = async function(token) {
    // destroy the auth token record that matches the passed token
    sequelize.models.AuthToken.destroy({ where: { token } });
  };

  user.authenticate = async function(email, password) {
    const found_user = await user.findOne({ where: { email } });

    // bcrypt is a one-way hashing algorithm that allows us to
    // store strings on the database rather than the raw
    // passwords. Check out the docs for more detail
    if (bcrypt.compareSync(password, found_user.password)) {
      return found_user.authorize();
    }

    throw new Error("invalid password");
  };

  return user;
};
