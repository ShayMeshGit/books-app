require("dotenv").config();
const app = require("./app");
const http = require("http");
const mongoose = require("mongoose");
const { MONGO_URI } = require("./src/lib/mongoUrl");

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

function run() {
  mongoose.connect(MONGO_URI, {}, (error) => {
    if (error) {
      console.log(error);
      process.exit(1);
    }
    console.log("Successfully connected to mongodb");
    server.listen(PORT, (error) => {
      if (error) {
        console.log(error);
        process.exit(1);
      }
      console.log(`Server started and is listening on port ${PORT}...`);
    });
  });
}

run();
