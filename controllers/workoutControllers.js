const WorkoutModel = require("../models/workoutModel");

const getWorkoutsData = async (req, res) => {
  try {
    const workoutData = await WorkoutModel.find({
      createdBy: req.user._id,
    }).sort({ createdAt: -1 });
    res.status(200).json(workoutData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getSingleWorkoutData = async (req, res) => {
  try {
    const id = req.params.id;
    const singleWorkoutData = await WorkoutModel.findById({ _id: id });
    res.status(200).json(singleWorkoutData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const createWorkout = async (req, res) => {
  try {
    const newWorkoutData = req.body;
    const createdWorkoutData = await WorkoutModel.create({
      ...newWorkoutData,
      createdBy: req.user._id,
    });
    console.log(req.user._id);
    res.status(201).json(createdWorkoutData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateWorkout = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedWorkoutData = await WorkoutModel.findByIdAndUpdate(
      { _id: id, createdBy: req.user._id },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedWorkoutData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteWorkout = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedWorkoutData = await WorkoutModel.findByIdAndDelete({
      _id: id, createdBy: req.user._id
    });
    res.status(200).json(deletedWorkoutData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getWorkoutsData,
  getSingleWorkoutData,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
