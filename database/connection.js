const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connection established with Database");
  })
  .catch((err) => {
    console.log(`Error connecting to database - ${err.message}`);
  });
