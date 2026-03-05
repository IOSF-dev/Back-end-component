
const userModel = require("./models/user.js");
const getAllUser = async (req, res) => {
  const users = await userModel.find().select("-password");
  res.json(users);
};



const deleteUser = async (req, res) => {
  const user = await userModel.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
  res.json({ message: "Usuario eliminado" });
}
const editUser =  async (req, res) => {
  try {
    const { name, secondName, email, phone, role, password } = req.body;

    if (!name || !secondName || !email || !phone || !role) {
      return res.status(400).json({ message: "Campos incompletos" });
    }

    const user = await userModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    user.name = name;
    user.secondName = secondName;
    user.email = email;
    user.phone = phone;
    user.role = role;

    if (password) {
      user.password = password;
    }

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      secondName: user.secondName,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });
  } catch {
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
}


module.exports ={
    getAllUser,
    deleteUser,
    editUser,

}

