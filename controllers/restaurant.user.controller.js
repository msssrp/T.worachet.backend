const User = require("../model/restaurant-user.model")

User.createUser = async (newUser) => {
  try {
    const createUser = await User.create(newUser)
    console.log("created new user")
    return createUser.toJSON()
  } catch (error) {
    console.log("cannot create User : " + error)
    throw error
  }
}

module.exports = User
