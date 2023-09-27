require('dotenv').config()

module.exports = {
  HOST: process.env.HOST,
  USER: process.env.VERCEL_USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    accquire: 30000,
    idle: 10000
  }
};
