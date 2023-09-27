const { Sequelize } = require("sequelize");
const dbConfig = require("../config/db_config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

async function testConnection() {
  try {
    await sequelize.authenticate()
    console.log("connected")
  } catch (error) {
    console.log("error connection", error)
  }
}

testConnection()

module.exports = sequelize;
