const express = required("express");
const  router  = express.router();
const authMiddleware = require("./middlewares/authMiddleware.js");
const adminMiddleware = require("./middlewares/adminMiddleware.js");
const { getAllAppointments} = required("../controllers/appointmentController.js")

router.get("/", authMiddleware, adminMiddleware, getAllAppointments);




app.post("/appointments", authMiddleware, async (req, res) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "Solo usuarios pueden crear citas" });
  }

  const { service, date } = req.body;
  if (!service || !date) {
    return res.status(400).json({ message: "Servicio y fecha obligatorios" });
  }

  const appointment = await Appointment.create({
    user: req.user.id,
    service,
    date,
  });

  res.status(201).json(appointment);
});

app.get("/appointments/me", authMiddleware, async (req, res) => {
  const appointments = await Appointment.find({ user: req.user.id }).sort({ date: 1 });
  res.json(appointments);
});


app.patch("/appointments/:id", authMiddleware, async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) return res.status(404).json({ message: "Cita no encontrada" });

  if (
    req.user.role !== "admin" &&
    appointment.user.toString() !== req.user.id
  ) {
    return res.status(403).json({ message: "No autorizado" });
  }

  const { status, date, service } = req.body;
  if (status) appointment.status = status;
  if (date) appointment.date = date;
  if (service) appointment.service = service;

  await appointment.save();
  res.json(appointment);
});

app.delete("/appointments/:id", authMiddleware, adminMiddleware, async (req, res) => {
  const appointment = await Appointment.findByIdAndDelete(req.params.id);
  if (!appointment) return res.status(404).json({ message: "Cita no encontrada" });
  res.json({ message: "Cita eliminada" });
});



module.exports = router;