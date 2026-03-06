const express = require("express");
const verifyToken = require("../middlewares/verifyToken.js");
const router = express.router;
const { meController, editMeController } = require("../controllers/meController.js");

app.get("/", verifyToken, meController)

app.patch("/", verifyToken, editMeController);


module.exports = router;