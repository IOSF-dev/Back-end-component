const express = required("express");
const  router  = express.router();
const verifyToken = require("../middlewares/verifyToken.js");
const verifyAdmin = require("../middlewares/verifyAdmin.js");
const { newAppointment, getAllAppointments, findById, editById, deleteAppointment } = require("../controllers/appointmentController.js");


router.get("/", verifyToken, verifyAdmin, getAllAppointments);

app.post("/", verifyToken, newAppointment);

app.get("/:id", verifyToken, findById );

app.patch("/:id", verifyToken, editById );

app.delete("/:id", verifyToken, verifyAdmin, deleteAppointment);



module.exports = router;