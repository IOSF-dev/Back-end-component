const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.js");

const register = async (req, res) => {
  try {
    const {
      name,
      secondName,
      email,
      password,
      repeatPassword,
      phone,
    } = req.body;

    if (
      !name ||
      !secondName ||
      !email ||
      !password ||
      !repeatPassword ||
      !phone
    ) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios",
      });
    }

    if (password !== repeatPassword) {
      return res.status(400).json({
        message: "Las contraseñas no coinciden",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "El email ya está registrado",
      });
    }

    const user = await userModel.create({
      name,
      secondName,
      email,
      password,
      phone,
    });

    res.status(201).json({
      message: "Usuario registrado correctamente",
      user: {
        id: user._id,
        name: user.name,
        secondName: user.secondName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("ERROR register:", error);
    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({
          message: "Email y contraseña obligatorios",
        });
      }
  
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(401).json({
          message: "Usuario o contraseña incorrectos",
        });
      }
  
      const isValidPassword = await bcrypt.compare(
        password,
        user.password
      );
  
      if (!isValidPassword) {
        return res.status(401).json({
          message: "Credenciales inválidas",
        });
      }
  
      const accessToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );
      
      const refreshToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
      );
      
      res.status(200).json({
        accessToken,
        refreshToken,
        user: {
          email: user.email,
          role: user.role,
        },
      });
      
    } catch (error) {
      console.error("ERROR login:", error);
      res.status(500).json({
        message: "Error interno del servidor",
      });
    }
  };
  
const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token requerido" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken: newAccessToken });
  } catch {
    res.status(403).json({ message: "Refresh token inválido" });
  }
}
module.exports = { register, login, refreshToken };
