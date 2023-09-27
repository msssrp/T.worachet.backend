const { DataType, DataTypes } = require("sequelize")
const sequelize = require("./db")

const User = sequelize.define("r_user", {
  u_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  u_username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  u_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  u_password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  joinAt: {
    type: "TIMESTAMP",
    allowNull: true,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
  },
}, {
  tableName: "r_users",
  timestamps: false, // Disable timestamps globally
  createdAt: false, // Explicitly exclude createdAt field
  updatedAt: false, // Explicitly exclude updatedAt field
});


module.exports = User
