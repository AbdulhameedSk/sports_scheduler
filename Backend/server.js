const express = require("express");
//To stop cross origin restriction
const cors = require("cors");
const morgan = require("morgan");
//Console colors
const colors = require("colors");
//For secure Credientials
const dotenv = require("dotenv");
//Connect DB
const connectDB = require("./db");
const app = express();

//env_config
dotenv.config();
connectDB();
//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
const userRoutes = require("./routes/userRoutes");
const sportsRoutes = require("./routes/sportsRoutes");

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/sports", sportsRoutes);


const PORT = process.env.PORT || 1996;
const mode = process.env.DEV_MODE;
app.listen(PORT, () => {
  console.log(`Listening at ${mode} ` + PORT.bgGreen);
});