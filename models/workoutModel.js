const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
    createdBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"userModel",
      required:true
    }
  },
  { timestamps: true }
);

const WorkoutModel = mongoose.model("WorkoutModel", workoutSchema);

module.exports = WorkoutModel;
