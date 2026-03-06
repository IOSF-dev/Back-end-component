
const userModel = require("../models/user.js");
const getAllUser = async (req, res) => {
        ///// devolver todos los usuarios
        try {
                const allUsers = await userModel.find().select("name secondName email role "); ///allUser es usando el userModel el resultado de .find(all);
                if (allUsers.length === 0) return res.status(200).send("No hay usuarios");/// si allUsers es 0 ciao
                res.status(200).send({ status: "Success", data: allUsers });  // si todo va bien codigo 200 y res enviada en "data"=allUsers
        } catch (error) {
                res.status(500).send({ status: "Failed", error: error.message });
        }
};



const deleteUser = async (req, res) => {
        try {
                const idUser = req.params.id;
                if (!idUser) return res.status(400).send("no hay id a borrar")
                const idToDelete = await userModel.findByIdAndDelete(idUser);/// funcion delete con coincidencia de id
                if (!idToDelete) return res.status(404).send("no se que id quieres borrar")
                res.status(200).send({ status: "Success", message: "Usuario eliminado" });
        } catch (error) {
                res.status(500).send({ status: "Failed", error: error.message });
        }
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

