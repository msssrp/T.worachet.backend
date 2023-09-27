const express = require("express");
const router = express.Router();
const Restaurant = require("../controllers/restaurant.controller");
const bcrypt = require("bcrypt")
require("dotenv").config()
const User = require("../controllers/restaurant.user.controller")
const jwt = require("jsonwebtoken")
const { Op } = require("sequelize")

router.post("/restaurants/user/register", async (req, res) => {
  try {
    const { u_username, u_email, u_password } = req.body;

    const existingEmailUser = await User.findOne({ where: { u_email } });

    if (existingEmailUser) {

      return res.json({ status: "error", msg: "email already in use" })
    }


    const existingUsernameUser = await User.findOne({ where: { u_username } });

    if (existingUsernameUser) {

      return res.json({ status: "error", msg: "username already is use" })
    }

    const saltRounds = 10;
    bcrypt.hash(u_password, saltRounds, async (err, hashed) => {
      if (err) {
        return res.status(500).json({ error: "Failed to hash password" });
      }

      const newUser = { u_username: u_username, u_email: u_email, u_password: hashed };
      const createUser = await User.createUser(newUser);
      res.status(202).json(createUser);
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create new user" });
  }
});


router.post("/restaurants/user/login", async (req, res) => {
  try {
    const { identifier, u_password } = req.body;


    const user = await User.findOne({
      where: {
        [Op.or]: [{ u_email: identifier }, { u_username: identifier }],
      },
    });

    if (!user) {

      return res.json({ status: "error", msg: "invalid password or username" })
    }


    const passwordMatch = await bcrypt.compare(u_password, user.u_password);

    if (!passwordMatch) {

      return res.json({ status: "error", msg: "invalid password or username" })
    }


    const token = jwt.sign({ userId: user.u_id }, process.env.secret, { expiresIn: '1h' });


    res.status(200).json({ token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Login failed" });
  }
});

router.get('/user/auth', (req, res) => {

  const token = req.headers.authorization.split(" ")[1]

  if (!token) {

    return res.status(401).json({ error: 'Access denied. Token is missing.' });
  }


  jwt.verify(token, process.env.secret, (err, decoded) => {
    if (err) {

      return res.status(403).json({ error: 'Access denied. Invalid token.' });
    }



    res.status(200).json({ status: "success", decoded });
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
