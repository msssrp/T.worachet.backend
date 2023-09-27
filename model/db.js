const { Sequelize } = require("sequelize");
const dbConfig = require("../config/db_config");

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: dbConfig.HOST,
  username: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  timestamps: false,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
    }
  }
})


module.exports = sequelize;
