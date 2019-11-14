module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      category: { type: DataTypes.STRING, allowNull: false },
      price: DataTypes.DECIMAL,
      discounted_price: { type: DataTypes.DECIMAL, defaultValue: 0 },
    },
    {},
  );
  return product;
};
