const express = require("express");
const router = express.Router();
const Restaurant = require("../controllers/restaurant.controller");

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
