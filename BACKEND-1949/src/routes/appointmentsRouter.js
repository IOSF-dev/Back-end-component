const express = require("express");
const  router  = express.Router();
const verifyToken = require("../middlewares/verifyToken.js");
const verifyAdmin = require("../middlewares/verifyAdmin.js");
const { newAppointment, getAllAppointments, findById, editById, deleteAppointment } = require("../controllers/appointmentController.js");


router.get ("/", verifyToken, verifyAdmin, getAllAppointments);

router.post("/", verifyToken, newAppointment);
router.get("/:id", verifyToken, findById );
router.patch("/:id", verifyToken, editById );
router.delete("/:id", verifyToken, verifyAdmin, deleteAppointment);



module.exports = router;