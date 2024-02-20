const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./db");
const app = express();

dotenv.config();
connectDB();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const userRoutes = require("./routes/userRoutes");
const sportsRoutes = require("./routes/sportsRoutes");

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/sports", sportsRoutes);

const PORT = process.env.PORT || 1996;
const mode = process.env.DEV_MODE;

app.listen(PORT, () => {
  console.log(`Listening at ${mode} ` + PORT.bgGreen);
});