const express = require("express");
const {
  getAllSportsController,
  updateGameController,
  createGameController,
  deleteSportController,
  updateSportController,
  createSportController,
} = require("../controller/adminController");
const router = express.Router();

router.get("/all-sports", getAllSportsController);
router.post("/create-sports", createSportController);
router.put("/update-sports/:id", updateSportController);
router.post("/delete-sports/:id", deleteSportController);
router.post("/create-game/", createGameController);
router.put("/update-game/:id", updateGameController);

module.exports = router;
