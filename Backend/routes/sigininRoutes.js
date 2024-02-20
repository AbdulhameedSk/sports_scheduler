const express = require("express");
const {
    registerController,
} = require("../controller/signinController");
const router = express.Router();

router.get("/regester-user", registerController);

module.exports = router;
