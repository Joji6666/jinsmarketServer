module.exports = function (sequelize, DataTypes) {
  const Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false, // 무조건 있어야 한는것 이라고 외우자
    },

    price: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },

    seller: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING(300),
      allowNull: true, // 이미지는 없어도되니까 true 사용
    },
  });
  return Product;
};
