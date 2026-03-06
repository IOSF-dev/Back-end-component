const userModel = require("./models/user.js");



const meController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch {
    res.status(500).json({ message: "Error interno" });
  }
}

const editMeController = async (req, res) => {
  try {
    const { name, secondName, email, phone, password, repeatPassword } = req.body;

    if (!name || !secondName || !email || !phone) {
      return res.status(400).json({ message: "Campos obligatorios incompletos" });
    }

    if (password && password !== repeatPassword) {
      return res.status(400).json({ message: "Las contraseñas no coinciden" });
    }

    const user = await userModel.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    user.name = name;
    user.secondName = secondName;
    user.email = email;
    user.phone = phone;

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
    res.status(500).json({ message: "Error al actualizar perfil" });
  }
}
module.exports = {meController, editMeController}