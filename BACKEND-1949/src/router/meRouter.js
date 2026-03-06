const express = require("express");
const verifyToken = require("../middlewares/verifyToken.js");
const router = express.Router();
const { meController, editMeController } = require("../controllers/meController.js");

router.get("/", verifyToken, meController)

router.patch("/", verifyToken, editMeController);


module.exports = router;