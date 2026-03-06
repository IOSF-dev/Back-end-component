const appointmentModel = require("./models/Appointment.js");





const getAllAppointments = async (req, res) => {
  const appointments = await appointmentModel.find()
    .populate("user", "name secondName email phone")
    .sort({ date: 1 });

  res.json(appointments);
}
const newAppointment = async (req, res) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "Solo usuarios pueden crear citas" });
  }

  const { service, date } = req.body;
  if (!service || !date) {
    return res.status(400).json({ message: "Servicio y fecha obligatorios" });
  }

  const appointment = await appointmentModel.create({
    user: req.user.id,
    service,
    date,
  });

  res.status(201).json(appointment);
}

const findById = async (req, res) => {
  try {
    const {idUser} = req.params;
    if(!idUser) return
  const appointments = await appointmentModel.findById(idUser).sort({ date: 1 });
  res.status(200).send(appointments);
  
  } catch (error) {
    
  }
  };

const editById = async (req, res) => {
  const appointment = await appointmentModel.findById(req.params.id);
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
};

const deleteAppointment = async (req, res) => {
  const appointment = await appointmentModel.findByIdAndDelete(req.params.id);
  if (!appointment) return res.status(404).json({ message: "Cita no encontrada" });
  res.json({ message: "Cita eliminada" });
}





module.exports = { getAllAppointments,newAppointment, findById, editById, deleteAppointment };
