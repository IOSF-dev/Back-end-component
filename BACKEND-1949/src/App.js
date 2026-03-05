require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");
const usersRouter = require("./routes/userRouter.js")
const appointmentsRouter = require("./routes/appointmentsRouter.js").default;
const connectDB = require("./DataBase/db.js");
const app = express();
////////////////////////////////////////////////////////////////////////////////////////
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
////////////////////////////////////////////////////////////////////////////////////////
connectDB();
////////////////////////////////////////////////////////////////////////////////////////
app.use("/auth", authRoutes);
app.use("/users",usersRouter);
app.use("/appointments", appointmentsRouter)
/////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////todo refactorizar a meRouter -> meController
app.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch {
    res.status(500).json({ message: "Error interno" });
  }
});

app.patch("/me", authMiddleware, async (req, res) => {
  try {
    const { name, secondName, email, phone, password, repeatPassword } = req.body;

    if (!name || !secondName || !email || !phone) {
      return res.status(400).json({ message: "Campos obligatorios incompletos" });
    }

    if (password && password !== repeatPassword) {
      return res.status(400).json({ message: "Las contraseñas no coinciden" });
    }

    const user = await User.findById(req.user.id);
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
});
////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////
const PORT = process.env.PORT || 3000;////---------------------------------------////////
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
////////////////////////////////////////////////////////////////////////////////////////