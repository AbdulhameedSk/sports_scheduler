const express = require("express");
const {
    registerController,
    loginController
} = require("../controller/signinController");
const router = express.Router();

router.get("/regester-user", registerController);
router.get("/login-user", loginController);

module.exports = router;
