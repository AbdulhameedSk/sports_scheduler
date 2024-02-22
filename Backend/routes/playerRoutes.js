const express = require("express");
const {
  registerToGameController,
  leaveGameController,
} = require("../controller/playerController");
const router = express.Router();

router.post("/register-game", registerToGameController);
router.post("/leave-game", leaveGameController);

module.exports = router;
