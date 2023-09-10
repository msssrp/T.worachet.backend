const express = require("express");
const PORT = 3306;
const cors = require("cors");
const sequelize = require("./model/db")
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("hello");
});

const connectDB = async() => {
  try {
    await sequelize.authenticate();
    console.log("db connect");
  } catch (error) {
    console.log("error :", error);
  }
}

connectDB()

app.listen(PORT, () => {
  console.log("server running on port : " + PORT);
});

const restaurantRouter = require("./routes/restaurant.router");

app.use(restaurantRouter);
