"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class bid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.artwork);
    }
  }
  bid.init(
    {
      email: { allowNull: false, type: DataTypes.STRING },
      amount: { allowNull: false, type: DataTypes.INTEGER },
    },
    {
      sequelize,
      modelName: "bid",
    }
  );
  return bid;
};