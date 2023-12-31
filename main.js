const express = require("express");
const PORT = 3306;
const cors = require("cors");
const app = express();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yml');

//dev mode

/*
db.sequelize.sync({ force: false }).then(() => {
  console.log("drop db")
  initial()
})

function initial() {
  role.create({
    id: 1,
    name: "user"
  }),
    role.create({
      id: 2,
      name: "admin"
    }),
    role.create({
      id: 3,
      name: "moderator"
    })
}
*/

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("hello");
});


/*
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("db connect");
  } catch (error) {
    console.log("error :", error);
  }
}

connectDB()
*/
app.listen(PORT, () => {
  console.log("server running on port : " + PORT);
});

const restaurantRouter = require("./routes/restaurant.router");
const userRouter = require("./routes/user.router")

app.use(restaurantRouter);
app.use(userRouter)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
