const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/userMiddleware");
const {
  getWorkoutsData,
  getSingleWorkoutData,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutControllers");

router.use(authenticateUser);

router.get("/", getWorkoutsData);

router.get("/:id", getSingleWorkoutData);

router.post("/", createWorkout);

router.patch("/:id", updateWorkout);

router.delete("/:id", deleteWorkout);

module.exports = router;
