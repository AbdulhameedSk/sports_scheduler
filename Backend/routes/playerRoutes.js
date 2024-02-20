const express = require("express");
const {
  registertogameController,
  leaveGameController,
} = require("../controller/playerController");
const router = express.Router();

router.get("/regester-game", registertogameController);
router.put("/leave-game", leaveGameController);

module.exports = router;
