const express = require("express");
const { Sequelize } = require("sequelize");
var dotenv = require("dotenv");
var cors = require("cors");

const userRoutes = require("./routes/user.route.js");
const categoryRoutes = require("./routes/category.route.js");
const taskStatusRoutes = require("./routes/taskStatus.route.js");
const taskRoutes = require("./routes/task.route.js");
const { notFoundHandler, errorHandler } = require("./middlewares/index.js");

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: true,
  credentials: true,
};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/taskStatus", taskStatusRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Hello World from the backend!");
});

// handle 404 not found error
app.use(notFoundHandler);

// catch all errors
app.use(errorHandler);

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
