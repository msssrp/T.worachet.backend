const { Sequelize } = require("sequelize");
const dbConfig = require("../config/db_config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: "mysql",
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("db connect");
  } catch (error) {
    console.log("error :", error);
  }
}

connectDB();
module.exports = sequelize;
