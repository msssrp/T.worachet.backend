const db = require("../model/index")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const { Op } = require("sequelize")

const registerUser = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = { username, email, password: hashedPassword };

    // Create user
    const createdUser = await db.user.create(newUser);

    // Assign roles to the user
    const user = await db.user.findOne({ where: { email } });
    if (user) {
      const userRoles = await db.role.findAll({ where: { name: roles } });
      await user.addRoles(userRoles);
    }

    res.status(200).json({ createdUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create new user" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await db.user.findOne({
      where: {
        [Op.or]: [{ email: identifier }, { username: identifier }],
      },
      include: [{
        model: db.role,
        attributes: ['name'],
        through: { attributes: [] },
      }],
    });

    if (!user) {
      return res.status(400).json({ status: "error", msg: "invalid password or username" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ status: "error", msg: "invalid password or username" });
    }

    const roles = user.roles || user.get('roles');

    const tokenData = {
      userId: user.id,
      roles: roles.map(role => role.name),
    };

    const token = jwt.sign(tokenData, process.env.secret, { expiresIn: '1h' });

    res.status(200).json({ status: "success", token });


  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
}

const userAuth = (req, res) => {

  const token = req.headers.authorization.split(" ")[1]

  if (!token) {
    return res.status(400).json({ status: "error ", msg: 'Access denied. Token is missing.' });
  }

  jwt.verify(token, process.env.secret, (err, decoded) => {
    if (err) {
      return res.status(400).json({ status: "error", msg: 'Access denied. Invalid token.' });
    }

    res.status(200).json({ status: "success", decoded });
  });
}



module.exports = {
  registerUser,
  loginUser,
  userAuth
}
