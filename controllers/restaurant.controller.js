const Restaurant = require("../model/restaurant.model");
const moment = require("moment");

Restaurant.createRestaurant = async (newRestaurant) => {
  try {
    const createRestaurant = await Restaurant.create(newRestaurant);
    console.log("Created new restaurant");
    return createRestaurant.toJSON();
  } catch (error) {
    console.log("Cannot Create New Restaurant error :", error);
    throw error;
  }
};

Restaurant.getAllRestaurant = async () => {
  try {
    const getRestaurants = await Restaurant.findAll();
    console.log("Get All");
    return getRestaurants.map((res) => res.toJSON());
  } catch (error) {
    console.log(error);
    throw error;
  }
};

Restaurant.getRestaurant = async (id) => {
  try {
    const getRestaurantByID = await Restaurant.findByPk(id);
    if (!getRestaurantByID) {
      console.log(`ID NOT FOUND : ${id}`);
      return { error: `ID not found : ${id}` };
    }
    console.log(`Get by ID : ${id}`);
    return getRestaurantByID.toJSON();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

Restaurant.deleteRestaurant = async (id) => {
  try {
    const deleteRestaurantByID = await Restaurant.destroy({
      where: { id: id },
    });
    if (deleteRestaurantByID === 0) {
      console.log(`ID NOT FOUND : ${id}`);
      return { error: `ID not found : ${id}` };
    } else {
      console.log(`Deletd ID : ${id}`);
      return { success: `restaurant ID ${id} deleted` };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

Restaurant.updateRestaurant = async (id, updateRestaurant) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ where: { id: id } });
    if (!existingRestaurant) {
      console.log(`ID NOT FOUND : ${id}`);
      return { error: `ID NOT FOUND : ${id}` };
    }
    updateRestaurant.updatedAt = moment.utc().date();
    await Restaurant.update(updateRestaurant, { where: { id: id } });
    console.log(`updated ID : ${id}`);
    return { success: `updated restaurant ID : ${id}` };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = Restaurant;
