const express = require("express");
const app = express();

const workoutRoutes = require("./routes/workoutRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
require("dotenv").config();
require("./database/connection");
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;

app.use("/workouts", workoutRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});
