require('dotenv').config()

module.exports = {
  HOST: process.env.DEV_HOST,
  USER: process.env.DEV_USER,
  PASSWORD: process.env.DEV_PASSWORD,
  DB: process.env.DEV_DB,
};
