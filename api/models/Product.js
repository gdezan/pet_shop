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
      price: DataTypes.DECIMAL,
      discount: { type: DataTypes.FLOAT, defaultValue: 0 },
    },
    {},
  );
  return product;
};
