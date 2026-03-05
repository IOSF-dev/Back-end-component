const { deleteUser, getAllUser, editUser } = require("../controllers/userController");
const adminMiddleware = require("../middlewares/adminMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const express = required("express");
const router = express.router();


///////////////////////////////////////////////////////////////////////////////////////////
router.get("/", authMiddleware, adminMiddleware, getAllUser)

router.patch("/:id", authMiddleware, adminMiddleware,editUser);

router.delete("/:id", authMiddleware, adminMiddleware, deleteUser);





////////////////////////////////////////////////////////////////////////////////////////
module.exports = router;   //// exportamos la funcion router al index.js
////////////////////////////////////////////////////////////////////////////////////////