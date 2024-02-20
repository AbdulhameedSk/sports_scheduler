const express = require("express");
const {
  getAllsportsController,
  createsportsController,
  updatesportsController,
  getsportsById,
  deletesportsController,
} = require("../controller/sportsController");
const router = express.Router();

router.get("/all-sports", getAllsportsController);
router.post("/create-sports", createsportsController);
router.put("/update-sports/:id", updatesportsController);
router.get("/get-sports/:id", getsportsById);
router.delete("/delete-sports/:id", deletesportsController);
module.exports = router;
