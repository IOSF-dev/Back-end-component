const { deleteUser, getAllUser, editUser } = require("../controllers/userController");
const verifyAdmin = require("../middlewares/verifyAdmin");
const verifyToken = require("../middlewares/verifyToken");
const express = require("express");
const router = express.Router();


///////////////////////////////////////////////////////////////////////////////////////////
router.get("/", verifyToken, verifyAdmin, getAllUser)

router.patch("/:id", verifyToken, verifyAdmin,editUser);

router.delete("/:id", verifyToken, verifyAdmin, deleteUser);





////////////////////////////////////////////////////////////////////////////////////////
module.exports = router;   //// exportamos la funcion router al index.js
////////////////////////////////////////////////////////////////////////////////////////