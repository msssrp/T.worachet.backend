const express = require("express");
const router = express.Router();
const Restaurant = require("../controllers/restaurant.controller");
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

      return res.json({ status: "error", msg: "email already in use" })
    }


    const existingUsernameUser = await db.user.findOne({ where: { username } });

    if (existingUsernameUser) {

      return res.json({ status: "error", msg: "username already is use" })
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

      return res.json({ status: "error", msg: "invalid password or username" })
    }


    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {

      return res.json({ status: "error", msg: "invalid password or username" })
    }


    const token = jwt.sign({ userId: user.id }, process.env.secret, { expiresIn: '1h' });


    res.json({ status: "success", token })
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

router.get('/user/auth', (req, res) => {

  const token = req.headers.authorization.split(" ")[1]

  if (!token) {

    return res.json({ status: "error ", msg: 'Access denied. Token is missing.' });
  }


  jwt.verify(token, process.env.secret, (err, decoded) => {
    if (err) {

      return res.json({ status: "error", msg: 'Access denied. Invalid token.' });
    }



    res.json({ status: "success", decoded });
  });
});


router.post("/restaurants", async (req, res) => {
  try {
    const newRestaurant = req.body;
    if (!newRestaurant || Object.keys(newRestaurant).length === 0) {
      return res.status(400).json({ error: "please input informations" });
    }
    const createRestaurant = await Restaurant.createRestaurant(newRestaurant);
    res.status(202).json(createRestaurant);
  } catch (error) {
    res.status(500).json({ error: "Failed to create new restaurant" });
  }
});

router.get("/restaurants", async (req, res) => {
  try {
    const getRestaurants = await Restaurant.getAllRestaurant();
    res.status(202).json(getRestaurants);
  } catch (error) {
    res.status(500).json({ error: "Error on Internal Server" });
  }
});

router.get("/restaurants/:id", async (req, res) => {
  try {
    const id = req.params["id"];
    const getRestaurantByID = await Restaurant.getRestaurant(id);
    if (getRestaurantByID.error) {
      return res.status(404).json(getRestaurantByID.error);
    }
    res.status(202).json(getRestaurantByID);
  } catch (error) {
    res.status(500).json({ error: "Error on Internal Server" });
  }
});

router.delete("/restaurants/:id", async (req, res) => {
  try {
    const id = req.params["id"];
    const deleteRestaurantByID = await Restaurant.deleteRestaurant(id);
    if (deleteRestaurantByID.error) {
      return res.status(404).json(deleteRestaurantByID.error);
    }
    res.status(202).json(deleteRestaurantByID.success);
  } catch (error) {
    res.status(500).json({ error: "Error on Internal Server" });
  }
});

router.put("/restaurants/:id", async (req, res) => {
  const id = req.params["id"];
  const updateRestaurant = req.body;
  if (!updateRestaurant || Object.keys(updateRestaurant).length === 0) {
    return res
      .status(400)
      .json({ error: "please input id and update infomations" });
  }
  try {
    const updateRestaurantResult = await Restaurant.updateRestaurant(
      id,
      updateRestaurant
    );
    if (updateRestaurantResult.error) {
      console.log(updateRestaurantResult.error);
      return res.status(404).json(updateRestaurantResult.error);
    }
    res.status(202).json(updateRestaurantResult.success);
  } catch (error) {
    res.status(500).json({ error: "Error on Internal Server" });
  }
});

module.exports = router;
