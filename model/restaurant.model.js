const { DataType, DataTypes } = require("sequelize");
const sequelize = require("./db");

const Restaurant = sequelize.define("restaurant", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: "TIMESTAMP",
    allowNull: true,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
  },
  updatedAt: {
    type: "TIMESTAMP",
    allowNull: true,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
  },
});

module.exports = Restaurant;
