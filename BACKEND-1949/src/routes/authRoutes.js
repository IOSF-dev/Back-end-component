const express = require("express");
const { register, login, refreshToken } = require("../controllers/authController.js");

const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.post("/auth/refresh", refreshToken);

module.exports = router;
