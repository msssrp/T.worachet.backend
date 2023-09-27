require('dotenv').config()

module.exports = {
  HOST: process.env.CC_HOST,
  USER: process.env.CC_USER,
  PASSWORD: process.env.CC_PASSWORD,
  DB: process.env.CC_DB,
};
