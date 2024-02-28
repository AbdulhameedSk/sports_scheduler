const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const adminRoutes = require("./routes/adminRoutes");
const playerRoutes = require("./routes/playerRoutes");
const signinRoutes=require("./routes/signinRoutes")
const gameRoutes=require("./routes/gameRoutes")
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/player", playerRoutes);
app.use("/api/v1/signin", signinRoutes);
app.use("/api/v1/game", gameRoutes);

const PORT = process.env.PORT || 1996;
const mode = process.env.DEV_MODE;

app.listen(PORT, () => {
  console.log(`Listening at ` + PORT.bgGreen);
});