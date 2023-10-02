const express = require("express");
const router = express.Router()
const bcrypt = require("bcrypt")
require("dotenv").config()
const db = require("../controllers/user.controller")
const jwt = require("jsonwebtoken")
const { Op } = require("sequelize")



router.post("/user/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingEmailUser = await db.user.findOne({ where: { email } });

    if (existingEmailUser) {

      return res.status(406).json({ status: "error", msg: "email already in use" })
    }


    const existingUsernameUser = await db.user.findOne({ where: { username } });

    if (existingUsernameUser) {

      return res.status(406).json({ status: "error", msg: "username already is use" })
    }

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hashed) => {
      if (err) {
        return res.status(500).json({ error: "Failed to hash password" });
      }

      const newUser = { username: username, email: email, password: hashed };

      const createUser = await db.user.createUser(newUser);
      res.status(202).json(createUser);
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create new user" });
  }
});


router.post("/user/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;


    const user = await db.user.findOne({
      where: {
        [Op.or]: [{ email: identifier }, { username: identifier }],
      },
    });

    if (!user) {

      return res.status(406).json({ status: "error", msg: "invalid password or username" })
    }


    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {

      return res.status(406).json({ status: "error", msg: "invalid password or username" })
    }


    const token = jwt.sign({ userId: user.id }, process.env.secret, { expiresIn: '1h' });


    res.status(200).json({ status: "success", token })
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

router.get('/user/auth', (req, res) => {

  const token = req.headers.authorization.split(" ")[1]

  if (!token) {

    return res.status(406).json({ status: "error ", msg: 'Access denied. Token is missing.' });
  }


  jwt.verify(token, process.env.secret, (err, decoded) => {
    if (err) {

      return res.status(406).json({ status: "error", msg: 'Access denied. Invalid token.' });
    }



    res.status(200).json({ status: "success", decoded });
  });
});

module.exports = router
