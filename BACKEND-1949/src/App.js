require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");
const usersRouter = require("./routes/userRouter.js")
const meRouter = require("./routes/meRouter.js");
const appointmentsRouter = require("./routes/appointmentsRouter.js").default;
const connectDB = require("./DataBase/db.js");
const authMiddleware = require("./middlewares/authMiddleware.js");
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
app.use("/me", meRouter);
/////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////
const PORT = process.env.PORT || 3000;////---------------------------------------////////
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
////////////////////////////////////////////////////////////////////////////////////////