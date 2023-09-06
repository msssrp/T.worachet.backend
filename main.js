const express = require("express");
const PORT = 8080;
const cors = require("cors");
const sql = require("./model/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log("server running on port : " + PORT);
});

const restaurantRouter = require("./routes/restaurant.router");

app.use(restaurantRouter);
