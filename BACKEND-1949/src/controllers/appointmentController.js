const appointmentModel = require("./models/Appointment.js");

const getAllAppointments = async (req, res) => {
  const appointments = await appointmentModel.find()
    .populate("user", "name secondName email phone")
    .sort({ date: 1 });

  res.json(appointments);
}

module.exports = { getAllAppointments };