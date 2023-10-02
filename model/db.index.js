const config = require("../config/db_config")


const Sequelize = require("sequelize")

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.accquire,
    idle: config.pool.idle
  }
})


const db = {}
db.Sequelize = sequelize
db.sequelize = sequelize

db.user = require("./user.model")(sequelize, Sequelize)
db.role = require("./role.model")(sequelize, Sequelize)

db.role.belongsToMany(db.user, {
  through: "users_roles"
})

db.user.belongsToMany(db.role, {
  through: "users_roles"
})

db.ROLES = ["user", "admin", "moderator"]


module.exports = db
