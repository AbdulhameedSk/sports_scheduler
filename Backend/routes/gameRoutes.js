const express = require("express");
const { getgames } = require("../controller/gameController");
const router = express.Router();

router.get("/allgames", getgames);

module.exports = router;
