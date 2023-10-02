const db = require("../model/db.index")

db.user.createUser = async (newUser) => {
  try {
    const createUser = await db.user.create(newUser)
    console.log("created new user")
    return createUser.toJSON()
  } catch (error) {
    console.log("cannot create User : " + error)
    throw error
  }
}

module.exports = db
